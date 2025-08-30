import { Ai } from "@cloudflare/workers-types";

export interface Env {
    AI: Ai;
}

export default {
    async fetch(request: Request, env: Env): Promise<Response> {

        const response = await env.AI.run(
            "@cf/meta/m2m100-1.2b",
            {
                text: "I'll have an order of the moule frites",
                source_lang: "english", // defaults to english
                target_lang: "french",
            }
        );

        return new Response(JSON.stringify(response));
    },
} satisfies ExportedHandler<Env>;