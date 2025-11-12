export default async function handler(req, res) {
if (req.method !== "POST") return res.status(405).json({ ok: false });
const { passphrase } = req.body || {};
const ok = typeof passphrase === "string" && passphrase === process.env.ADMIN_PASSPHRASE;
if (!ok) {
    res.setHeader("X-Admin-Attempt", "fail");
    return res.status(401).json({ ok: false });
}
  const oneWeek = 60 * 60 * 24 * 7;
res.setHeader("Set-Cookie", `grid_admin=1; Max-Age=${oneWeek}; Path=/; HttpOnly; Secure; SameSite=Lax`);
res.status(200).json({ ok: true });
}
