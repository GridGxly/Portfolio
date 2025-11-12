import { useEffect, useRef, useState } from "react";
import { speakQueued, stopAllAudio } from "../utils/voice";
import { callChat } from "../utils/chat";



export default function GridgxlyAssistant() {
const [isActive, setIsActive] = useState(false);
const [isSpeaking, setIsSpeaking] = useState(false);
const [speechOK, setSpeechOK] = useState(true);

const SR = useRef(null);
const convo = useRef([]);
const greeted = useRef(false); 
const shouldResume = useRef(false);
const speakingFlag = useRef(false);
const lastHeardAt = useRef(0);
const askedFollowUp = useRef(false);
const awaitingDone = useRef(false);
const idleTimer = useRef(null);

useEffect(() => {
    try { greeted.current = (localStorage.getItem("ggxly_greeted") === "1"); } catch {}
}, []);

const beginIdleClock = () => {
    if (idleTimer.current) return;
    idleTimer.current = setInterval(async () => {
    if (!isActive || speakingFlag.current) return;
    const idleMs = Date.now() - lastHeardAt.current;
    if (idleMs > 15000 && !askedFollowUp.current) {
        askedFollowUp.current = true;
        awaitingDone.current = true;
        await say("Is that all?");
    }
    }, 1000);
};

const clearIdleClock = () => {
    if (idleTimer.current) clearInterval(idleTimer.current);
    idleTimer.current = null;
};

async function say(text) {
    if (!text) return;
    speakingFlag.current = true;
    setIsSpeaking(true);
    stopListening();
    try {
    await speakQueued(text, () => setIsSpeaking(true), () => setIsSpeaking(false));
    } finally {
    setIsSpeaking(false);
    speakingFlag.current = false;
    if (isActive) setTimeout(startListening, 180);
    }
    }

    function startListening() {
    if (!SR.current) return;
    shouldResume.current = true;
    try { SR.current.start(); } catch {}
    lastHeardAt.current = Date.now();
    askedFollowUp.current = false;
    beginIdleClock();
}

    function stopListening() {
    shouldResume.current = false;
    try { SR.current.abort(); } catch {}
    clearIdleClock();
}

    async function handleTranscript(raw) {
    const t = (raw || "").trim();
    if (!t || t.length < 4) return;
    const lower = t.toLowerCase();

    if (lower.includes("guided responsive interactive dialogue generating") || lower.startsWith("hello i am gridgxly")) return;

    lastHeardAt.current = Date.now();
    askedFollowUp.current = false;

    if (!greeted.current) {
    greeted.current = true;
    try { localStorage.setItem("ggxly_greeted", "1"); } catch {}
    await say(
        "Hey—I'm GRIDGXLY, short for Guided Responsive Interactive Dialogue Generating Experience Logic for You. " +
        "I'm Ralph's assistant. Ask me anything about him. When you're done, tap the orb again to end the call."
    );
    }

    if (awaitingDone.current) {
    awaitingDone.current = false;
    if (/^(yes|yeah|yep|that's all|that is all|i'?m done|im done)\b/i.test(t)) {
        await say("Thanks for visiting Ralph’s portfolio. I’m taking you to the contact page.");
        try { window.location.href = "/contact"; } catch {}
        toggle();
        return;
    }
    }

    if (/\b(contact|reach|email)\b/i.test(lower)) { await say("Opening the contact section."); try {
    const el = document.getElementById("contact");
    if (el) setTimeout(() => el.scrollIntoView({ behavior: "smooth" }), 300);
    else window.location.href = "/contact";
    } catch {} return; }
    if (/\bprojects?\b/i.test(lower)) { await say("Jumping to Projects."); window.location.href="/projects"; return; }
    if (/\bexperience\b/i.test(lower)) { await say("Opening Experience."); window.location.href="/experience"; return; }
    if (/\bskills?\b/i.test(lower)) { await say("Heading to Skills."); window.location.href="/skills"; return; }

    const reply = await callChat(convo.current, t);
    convo.current = [...convo.current, { role: "user", content: t }, { role: "assistant", content: reply }];
    await say(reply);
    }

    function toggle() {
    if (!speechOK) {
    alert("Voice needs Chrome/Edge desktop for best results.");
    return;
    }
    if (!isActive) {
    setIsActive(true);
    startListening();
    } else {
    setIsActive(false);
    stopListening();
    try { window.speechSynthesis?.cancel(); } catch {}
    try {
        const audios = document.querySelectorAll("audio[data-ggxly]");
        audios.forEach(a => { try { a.pause(); a.currentTime = 0; } catch {} });
    } catch {}
    }
    }

    useEffect(() => {
    const SRCls = (typeof window !== "undefined") && (window.SpeechRecognition || window.webkitSpeechRecognition);
    if (!SRCls) { setSpeechOK(false); return; }
    const rec = new SRCls();
    rec.lang = "en-US";
    rec.continuous = true;
    rec.interimResults = false;

    rec.onresult = (evt) => {
    if (speakingFlag.current) return;
    const last = evt.results[evt.results.length - 1];
    if (!last?.isFinal) return;
    handleTranscript(last[0]?.transcript || "");
    };

    rec.onerror = () => {};
    rec.onend = () => {
    if (shouldResume.current && !speakingFlag.current) {
        try { rec.start(); } catch {}
    }
    };

    SR.current = rec;
    return () => { try { rec.abort(); } catch {}; SR.current = null; clearIdleClock(); };
    }, []);

    return (
    <button
    onClick={toggle}
    aria-label={isActive ? "Stop voice assistant" : "Start voice assistant"}
    title={isActive ? "Tap to end call" : "Tap to start voice"}
    className={`fixed bottom-5 right-5 z-40 h-16 w-16 rounded-full overflow-hidden border
        border-cyan-400/80 bg-slate-950/80 shadow-[0_0_32px_rgba(56,189,248,.85)]
        transition-transform duration-150 ${isActive || isSpeaking ? "animate-pulse" : "hover:scale-105"}`}
    >
    <img src="/core.gif" alt="GRIDGXLY core" className="h-full w-full object-cover" />
    </button>
    );
}
