import React from "react";
import { BG_GIFS } from "../utils/brainrot";

export default function BrainrotBackdrop() {
    return (
    <div
    aria-hidden
    style={{
        position: "fixed",
        inset: 0,
        overflow: "hidden",
        zIndex: 0,
        background: "radial-gradient(1200px 700px at 50% 50%, rgba(0,0,0,.12), rgba(0,0,0,.92))",
    }}
    >
    <div
        style={{
        position: "absolute",
        inset: 0,
        display: "grid",
        gridTemplateColumns: "36vw 42vw 22vw",
        gridTemplateRows: "36vh 36vh 28vh",
        gap: "1.6vw 1.6vw",
        padding: "1.6vw",
        mixBlendMode: "normal",
        }}
        >
        {BG_GIFS.map((src, i) => (
        <div
            key={src}
            style={{
            borderRadius: 18,
            overflow: "hidden",
            boxShadow: "0 10px 40px rgba(0,0,0,.35) inset",
            transform: `translateZ(0) scale(${i % 3 === 0 ? 1.02 : 1})`,
            filter: "saturate(1.06) contrast(1.04)",
            }}
            >
            <img
            src={src}
            alt=""
            loading="eager"
            decoding="async"
            fetchpriority="high"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
            onError={(e) => (e.currentTarget.style.display = "none")}
            />
        </div>
        ))}
        </div>

        <div
        style={{
        position: "absolute",
        inset: 0,
        background: "radial-gradient(65% 55% at 50% 45%, rgba(0,0,0,0) 0%, rgba(0,0,0,.45) 100%)",
        pointerEvents: "none",
        }}
    />
    </div>
);
}
