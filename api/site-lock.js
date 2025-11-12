export default async function handler(req, res) {
if (req.method !== "POST") return res.status(405).json({ ok: false, error: "Method not allowed" });
try {
    const SECRET = process.env.SITE_LOCK_PASSPHRASE;
    if (!SECRET) return res.status(500).json({ ok: false, error: "Server not configured" });
    const { passphrase } = req.body || {};
    if (typeof passphrase !== "string") return res.status(400).json({ ok: false });
    const isValid = passphrase === SECRET;
    res.status(200).json({ ok: isValid });
} catch (err) {
    console.error("site-lock error:", err);
    res.status(500).json({ ok: false });
}
}
