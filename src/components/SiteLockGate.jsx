import React, { useEffect, useRef, useState } from "react";
import BrainrotBackdrop from "./BrainrotBackdrop";
import BrainrotPlayer from "./BrainrotPlayer";
import { SFX } from "../utils/brainrot";

const SITE_LOCK_ENABLED = import.meta.env.VITE_SITE_LOCK_ENABLED === "true";
const LOCAL_PASSPHRASE = import.meta.env.VITE_LOCAL_PASSPHRASE;
const STORAGE_KEY = "gridgxly_site_unlocked_v1";

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function postJSON(url, body) {
try {
    const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body || {}),
    });
    if (!res.ok) return { ok: false };
    return res.json();
    } catch {
    return { ok: false };
    }
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
        left,
        top,
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

export default function SiteLockGate({ children }) {
if (!SITE_LOCK_ENABLED) {
    return children;
}

const [pass, setPass] = useState("");
const [busy, setBusy] = useState(false);
const [noNoOpen, setNoNoOpen] = useState(false);
const [pauseForGuess, setPauseForGuess] = useState(false);
const [unlocked, setUnlocked] = useState(() => {
    if (!SITE_LOCK_ENABLED) return true;
    if (typeof window === "undefined") return false;
    try {
    return localStorage.getItem(STORAGE_KEY) === "1";
    } catch {
    return false;
    }
    });

    const viewBtnRef = useRef(null);
    const wrongRef = useRef(null);
    const yayRef = useRef(null);


    useEffect(() => {
    if (!SITE_LOCK_ENABLED || typeof window === "undefined") return;
    try {
    if (unlocked) {
        localStorage.setItem(STORAGE_KEY, "1");
    } else {
        localStorage.removeItem(STORAGE_KEY);
    }
    } catch {
    }
    }, [unlocked]);

    const onViewPassword = () => {
    setNoNoOpen(true);
    setTimeout(() => setNoNoOpen(false), 4200);
    };

    const tryUnlock = async () => {
    setBusy(true);
    setPauseForGuess(true);

    const trimmed = pass.trim();
    let ok = false;

    const server = await postJSON("/api/site-lock", { passphrase: trimmed });
    if (server && server.ok) ok = true;


    if (!ok && typeof LOCAL_PASSPHRASE === "string" && LOCAL_PASSPHRASE.length) {
    ok = trimmed === LOCAL_PASSPHRASE;
    }

    if (ok) {
    window.GRIDGXLY_OVERLAYS?.burst("right", 14);
    try {
        if (yayRef.current) {
        yayRef.current.volume = 0.8;
        await yayRef.current.play();
        }
    } catch {}

    await sleep(1200);
    setUnlocked(true);
    } else {
    window.GRIDGXLY_OVERLAYS?.burst("wrong", 12);
    try {
        if (wrongRef.current) {
        wrongRef.current.volume = 0.8;
        await wrongRef.current.play();
        }
    } catch {}

    await sleep(1200);
    }

    setBusy(false);
    setPauseForGuess(false);
    };


    if (unlocked) {
    return children;
    }


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
        <div
            style={{
            letterSpacing: 3,
            color: "#19E1FF",
            fontSize: 12,
            marginBottom: 8,
            }}
        >
            GRIDGXLY.DEV
        </div>

        <div
            style={{
            fontWeight: 700,
            fontSize: 22,
            lineHeight: 1.3,
            marginBottom: 18,
            }}
        >
            my portfolio is currently still being worked on, please come back
            later... (I appreciate the visit though, means a lot ❤️) have a
            great rest of your day!
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
            type="button"
            onClick={tryUnlock}
            disabled={busy || !pass.trim().length}
            style={{
                padding: "10px 16px",
                borderRadius: 12,
                background: busy ? "rgba(0,200,255,.5)" : "#00C9FF",
                color: "#03223a",
                border: "none",
                fontWeight: 700,
                cursor:
                busy || !pass.trim().length ? "default" : "pointer",
            }}
            >
            {busy ? "checking…" : "unlock"}
            </button>

            <button
            type="button"
            ref={viewBtnRef}
            onClick={onViewPassword}
            style={{
                padding: "10px 16px",
                borderRadius: 12,
                background: "rgba(255,255,255,.06)",
                border: "1px solid rgba(255,255,255,.1)",
                color: "white",
                cursor: "pointer",
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
            const x = window.innerWidth / 2;
              const y = Math.max(80, window.innerHeight * 0.12);
            window.GRIDGXLY_OVERLAYS?.show({
                src: SFX.tungPop,
                x,
                y,
                size: 260,
                durationMs: 2400,
            });
            }}
        />
        </div>
        </div>

    <NoNoPopover anchorRef={viewBtnRef} open={noNoOpen} />
    <audio ref={wrongRef} src={SFX.wrong} preload="auto" />
    <audio ref={yayRef} src={SFX.yay} preload="auto" />
    </div>
    );
}
