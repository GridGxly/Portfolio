import { useEffect, useRef, useState } from "react";
import { useElevenAgent } from "@/utils/eleven-ws";
import { toPrompt } from "@/data/site-context";

const INTRO_LINE = "Hey—I'm GRIDGXLY, Ralph’s assistant for this portfolio. Ask me about his projects, skills, or experience.";

export default function GridgxlyAssistant() {
const [active, setActive] = useState(false);
const [logs, setLogs] = useState([]);
const startedRef = useRef(false);

    const agent = useElevenAgent({
    onReady: () => setLogs((l) => [...l, "Agent ready"]),
    onUserTranscript: (t) => t && setLogs((l) => [...l, `You: ${t}`]),
    onAgentText: (t) => t && setLogs((l) => [...l, `AI: ${t}`]),
    onInterruption: () => setLogs((l) => [...l, "⛔ Interrupted"]),
    getContextText: async () => toPrompt(),
    debug: false,
    });

    async function start() {
    if (startedRef.current) return;
    startedRef.current = true;
    try {
    await agent.start();
    setActive(true);
    } catch (e) {
    console.error("Agent start failed:", e);
    startedRef.current = false;
    }
    }

    function stop() {
    agent.stop();
    setActive(false);
    startedRef.current = false;
    }

    useEffect(() => {
    const onNav = () => agent.contextualUpdate(`User navigated to ${window.location.pathname}`);
    window.addEventListener("popstate", onNav);
    return () => window.removeEventListener("popstate", onNav);
    }, []);

    return (
    <>
    <button
    onClick={active ? stop : start}
    aria-label={active ? "Stop voice assistant" : "Start voice assistant"}
    title={active ? "Tap to end voice" : "Tap to start voice"}
    className={`fixed bottom-5 right-5 z-40 h-16 w-16 rounded-full overflow-hidden border
    border-cyan-400/80 bg-slate-950/80 shadow-[0_0_32px_rgba(56,189,248,.85)]
    transition-transform duration-150 ${active ? "animate-pulse" : "hover:scale-105"}`}
    >
        <img src="/core.gif" alt="GRIDGXLY orb" className="h-full w-full object-cover" />
        </button>


    <div className="hidden">{logs.map((l, i) => <div key={i}>{l}</div>)}</div>
    </>
    );
}
