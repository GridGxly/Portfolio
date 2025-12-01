    export default async function handler(req, res) {
    if (req.method === "OPTIONS") {
    return res.status(200).end();
    }

    if (req.method !== "POST") {
    return res.status(405).json({ ok: false, error: "Method not allowed" });
    }

    try {
    const { name, email, message, subject } = req.body || {};
    if (
    typeof message !== "string" ||
    !message.trim() ||
    typeof email !== "string"
    ) {
    return res
        .status(400)
        .json({ ok: false, error: "Missing required fields" });
    }


    const entry = {
    ts: Date.now(),
    name: (name || "").slice(0, 200),
    email: email.slice(0, 200),
    subject: (subject || "").slice(0, 200),
    message: message.slice(0, 5000),
    userAgent: (req.headers["user-agent"] || "").slice(0, 300),
    ip: req.headers["x-forwarded-for"]
        ? String(req.headers["x-forwarded-for"]).split(",")[0].trim()
        : undefined,
    };

    console.log("[GRIDGXLY_FEEDBACK]", JSON.stringify(entry));



    return res.status(200).json({ ok: true });
    } catch (err) {
    console.error("contact-feedback error:", err);
    return res.status(500).json({ ok: false, error: "SERVER_ERROR" });
    }
}
    function isAdminFromCookie(req) {
    const cookie = req.headers.cookie || "";
    return cookie.split(";").some((part) =>
    part.trim().startsWith("grid_admin=")
    );
}
    export default function handler(req, res) {
    if (req.method !== "GET") {
    return res.status(405).json({ ok: false, error: "Method not allowed" });
    }

    if (!isAdminFromCookie(req)) {
    return res.status(404).json({ ok: false });
    }


    return res.status(200).json({
    ok: true,
    items: [],
    note:
    "Feedback currently logged server-side only (console / logs). " +
    "Hook this up to a private DB if you want real summaries here.",
    });
}
