export default async function handler(req, res) {
    if (req.method !== "GET") return res.status(405).json({ error: "Method not allowed" });

    try {
    const apiKey = process.env.ELEVEN_API_KEY;
    const agentId = process.env.ELEVEN_AGENT_ID;
    if (!apiKey || !agentId) return res.status(500).json({ error: "Missing ELEVEN_* envs" });

    const r = await fetch(`https://api.elevenlabs.io/v1/convai/conversation/get-signed-url?agent_id=${agentId}`, {
    headers: { "xi-api-key": apiKey }
    });
    if (!r.ok) {
    const text = await r.text();
    return res.status(r.status).json({ error: "ELEVEN_SIGN_URL_FAILED", details: text });
    }
    const { signed_url } = await r.json();
    const url = new URL(signed_url);
    return res.status(200).json({ signedUrl: url.toString() });
    } catch (e) {
    console.error(e);
    return res.status(500).json({ error: "SERVER_ERROR" });
    }
}
