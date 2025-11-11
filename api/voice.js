    const ELEVEN_API_KEY = process.env.ELEVENLABS_API_KEY;
    const ELEVEN_VOICE_ID = process.env.ELEVENLABS_VOICE_ID;

    export default async function handler(req, res) {
    if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
    }

    if (!ELEVEN_API_KEY || !ELEVEN_VOICE_ID) {
    res.status(500).json({
    error: "Missing ELEVENLABS_API_KEY or ELEVENLABS_VOICE_ID env variables.",
    });
    return;
    }

    try {
    const { text } = req.body || {};
    if (!text || typeof text !== "string") {
    res.status(400).json({ error: "Missing 'text' string in request body." });
    return;
    }

    const elevenRes = await fetch(
    `https://api.elevenlabs.io/v1/text-to-speech/${ELEVEN_VOICE_ID}`,
    {
    method: "POST",
    headers: {
    Accept: "audio/mpeg",
    "Content-Type": "application/json",
    "xi-api-key": ELEVEN_API_KEY,
        },
        body: JSON.stringify({
    text,
    model_id: "eleven_multilingual_v2",
    voice_settings: {
    stability: 0.4,
    similarity_boost: 0.85,
    style: 0.3,
    use_speaker_boost: true,
        },
        }),
        }
    );

    if (!elevenRes.ok) {
    const errText = await elevenRes.text().catch(() => "");
    console.error("ElevenLabs error:", elevenRes.status, errText);
    res.status(500).json({ error: "ElevenLabs TTS failed." });
    return;
    }

    const arrayBuffer = await elevenRes.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    res.setHeader("Content-Type", "audio/mpeg");
    res.setHeader("Content-Length", buffer.length);
    res.status(200).send(buffer);
    } catch (err) {
    console.error("GRIDGXLY voice backend error:", err);
    res.status(500).json({
    error: "GRIDGXLY voice backend error",
    details: err.message,
    });
    }
}
