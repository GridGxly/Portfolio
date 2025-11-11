export async function playElevenLabsVoice(text) {
if (!text || typeof text !== "string") return;

try {
    const res = await fetch("/api/gridgxly-voice", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text }),
    });

    if (!res.ok) {
    console.error("gridgxly-voice API error:", res.status);
    throw new Error("voice-api");
    }

    const arrayBuffer = await res.arrayBuffer();
    const blob = new Blob([arrayBuffer], { type: "audio/mpeg" });
    const url = URL.createObjectURL(blob);

    const audio = new Audio(url);
    audio.play();

    
    audio.onended = () => {
    URL.revokeObjectURL(url);
    };

    return;
} catch (err) {
    console.error("playElevenLabsVoice error:", err);
    throw err;
}
}
