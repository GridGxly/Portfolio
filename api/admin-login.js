export default async function handler(req, res) {
if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
}

const secret = process.env.ADMIN_PASSPHRASE;

if (!secret) {
    console.error("ADMIN_PASSPHRASE is not set on the server");
    res.status(500).json({ error: "Admin auth not configured." });
    return;
}

const { passphrase } = req.body || {};

if (!passphrase || typeof passphrase !== "string") {
    res.status(400).json({ error: "Missing passphrase." });
    return;
}

const ok = passphrase === secret;

if (!ok) {

    await new Promise((r) => setTimeout(r, 500));
    res.status(401).json({ ok: false });
    return;
}


  const maxAge = 60 * 60 * 4;

res.setHeader(
    "Set-Cookie",
    `gridgxly_admin=1; HttpOnly; Path=/; SameSite=Lax; Max-Age=${maxAge}`
);

res.status(200).json({ ok: true });
}
