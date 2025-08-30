// Helper function to recursively translate nested objects
async function translateObject(obj, targetLanguage, env) {
	if (typeof obj === 'string') {
		// Skip translation for template variables like {{current_year}}
		if (obj.includes('{{') && obj.includes('}}')) {
			return obj;
		}
		
		try {
			const result = await env.AI.run(
				"@cf/meta/m2m100-1.2b",
				{
					text: obj,
					source_lang: "english",
					target_lang: targetLanguage,
				}
			);
			return result.translated_text || obj;
		} catch (error) {
			console.error('Translation error for text:', obj, error);
			return obj; // Return original if translation fails
		}
	} else if (Array.isArray(obj)) {
		// Handle arrays
		const translatedArray = [];
		for (const item of obj) {
			translatedArray.push(await translateObject(item, targetLanguage, env));
		}
		return translatedArray;
	} else if (obj && typeof obj === 'object') {
		// Handle objects
		const translatedObj = {};
		for (const [key, value] of Object.entries(obj)) {
			translatedObj[key] = await translateObject(value, targetLanguage, env);
		}
		return translatedObj;
	}
	
	return obj; // Return as-is for other types (numbers, booleans, null)
}

export default {
	async fetch(request, env) {
		const url = new URL(request.url);

		if (url.pathname === "/api/translate-json") {
			if (request.method !== 'POST') {
				return Response.json({
					success: false,
					error: 'Method not allowed'
				}, { status: 405 });
			}

			try {
				const { data, targetLanguage } = await request.json();
				
				if (!data || !targetLanguage) {
					return Response.json({
						success: false,
						error: 'Missing data or targetLanguage'
					}, { status: 400 });
				}

				// Translate the entire JSON structure
				const translatedData = await translateObject(data, targetLanguage, env);
				
				return Response.json({
					success: true,
					translatedData,
					originalLanguage: 'english',
					targetLanguage
				});
			} catch (error) {
				return Response.json({
					success: false,
					error: error.message
				}, { status: 500 });
			}
		}

		if (url.pathname === "/api/translate") {
			try {
				const result = await env.AI.run(
					"@cf/meta/m2m100-1.2b",
					{
						text: "I'll have an order of the moule frites",
						source_lang: "english",
						target_lang: "portuguese",
					}
				);
				
				return Response.json({
					success: true,
					translation: result,
					original: "I'll have an order of the moule frites",
					source_lang: "english",
					target_lang: "portuguese"
				});
			} catch (error) {
				return Response.json({
					success: false,
					error: error.message
				}, { status: 500 });
			}
		}

		if (url.pathname.startsWith("/api/")) {
			return Response.json({
				name: "Cloudflare AI Translation API",
				endpoints: ["/api/translate", "/api/translate-json"]
			});
		}

		return new Response(null, { status: 404 });
	},
};
