import { useEffect, useState } from "react";
import { useElevenAgent } from "../utils/eleven-ws";
import { toPrompt } from "../data/site-context";

export default function GridgxlyAssistant() {
const [listening, setListening] = useState(false);
const [logs, setLogs] = useState([]);

const agent = useElevenAgent({
onReady: () => setLogs((l) => [...l, "Agent ready"]),
onUserTranscript: (t) => setLogs((l) => [...l, `You: ${t}`]),
onAgentText: (t) => setLogs((l) => [...l, `AI: ${t}`]),
onInterruption: () => setLogs((l) => [...l, "⛔ Interrupted"]),
getContextText: async () => toPrompt(),
});

const toggle = async () => {
if (listening) { agent.stop(); setListening(false); }
    else { await agent.start(); setListening(true); }
};

useEffect(() => {
const handler = () => agent.contextualUpdate(`User navigated to ${window.location.pathname}`);
window.addEventListener("popstate", handler);
return () => window.removeEventListener("popstate", handler);
    }, []);

    return (
    <>
    <button
        onClick={toggle}
        aria-label={listening ? "Stop voice assistant" : "Start voice assistant"}
        style={{
        position: "fixed",
        right: "16px",
        bottom: "16px",
        width: "64px",
        height: "64px",
        padding: 0,
        border: "none",
        background: "transparent",
        borderRadius: "50%",   
        overflow: "hidden", 
        zIndex: 9999,
        cursor: "pointer",
        }}
        >
        <img
        src="/core.gif"
        alt=""
        width={64}
        height={64}
        style={{
            display: "block",
            width: "100%",
            height: "100%",
            objectFit: "cover",
            borderRadius: "50%",
        }}
        />
    </button>

    <div style={{ display: "none" }}>
        {logs.map((l, i) => (<div key={i}>{l}</div>))}
    </div>
    </>
);
}
