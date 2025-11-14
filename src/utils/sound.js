import { SFX } from "@/utils/brainrot";

let unlocked = false;
const waiters = [];


export function installAudioUnlock() {
    if (typeof window === "undefined" || unlocked) return;

    const unlockNow = async () => {
    try {
    const a = new Audio();
    a.muted = true;
    a.playsInline = true;
    await a.play().catch(() => {});
    a.pause();
    } catch {}
    unlocked = true;
    window.removeEventListener("pointerdown", unlockNow);
    window.removeEventListener("keydown", unlockNow);
    while (waiters.length) waiters.shift()?.();
    document.dispatchEvent(new Event("ggxly:audio-unlocked"));
};

window.addEventListener("pointerdown", unlockNow, { once: true, passive: true });
window.addEventListener("keydown", unlockNow, { once: true });
}


export function unlock() {
if (unlocked) return Promise.resolve();
installAudioUnlock();
return new Promise((resolve) => waiters.push(resolve));
}

export function playSfx(name, { volume = 1 } = {}) {
    const src = SFX?.[name];
    if (!src) return;
    try {
    const a = new Audio(src);
    a.dataset.ggxly = "sfx";
    a.playsInline = true;
    a.volume = volume;
    a.play().catch(() => {});
} catch {}
}
