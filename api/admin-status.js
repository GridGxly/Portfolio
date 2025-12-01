export default function handler(req, res) {
if (req.method !== "GET") {
    return res.status(405).json({ ok: false, error: "Method not allowed" });
}

try {

    const cookie = req.headers.cookie || "";
    const isAdmin = cookie.split(";").some((part) =>
    part.trim().startsWith("grid_admin=")
    );

    if (!isAdmin) {
    res.setHeader("X-Admin-Status", "none");
    return res.status(200).json({ ok: false });
    }

    res.setHeader("X-Admin-Status", "ok");
    return res.status(200).json({ ok: true });
} catch (err) {
    console.error("admin-status error:", err);
    return res.status(500).json({ ok: false, error: "SERVER_ERROR" });
}
}
