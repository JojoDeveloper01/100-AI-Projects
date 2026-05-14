import { mkdir, readdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { routesConfig } from "../src/config/routes.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const dist = join(root, "dist", "client");
const i18nDir = join(root, "public", "i18n");
const siteUrl = "https://100aiprojects.dev";

const fallbackMeta = {
  title: "100 AI Projects - AI Development Portfolio",
  description:
    "Explore 100 AI projects showcasing machine learning, deep learning, and innovative solutions.",
  keywords:
    "AI projects, artificial intelligence, machine learning, deep learning, NLP, computer vision, generative AI, data science, AI portfolio",
};

const escapeHtmlAttribute = (value) =>
  String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");

const trimSlash = (path) => path.replace(/^\/+|\/+$/g, "");
const withTrailingSlash = (path) => (path.endsWith("/") ? path : `${path}/`);
const routePath = (route) => withTrailingSlash(route.path === "/" ? "/" : route.path);
const pageKeyForPath = (path) => trimSlash(path).split("/")[0] || "";

const readTranslations = async () => {
  const files = (await readdir(i18nDir))
    .filter((file) => file.endsWith(".json"))
    .sort();

  return Object.fromEntries(
    await Promise.all(
      files.map(async (file) => [
        file.replace(/\.json$/, ""),
        JSON.parse(await readFile(join(i18nDir, file), "utf8")),
      ]),
    ),
  );
};

const readMeta = (source, key, fallback) =>
  source && source[key] ? source[key] : fallback;

const buildHead = ({ lang, path, translations, languages }) => {
  const pageKey = pageKeyForPath(path);
  const pageTranslations = pageKey && pageKey in translations ? translations[pageKey] : null;
  const rootTitle = readMeta(translations, "title_meta", fallbackMeta.title);
  const rootDescription = readMeta(translations, "description_meta", fallbackMeta.description);
  const rootKeywords = readMeta(translations, "keywords_meta", fallbackMeta.keywords);
  const title = readMeta(pageTranslations, "title_meta", rootTitle);
  const description = readMeta(pageTranslations, "description_meta", rootDescription);
  const keywords = readMeta(pageTranslations, "keywords_meta", rootKeywords);
  const image =
    pageKey && pageKey !== "contact"
      ? `${siteUrl}/shots/${pageKey}_shot.webp`
      : `${siteUrl}/shots/100_AI_Projects_shot.webp`;
  const canonicalPath = lang === "en" && path === "/" ? "/" : `/${lang}${path === "/" ? "/" : path}`;
  const xDefaultPath = path === "/" ? "/" : `/en${path}`;
  const canonical = `${siteUrl}${canonicalPath}`;
  const alternates = languages
    .map((language) => {
      const hrefPath = language === "en" && path === "/" ? "/" : `/${language}${path === "/" ? "/" : path}`;
      return `<link rel="alternate" hreflang="${language}" href="${siteUrl}${hrefPath}">`;
    })
    .join("\n      ");

  return `
      <title>${escapeHtmlAttribute(title)}</title>
      <meta name="theme-color" content="#0f0f21">
      <meta name="description" content="${escapeHtmlAttribute(description)}">
      <meta name="keywords" content="${escapeHtmlAttribute(keywords)}">
      <meta name="author" content="Joseth Balcazar">
      <link rel="canonical" href="${canonical}">
      ${alternates}
      <link rel="alternate" hreflang="x-default" href="${siteUrl}${xDefaultPath}">
      <meta property="og:site_name" content="100 AI Projects">
      <meta property="og:title" content="${escapeHtmlAttribute(title)}">
      <meta property="og:description" content="${escapeHtmlAttribute(description)}">
      <meta property="og:image" content="${image}">
      <meta property="og:type" content="website">
      <meta property="og:url" content="${canonical}">
      <meta name="twitter:card" content="summary_large_image">
      <meta name="twitter:title" content="${escapeHtmlAttribute(title)}">
      <meta name="twitter:description" content="${escapeHtmlAttribute(description)}">
      <meta name="twitter:image" content="${image}">`;
};

const writeHtml = async ({ template, lang, outputPath, routePathValue, translations, languages }) => {
  const html = template
    .replace(/<html lang=".*?">/, `<html lang="${lang}">`)
    .replace("<!--app-head-->", buildHead({ lang, path: routePathValue, translations, languages }));
  const relative = trimSlash(outputPath);
  const targetDir = relative ? join(dist, relative) : dist;
  await mkdir(targetDir, { recursive: true });
  await writeFile(join(targetDir, "index.html"), html);
};

const template = await readFile(join(dist, "index.html"), "utf8");
const translationsByLanguage = await readTranslations();
const languages = Object.keys(translationsByLanguage).sort();

for (const [lang, translations] of Object.entries(translationsByLanguage)) {
  for (const route of routesConfig) {
    const path = routePath(route);
    await writeHtml({
      template,
      lang,
      outputPath: `/${lang}${path}`,
      routePathValue: path,
      translations,
      languages,
    });

    if (lang === "en") {
      await writeHtml({
        template,
        lang,
        outputPath: path,
        routePathValue: path,
        translations,
        languages,
      });
    }
  }
}

await writeFile(join(dist, "_redirects"), "/* /index.html 200\n");
console.log(`Prerendered ${routesConfig.length * languages.length + routesConfig.length} static pages.`);
