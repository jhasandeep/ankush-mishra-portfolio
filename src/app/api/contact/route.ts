import { Resend } from "resend";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const hits = new Map<string, number[]>();

// Best-effort limiter (per server instance): 3 messages per 10 minutes per IP.
function limited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < 10 * 60_000);
  if (recent.length >= 3) return true;
  hits.set(ip, [...recent, now]);
  return false;
}

const esc = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }

  // Honeypot: real visitors never fill this hidden field.
  if (typeof body.website === "string" && body.website.trim() !== "") {
    return Response.json({ ok: true });
  }

  const name = String(body.name ?? "").trim().slice(0, 100);
  const email = String(body.email ?? "").trim().slice(0, 200);
  const message = String(body.message ?? "").trim();
  const audience = body.audience === "freelance" ? "Freelance project" : "Job opportunity";

  if (!EMAIL_RE.test(email)) return Response.json({ error: "Please enter a valid email address." }, { status: 400 });
  if (message.length < 10) return Response.json({ error: "Please write a few more words." }, { status: 400 });
  if (message.length > 5000) return Response.json({ error: "Message is too long." }, { status: 400 });

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (limited(ip)) return Response.json({ error: "Too many messages. Please try again later." }, { status: 429 });

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  if (!apiKey || !to) return Response.json({ error: "Email service is not configured." }, { status: 500 });

  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from: "Portfolio Contact <onboarding@resend.dev>",
    to,
    replyTo: email,
    subject: `[${audience}] ${name || email}`,
    text: `${audience}\nFrom: ${name || "(no name)"} <${email}>\n\n${message}`,
    html: `<div style="font-family:system-ui,sans-serif;max-width:560px">
      <p style="color:#6366f1;font-weight:600;margin:0 0 12px">${esc(audience)}</p>
      <p style="margin:0 0 4px"><strong>${esc(name || "(no name)")}</strong></p>
      <p style="margin:0 0 16px"><a href="mailto:${esc(email)}">${esc(email)}</a></p>
      <div style="white-space:pre-wrap;border-left:3px solid #6366f1;padding-left:12px">${esc(message)}</div>
    </div>`,
  });

  if (error) {
    console.error("Resend error:", error);
    return Response.json({ error: "Could not send your message. Please email me directly." }, { status: 502 });
  }
  return Response.json({ ok: true });
}
