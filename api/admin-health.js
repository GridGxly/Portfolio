    function isAdminFromCookie(req) {
    const cookie = req.headers.cookie || "";
    return cookie.split(";").some((part) =>
    part.trim().startsWith("grid_admin=")
    );
}

    async function timedFetch(url, options = {}) {
    const start = Date.now();
    try {
    const res = await fetch(url, options);
    const ms = Date.now() - start;
    return {
    ok: res.ok,
    status: res.status,
    ms,
    };
    } catch (err) {
    console.error("admin-health fetch error for", url, err);
    const ms = Date.now() - start;
    return {
    ok: false,
    status: 0,
    ms,
    error: "NETWORK_ERROR",
    };
    }
}

    export default async function handler(req, res) {
    if (req.method !== "GET") {
    return res.status(405).json({ ok: false, error: "Method not allowed" });
    }

    if (!isAdminFromCookie(req)) {
    return res.status(404).json({ ok: false });
    }

    try {
    const base =
    process.env.VERCEL_URL
        ? `https://${process.env.VERCEL_URL}`
        : process.env.SITE_BASE_URL || "http://localhost:5173";

    const [voice, contact, siteLock] = await Promise.all([
    timedFetch(`${base}/api/eleven-signed-url`),
    timedFetch(`${base}/api/admin-login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ passphrase: "NOOP" }), 
    }),
    timedFetch(`${base}/api/site-lock`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ passphrase: "NOOP" }),
    }),
    ]);

    return res.status(200).json({
    ok: true,
    services: {
        voice,
        contact,
        siteLock,
    },
    checkedAt: Date.now(),
    });
    } catch (err) {
    console.error("admin-health handler error:", err);
    return res.status(500).json({ ok: false, error: "SERVER_ERROR" });
    }
}
