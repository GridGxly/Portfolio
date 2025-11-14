import React, { useEffect, useMemo, useRef, useState } from "react";
import BrainrotBackdrop from "./BrainrotBackdrop";
import BrainrotPlayer from "./BrainrotPlayer";
import { OVERLAY_RIGHT, OVERLAY_WRONG, SFX } from "../utils/brainrot";


const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function postJSON(url, body) {
try {
    const res = await fetch(url, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(body || {}),
    });
    if (!res.ok) return { ok: false };
    return await res.json();
    } catch {
    return { ok: false };
    }
}


function ChipsOverlay({ kind = "right", onDone }) {
    const items = kind === "right" ? OVERLAY_RIGHT : OVERLAY_WRONG;
    const chips = useMemo(() => {
    const n = 16;
    return Array.from({ length: n }).map((_, i) => ({
    src: items[i % items.length],
      left: `${Math.random() * 90 + 2}%`,
      top: `${Math.random() * 80 + 5}%`,
      size: `${Math.random() * 80 + 60}px`,
      rot: `${Math.random() * 30 - 15}deg`,
    }));
    }, [kind, items]);

    useEffect(() => {
    const t = setTimeout(onDone, 8000);
    return () => clearTimeout(t);
    }, [onDone]);

    return (
    <div
    aria-hidden
    style={{
        position: "fixed",
        inset: 0,
        zIndex: 50,
        background: "rgba(0,0,0,.55)",
        backdropFilter: "blur(2px)",
    }}
    >
    {chips.map((c, i) => (
        <img
        key={i}
        src={c.src}
        alt=""
        style={{
            position: "absolute",
            left: c.left,
            top: c.top,
            width: c.size,
            height: c.size,
            objectFit: "contain",
            transform: `rotate(${c.rot})`,
            pointerEvents: "none",
            filter: kind === "wrong" ? "hue-rotate(30deg) saturate(1.2)" : "none",
        }}
        loading="eager"
        />
    ))}
    </div>
);
}


function NoNoPopover({ anchorRef, open }) {
if (!open || !anchorRef?.current) return null;
const rect = anchorRef.current.getBoundingClientRect();
const left = rect.left + rect.width / 2 - 70;
const top = rect.top - 90;
return (
    <div
    style={{
        position: "fixed",
        left, top,
        zIndex: 60,
        padding: 8,
        background: "rgba(0,0,0,.85)",
        border: "1px solid rgba(255,255,255,.1)",
        borderRadius: 12,
    }}
    >
    <img
        src={SFX.noNo}
        alt="no no"
        width={140}
        height={78}
        style={{ display: "block", borderRadius: 8 }}
    />
    </div>
);
}

export default function SiteLockGate({ onUnlocked }) {
const [pass, setPass] = useState("");
const [busy, setBusy] = useState(false);
const [overlay, setOverlay] = useState(null);
const [noNoOpen, setNoNoOpen] = useState(false);
const [pauseForGuess, setPauseForGuess] = useState(false);
const viewBtnRef = useRef(null);


const wrongRef = useRef(null);
const yayRef = useRef(null);


const onViewPassword = async () => {
    setNoNoOpen(true);
    setTimeout(() => setNoNoOpen(false), 4200);
};


    const tryUnlock = async () => {
    setBusy(true);
    setPauseForGuess(true);


    let ok = false;
    const server = await postJSON("/api/site-lock", { passphrase: pass.trim() });
    if (server && server.ok) ok = true;


    if (!ok) {
    const local = import.meta.env.VITE_LOCAL_PASSPHRASE;
    if (typeof local === "string" && local.length) {
        ok = pass.trim() === local;
    }
    }


    if (ok) {
    setOverlay("right");
    yayRef.current?.play?.();
    await sleep(800);
    await sleep(7200);
    setOverlay(null);
    setPauseForGuess(false);
    yayRef.current?.pause?.();
    yayRef.current && (yayRef.current.currentTime = 0);
    onUnlocked?.();
    } else {
    setOverlay("wrong");
    wrongRef.current?.play?.();
    await sleep(800);
    await sleep(7200);
    setOverlay(null);
    setPauseForGuess(false);
    wrongRef.current?.pause?.();
    wrongRef.current && (wrongRef.current.currentTime = 0);
    }

    setBusy(false);
    };

    return (
    <div style={{ position: "relative", minHeight: "100dvh", color: "white" }}>
    <BrainrotBackdrop />


        <div
        style={{
        position: "relative",
        zIndex: 10,
        display: "grid",
        placeItems: "center",
        minHeight: "100dvh",
        padding: 20,
        }}
        >
        <div
        style={{
            width: "min(640px, 92vw)",
            padding: 24,
            borderRadius: 20,
            background: "rgba(5,10,18,.7)",
            border: "1px solid rgba(255,255,255,.08)",
            boxShadow: "0 20px 60px rgba(0,0,0,.45)",
        }}
        >
        <div style={{ letterSpacing: 3, color: "#19E1FF", fontSize: 12, marginBottom: 8 }}>
            GRIDGXLY.DEV
        </div>
        <div style={{ fontWeight: 700, fontSize: 22, lineHeight: 1.3, marginBottom: 18 }}>
            my portfolio is currently still being worked on, please come back later...
        </div>

        <input
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            placeholder="enter password"
            style={{
            width: "100%",
            padding: "12px 16px",
            borderRadius: 12,
            border: "1px solid rgba(255,255,255,.1)",
            background: "rgba(255,255,255,.04)",
            color: "white",
            outline: "none",
            }}
            />

            <div style={{ display: "flex", gap: 10, marginTop: 12 }}>
            <button
            onClick={tryUnlock}
            disabled={busy || !pass.trim().length}
            style={{
                padding: "10px 16px",
                borderRadius: 12,
                background: busy ? "rgba(0,200,255,.5)" : "#00C9FF",
                color: "#03223a",
                border: "none",
                fontWeight: 700,
            }}
            >
            {busy ? "checking…" : "unlock"}
            </button>

            <button
            ref={viewBtnRef}
            onClick={onViewPassword}
            style={{
                padding: "10px 16px",
                borderRadius: 12,
                background: "rgba(255,255,255,.06)",
                border: "1px solid rgba(255,255,255,.1)",
                color: "white",
            }}
            >
            view password
            </button>
        </div>

        <div style={{ height: 12 }} />


        <BrainrotPlayer
            pausedExternally={pauseForGuess}
            onSongWillChange={() => {}}
            onSongEnded={() => {}}
            onTungCue={() => {
            const el = document.createElement("div");
            el.style.position = "fixed";
            el.style.zIndex = 55;
            el.style.left = "50%";
            el.style.top = "12%";
            el.style.transform = "translate(-50%, 0)";
            el.style.padding = "8px";
            el.style.background = "rgba(0,0,0,.85)";
            el.style.border = "1px solid rgba(255,255,255,.1)";
            el.style.borderRadius = "12px";
            const img = document.createElement("img");
            img.src = SFX.tungPop;
            img.style.width = "240px";
            img.style.height = "auto";
            img.style.display = "block";
            img.style.borderRadius = "10px";
            el.appendChild(img);
            document.body.appendChild(el);
            setTimeout(() => { document.body.removeChild(el); }, 2500);
            }}
            />
        </div>
        </div>


        {overlay && <ChipsOverlay kind={overlay} onDone={() => setOverlay(null)} />}
        <NoNoPopover anchorRef={viewBtnRef} open={noNoOpen} />


        <audio ref={wrongRef} src={SFX.wrong} preload="auto" />
        <audio ref={yayRef}   src={SFX.yay}   preload="auto" />
    </div>
);
}
