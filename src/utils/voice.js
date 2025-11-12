let _currentAudio = null;

export function stopElevenPlayback() {
try { _currentAudio?.pause(); } catch {}
_currentAudio = null;
}

export async function playElevenLabsVoice(text) {
if (!text || typeof text !== "string") return;

const res = await fetch("/api/gridgxly-voice", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text }),
});
if (!res.ok) throw new Error("voice-api");

const arrayBuffer = await res.arrayBuffer();
const blob = new Blob([arrayBuffer], { type: "audio/mpeg" });
const url = URL.createObjectURL(blob);

return new Promise((resolve, reject) => {
    const audio = new Audio(url);
    _currentAudio = audio;

    audio.onended = () => { URL.revokeObjectURL(url); resolve(); };
    audio.onerror = (e) => { URL.revokeObjectURL(url); reject(e); };

    try { audio.play().catch(reject); } catch (e) { reject(e); }
  });
}
