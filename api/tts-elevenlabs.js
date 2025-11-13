export const config = { runtime: "edge" };

export default async function handler(req) {
    try {
    const { text } = await req.json();
    if (!text) return new Response("no text", { status: 400 });

    const key = process.env.ELEVENLABS_API_KEY;
    const voice = process.env.ELEVENLABS_VOICE_ID || "NNl6r8mD7vthiJatiJt1";
    if (!key) return new Response("ELEVENLABS_API_KEY missing", { status: 500 });

    const r = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voice}`, {
    method: "POST",
    headers: { "xi-api-key": key, "Content-Type": "application/json", "Accept": "audio/mpeg" },
    body: JSON.stringify({
        text,
        model_id: "eleven_multilingual_v2",
        voice_settings: { stability: 0.55, similarity_boost: 0.75, style: 0.2, use_speaker_boost: true }
    })
    });

    if (!r.ok) return new Response(`tts fail: ${r.status}`, { status: 502 });

    const bytes = await r.arrayBuffer();
    return new Response(bytes, {
    status: 200,
    headers: { "Content-Type": "audio/mpeg", "Cache-Control": "no-store" }
    });
    } catch (e) {
    return new Response(`edge error: ${e.message}`, { status: 500 });
    }
}
