import express from "express";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import { createServer as createViteServer } from "vite";
import { t, getCurrentLanguage } from "tradux";

const port = process.env.PORT || 5173;

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function createServer() {
    const app = express();

    const vite = await createViteServer({
        server: { middlewareMode: true },
        appType: "custom"
    });
    app.use(vite.middlewares);

    app.use(/.*/, async (req, res, next) => {
        try {
            const url = req.originalUrl;
            const page = url.split("/").filter(Boolean)[0] || "";

            let template = await fs.readFile(path.resolve(__dirname, "index.html"), "utf-8");
            template = await vite.transformIndexHtml(url, template);

            const traduxLang =
                req.headers.cookie?.split("; ").find(c => c.startsWith("tradux_lang="))?.split("=")[1] || "en";
            const lang = await getCurrentLanguage(traduxLang);

            const title = page ? t[page].title_meta : t.title_meta;
            const description = page ? t[page].description_meta : t.description_meta;
            const keywords = page ? t[page].keywords_meta : t.keywords_meta;
            const image = page && page !== "contact"
                ? `https://100aiprojects.dev/shots/${page}_shot.png`
                : "https://100aiprojects.dev/shots/100_AI_Projects_shot.png";

            const html = template
                .replace(/<html lang=".*?">/, `<html lang="${lang}">`)
                .replace(/<title>.*?<\/title>/, `<title>${title}</title>`)
                .replace(/<meta name="description" content=".*?">/, `<meta name="description" content="${description}">`)
                .replace(/<meta name="keywords" content=".*?">/, `<meta name="keywords" content="${keywords}">`)
                .replace(/<meta property="og:site_name" content=".*?">/, `<meta property="og:site_name" content="${title}">`)
                .replace(/<meta property="og:title" content=".*?">/, `<meta property="og:title" content="${title}">`)
                .replace(/<meta property="og:url" content=".*?">/, `<meta property="og:url" content="https://100aiprojects.dev/${page}">`)
                .replace(/<meta name="twitter:title" content=".*?">/, `<meta name="twitter:title" content="${title}">`)
                .replace(/<meta property="og:description" content=".*?">/, `<meta property="og:description" content="${description}">`)
                .replace(/<meta name="twitter:description" content=".*?">/, `<meta name="twitter:description" content="${description}">`)
                .replace(/<meta property="og:image" content=".*?">/, `<meta property="og:image" content="${image}">`)
                .replace(/<meta name="twitter:image" content=".*?">/, `<meta name="twitter:image" content="${image}">`);

            res.status(200).set({ "Content-Type": "text/html" }).end(html);
        } catch (e) {
            vite.ssrFixStacktrace(e);
            next(e);
        }
    });

    app.listen(port, () => {
        console.log(`Server running at http://localhost:${port}`);
    });
}

createServer();