let speaking = false;

export function speakQueued(text, onStart, onEnd) {
    return new Promise((resolve) => {
    if (!("speechSynthesis" in window)) return resolve();

    const utter = new SpeechSynthesisUtterance(text);
    utter.rate = 1; utter.pitch = 1;
    utter.onstart = () => { speaking = true; onStart?.(); };
    utter.onend = () => { speaking = false; onEnd?.(); resolve(); };
    utter.onerror = () => { speaking = false; onEnd?.(); resolve(); };

    const voices = window.speechSynthesis.getVoices?.() || [];
    const en = voices.find((v) => /en-|english/i.test(v.lang)) || voices[0];
    if (en) utter.voice = en;

    try { window.speechSynthesis.cancel(); } catch {}
    window.speechSynthesis.speak(utter);
    });
}

export function stopAllAudio() {
try { window.speechSynthesis?.cancel(); } catch {}
try {
    document.querySelectorAll("audio[data-ggxly]").forEach((a) => {
    try { a.pause(); a.currentTime = 0; } catch {}
    });
    } catch {}
}

export function isSpeaking() { return speaking; }
