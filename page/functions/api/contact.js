const contactConfig = {
  from: "100 AI Projects <contact@100aiprojects.dev>",
};

const json = (body, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json; charset=utf-8" },
  });

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
  if (!isValidEmail(email) || email.length > 254) errors.email = "invalid_email";
  if (message.length < 10 || message.length > 2000) errors.message = "invalid_message";

  return errors;
};

const escapeHtml = (value) =>
  String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");

export async function onRequestPost({ request, env }) {
  let body;
  try {
    body = await request.json();
  } catch {
    return json({ ok: false, code: "invalid_json" }, 400);
  }

  const payload = normalizeContactPayload(body);
  const errors = validateContactPayload(payload);

  if (Object.keys(errors).length > 0) {
    return json({ ok: false, code: "validation_error", errors }, 400);
  }

  if (!env.RESEND_API_KEY) {
    return json({ ok: false, code: "email_not_configured" }, 500);
  }

  const toEmail = env.CONTACT_TO_EMAIL;
  const fromEmail = env.CONTACT_FROM_EMAIL || contactConfig.from;

  if (!toEmail) {
    return json({ ok: false, code: "email_not_configured" }, 500);
  }

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: fromEmail,
        to: toEmail,
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

    const result = await response.json().catch(() => ({}));

    if (!response.ok || result?.error) {
      return json({ ok: false, code: "email_send_failed" }, 502);
    }

    return json({ ok: true, id: result?.id ?? null });
  } catch {
    return json({ ok: false, code: "email_send_failed" }, 502);
  }
}

export function onRequest({ request }) {
  if (request.method === "OPTIONS") return new Response(null, { status: 204 });
  return json({ ok: false, code: "method_not_allowed" }, 405);
}
