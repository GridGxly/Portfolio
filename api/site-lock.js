export default async function handler(req, res) {
if (req.method !== "POST") {
    res.status(405).json({ ok: false, error: "Method not allowed" });
    return;
}

try {
    const SECRET = process.env.SITE_LOCK_PASSPHRASE;

    if (!SECRET) {
    console.error("SITE_LOCK_PASSPHRASE is not set on the server.");
    res.status(500).json({ ok: false, error: "Server not configured" });
    return;
    }

    const { passphrase } = req.body || {};

    if (typeof passphrase !== "string") {
    res.status(400).json({ ok: false });
    return;
    }


    const isValid = passphrase === SECRET;

    res.status(200).json({ ok: isValid });
} catch (err) {
    console.error("site-lock error:", err);
    res.status(500).json({ ok: false });
  }
}
