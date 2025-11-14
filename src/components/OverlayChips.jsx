import React, { useEffect, useState } from "react";
import { OVERLAY_RIGHT, OVERLAY_WRONG } from "@/utils/brainrot";
import { playSfx, unlock } from "@/utils/sound";

const isSmall = () => window.matchMedia("(max-width: 640px)").matches;
const R = (min, max) => Math.random() * (max - min) + min;

export default function OverlayChips() {
const [chips, setChips] = useState([]);

    useEffect(() => {
    const show = ({ src, x, y, size = 120, rot = 0, durationMs = 1800 }) => {
    const id = crypto.randomUUID();
    const chip = { id, src, x, y, size, rot };
    setChips((c) => [...c, chip]);
    setTimeout(() => setChips((c) => c.filter((k) => k.id !== id)), durationMs + 60);
    };

    const burst = (kind = "right", count) => {
    const list = kind === "right" ? OVERLAY_RIGHT : OVERLAY_WRONG;
    const n = count ?? (isSmall() ? 7 : 12);
    const min = isSmall() ? 64 : 80;
    const max = isSmall() ? 120 : 160;
    for (let i = 0; i < n; i++) {
        const src = list[i % list.length];
        show({
    src,
    x: R(12, window.innerWidth - 12),
    y: R(12, window.innerHeight - 12),
    size: R(min, max),
    rot: R(-16, 16),
    durationMs: 1600 + Math.floor(R(-200, 400)),
        });
    }
    };

    const api = {
    show,
    burst,
    right() { unlock().then(() => { playSfx("yay"); burst("right"); }); },
    wrong() { unlock().then(() => { playSfx("wrong"); burst("wrong"); }); },
    };

    window.GRIDGXLY_OVERLAYS = api;
    return () => { delete window.GRIDGXLY_OVERLAYS; };
    }, []);

    return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[60]">
    {chips.map((c) => (
        <img
        key={c.id}
        src={c.src}
        alt=""
        style={{
            position: "fixed",
            left: c.x - c.size / 2,
            top: c.y - c.size / 2,
            width: c.size,
            height: c.size,
            objectFit: "contain",
            transform: `rotate(${c.rot}deg)`,
            filter: "drop-shadow(0 10px 18px rgba(0,0,0,.35))",
        }}
        onError={(e) => (e.currentTarget.style.display = "none")}
        />
    ))}
    </div>
);
}
