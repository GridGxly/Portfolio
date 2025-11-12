export default async function handler(req, res) {
const cookie = req.headers.cookie || "";
const isAdmin = /(?:^|;\s*)grid_admin=1(?:;|$)/.test(cookie);
res.status(200).json({ ok: isAdmin });
}
