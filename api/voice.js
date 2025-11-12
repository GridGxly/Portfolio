// src/utils/voice.js
// Voice helpers with a simple queue. Tries server TTS first, then falls back to Web Speech.

// Keep a single queue so audio clips never overlap
let queue = Promise.resolve();

/** Stop any in-flight <audio> created by us */
export function stopAllAudio() {
  if (typeof document === "undefined") return;
  try {
    const audios = document.querySelectorAll('audio[data-ggxly]');
    audios.forEach(a => { try { a.pause(); a.currentTime = 0; } catch {} });
  } catch {}
}

/** Speak text in sequence. onStart/onEnd are optional callbacks. */
export function speakQueued(text, onStart = () => {}, onEnd = () => {}) {
  queue = queue.then(() => play(text, onStart, onEnd)).catch(() => {});
  return queue;
}

async function play(text, onStart, onEnd) {
  if (!text) return;
  onStart();
  try {
    // Prefer server-side TTS (Vercel function at /api/tts-elevenlabs)
    const r = await fetch("/api/tts-elevenlabs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    });
    if (!r.ok) throw new Error("TTS server error");
    const blob = await r.blob();
    const url = URL.createObjectURL(blob);
    await playAudio(url);
    URL.revokeObjectURL(url);
  } catch {
    // Fallback to client speech if API/network fails or in dev
    await fallbackTTS(text);
  } finally {
    onEnd();
  }
}

function playAudio(url) {
  return new Promise((resolve, reject) => {
    if (typeof Audio === "undefined") { resolve(); return; }
    const a = new Audio(url);
    a.setAttribute("data-ggxly", "1");
    a.addEventListener("ended", resolve, { once: true });
    a.addEventListener("error", reject, { once: true });
    a.play().catch(reject);
  });
}

function fallbackTTS(text) {
  return new Promise((resolve) => {
    try { if (typeof window !== "undefined") window.speechSynthesis?.cancel(); } catch {}
    if (typeof window === "undefined" || typeof SpeechSynthesisUtterance === "undefined") {
      resolve(); return;
    }
    const u = new SpeechSynthesisUtterance(text);
    u.rate = 1.02;
    u.pitch = 0.95;
    u.onend = resolve;
    window.speechSynthesis.speak(u);
  });
}
