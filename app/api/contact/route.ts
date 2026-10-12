const TO_EMAIL = "kieran@sloppyko.com";

type ContactPayload = {
  name?: string;
  business?: string;
  city?: string;
  phone?: string;
  email?: string;
  note?: string;
  company_url?: string; // honeypot
};

const clean = (value: unknown, max = 2000) =>
  typeof value === "string" ? value.trim().slice(0, max) : "";

export async function POST(request: Request) {
  let body: ContactPayload;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }

  // Bots fill the hidden field; pretend it worked.
  if (clean(body.company_url)) return Response.json({ ok: true });

  const name = clean(body.name, 200);
  const business = clean(body.business, 200);
  const city = clean(body.city, 200);
  const phone = clean(body.phone, 50);
  const email = clean(body.email, 200);
  const note = clean(body.note, 5000);

  if (!name || !business || !phone || !email || !note) {
    return Response.json({ error: "Please fill out all required fields." }, { status: 400 });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return Response.json({ error: "Please enter a valid email." }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("RESEND_API_KEY is not set");
    return Response.json({ error: "Email is not configured." }, { status: 500 });
  }

  const text = [
    `Name: ${name}`,
    `Business: ${business}`,
    `City: ${city || "—"}`,
    `Phone: ${phone}`,
    `Email: ${email}`,
    "",
    "Note:",
    note,
  ].join("\n");

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: process.env.CONTACT_FROM_EMAIL ?? "SloppyKo Website <onboarding@resend.dev>",
        to: [TO_EMAIL],
        reply_to: email,
        subject: `New inquiry: ${business} (${name})`,
        text,
      }),
    });

    if (!res.ok) {
      console.error("Resend error", res.status, await res.text());
      return Response.json({ error: "Could not send message." }, { status: 502 });
    }
  } catch (err) {
    console.error("Resend request failed", err);
    return Response.json({ error: "Could not send message." }, { status: 502 });
  }

  return Response.json({ ok: true });
}
