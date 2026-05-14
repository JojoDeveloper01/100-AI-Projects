import fs from "node:fs/promises";
import express from "express";
import { initTradux } from "tradux/node";

await loadEnvFile(".env");

// Constants
const isProduction = process.env.NODE_ENV === "production";
const port = process.env.PORT || 5173;
const base = process.env.BASE || "/";

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

const readMeta = (source, key, fallback) =>
  source && key in source && source[key] ? source[key] : fallback;

async function loadEnvFile(filePath) {
  try {
    const envFile = await fs.readFile(filePath, "utf-8");

    for (const line of envFile.split(/\r?\n/)) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#") || !trimmed.includes("="))
        continue;

      const [key, ...valueParts] = trimmed.split("=");
      const value = valueParts
        .join("=")
        .trim()
        .replace(/^['\"]|['\"]$/g, "");
      if (key && !process.env[key]) process.env[key] = value;
    }
  } catch {
    // .env is optional in production. Real deployments should inject env vars.
  }
}

const contactConfig = {
  from: "100 AI Projects <contact@100aiprojects.dev>",
  to: "josethbalcazar@gmail.com",
};

const normalizeContactPayload = (body = {}) => ({
  name: String(body.name ?? "")
    .trim()
    .replace(/\s+/g, " "),
  email: String(body.email ?? "")
    .trim()
    .toLowerCase(),
  message: String(body.message ?? "").trim(),
});

const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);

const validateContactPayload = ({ name, email, message }) => {
  const errors = {};

  if (name.length < 2 || name.length > 80) errors.name = "invalid_name";
  if (!isValidEmail(email) || email.length > 254)
    errors.email = "invalid_email";
  if (message.length < 10 || message.length > 2000) {
    errors.message = "invalid_message";
  }

  return errors;
};

const escapeHtml = (value) =>
  String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");

// Cached production assets
const templateHtml = isProduction
  ? await fs.readFile("./dist/client/index.html", "utf-8")
  : "";

// Create http server
const app = express();

app.use(express.json({ limit: "12kb" }));

app.post("/api/contact", async (req, res) => {
  const payload = normalizeContactPayload(req.body);
  const errors = validateContactPayload(payload);

  if (Object.keys(errors).length > 0) {
    return res
      .status(400)
      .json({ ok: false, code: "validation_error", errors });
  }

  const resendApiKey = process.env.RESEND_API_KEY;

  if (!resendApiKey) {
    console.error("Missing RESEND_API_KEY for contact form.");
    return res.status(500).json({ ok: false, code: "email_not_configured" });
  }

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: contactConfig.from,
        to: contactConfig.to,
        reply_to: payload.email,
        subject: `New contact from ${payload.name} — 100 AI Projects`,
        text: `Name: ${payload.name}\nEmail: ${payload.email}\n\nMessage:\n${payload.message}`,
        html: `
          <h2>New contact from 100 AI Projects</h2>
          <p><strong>Name:</strong> ${escapeHtml(payload.name)}</p>
          <p><strong>Email:</strong> ${escapeHtml(payload.email)}</p>
          <p><strong>Message:</strong></p>
          <p>${escapeHtml(payload.message).replaceAll("\n", "<br>")}</p>
        `,
      }),
    });

    const resendResult = await response.json().catch(async () => ({
      raw: await response.text().catch(() => ""),
    }));

    if (!response.ok || resendResult?.error) {
      console.error(
        "Resend contact email failed:",
        response.status,
        JSON.stringify(resendResult),
      );
      return res.status(502).json({ ok: false, code: "email_send_failed" });
    }

    console.info("Resend contact email accepted:", resendResult?.id ?? "no-id");
    return res.status(200).json({ ok: true, id: resendResult?.id ?? null });
  } catch (error) {
    console.error("Contact form email error:", error);
    return res.status(502).json({ ok: false, code: "email_send_failed" });
  }
});

// Add Vite or respective production middlewares
/** @type {import('vite').ViteDevServer | undefined} */
let vite;
if (!isProduction) {
  const { createServer } = await import("vite");
  vite = await createServer({
    server: { middlewareMode: true },
    appType: "custom",
    base,
  });
  app.use(vite.middlewares);
} else {
  const compression = (await import("compression")).default;
  const sirv = (await import("sirv")).default;
  app.use(compression());
  app.use(base, sirv("./dist/client", { extensions: [] }));
}

// Serve HTML
app.use("*all", async (req, res) => {
  try {
    const requestUrl = new URL(req.originalUrl, `http://${req.headers.host}`);
    const url = requestUrl.pathname.replace(base, "") || "/";

    /** @type {string} */
    let template;
    if (!isProduction) {
      // Always read fresh template in development
      template = await fs.readFile("./index.html", "utf-8");
      template = await vite.transformIndexHtml(url, template);
    } else {
      template = templateHtml;
    }

    // Tradux meta logic
    const page = url.split("/").filter(Boolean)[0] || "";
    // Extract cookie before calling render
    const traduxLang =
      req.headers.cookie
        ?.split("; ")
        .find((c) => c.startsWith("tradux_lang="))
        ?.split("=")[1] || "en";

    const { t, currentLanguage } = await initTradux(
      req.headers.cookie || traduxLang,
    );

    const pageTranslations = page && page in t ? t[page] : null;
    const rootTitle = readMeta(t, "title_meta", fallbackMeta.title);
    const rootDescription = readMeta(
      t,
      "description_meta",
      fallbackMeta.description,
    );
    const rootKeywords = readMeta(t, "keywords_meta", fallbackMeta.keywords);

    const title = readMeta(pageTranslations, "title_meta", rootTitle);
    const description = readMeta(
      pageTranslations,
      "description_meta",
      rootDescription,
    );
    const keywords = readMeta(pageTranslations, "keywords_meta", rootKeywords);
    const image =
      page && page !== "contact"
        ? `https://100aiprojects.dev/shots/${page}_shot.webp`
        : "https://100aiprojects.dev/shots/100_AI_Projects_shot.webp";

    const traduxHead = `
      <title>${escapeHtmlAttribute(title)}</title>

      <meta name="theme-color" content="#0f0f21">
      <meta name="description" content="${escapeHtmlAttribute(description)}">
      <meta name="keywords" content="${escapeHtmlAttribute(keywords)}">
      <meta name="author" content="Joseth Balcazar">

      <meta property="og:site_name" content="${escapeHtmlAttribute(title)}">
      <meta property="og:title" content="${escapeHtmlAttribute(title)}">
      <meta property="og:description" content="${escapeHtmlAttribute(description)}">
      <meta property="og:image" content="${image}">
      <meta property="og:type" content="website">
      <meta property="og:url" content="${image}">

      <meta name="twitter:card" content="summary_large_image">
      <meta name="twitter:title" content="${escapeHtmlAttribute(title)}">
      <meta name="twitter:description" content="${escapeHtmlAttribute(description)}">
      <meta name="twitter:image" content="${image}">
    `;

    let html = template
      .replace(/<html lang=".*?">/, `<html lang="${currentLanguage}">`)
      .replace(`<!--app-head-->`, traduxHead);

    res.status(200).set({ "Content-Type": "text/html" }).send(html);
  } catch (e) {
    vite?.ssrFixStacktrace(e);
    console.log(e.stack);
    res.status(500).end(e.stack);
  }
});

// Start http server
app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});
