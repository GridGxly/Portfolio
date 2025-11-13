let queue = Promise.resolve();

export function stopAllAudio() {
document.querySelectorAll("audio[data-ggxly]").forEach(a => {
    try { a.pause(); a.currentTime = 0; } catch {}
});
}

export function speakQueued(text, onStart = () => {}, onEnd = () => {}) {
queue = queue.then(() => play(text, onStart, onEnd)).catch(() => {});
return queue;
}

async function play(text, onStart, onEnd) {
onStart();
try {

    const timeoutMs = 1200;
    const ctl = new AbortController();
    const slow = new Promise((resolve) => setTimeout(resolve, timeoutMs));
    const fetchReq = fetch("/api/tts-elevenlabs", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text }),
    signal: ctl.signal
    });

    const winner = await Promise.race([slow.then(() => "timeout"), fetchReq]);

    if (winner === "timeout") {
    await fallbackTTS(text);
    try {
        const r = await fetchReq;
        if (r.ok) {
        const blob = await r.blob();
        const url = URL.createObjectURL(blob);
        await playAudio(url);
        URL.revokeObjectURL(url);
        }
        } catch {}
    } else {
    const r = winner;
    if (!r.ok) throw new Error("TTS server error");
    const blob = await r.blob();
    const url = URL.createObjectURL(blob);
    await playAudio(url);
    URL.revokeObjectURL(url);
    }
    } catch {
    await fallbackTTS(text);
    } finally {
    onEnd();
    }
}

function playAudio(url) {
return new Promise((resolve, reject) => {
    const a = new Audio(url);
    a.setAttribute("data-ggxly", "1");
    a.addEventListener("ended", resolve, { once: true });
    a.addEventListener("error", reject, { once: true });
    a.play().catch(reject);
});
}

function fallbackTTS(text) {
return new Promise((resolve) => {
    try { window.speechSynthesis?.cancel(); } catch {}
    const u = new SpeechSynthesisUtterance(text);
    u.rate = 1.02;
    u.pitch = 0.95;
    u.onend = resolve;
    (window.speechSynthesis || {}).speak?.(u);
    if (!window.speechSynthesis) resolve();
});
}
