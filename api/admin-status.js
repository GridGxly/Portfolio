function isAdminFromCookie(cookieHeader) {
if (!cookieHeader) return false;

return cookieHeader
    .split(";")
    .map((c) => c.trim())
    .some((c) => c.startsWith("gridgxly_admin=1"));
}

export default function handler(req, res) {
const cookieHeader = req.headers.cookie || "";
const isAdmin = isAdminFromCookie(cookieHeader);

res.status(200).json({ ok: isAdmin });
}
