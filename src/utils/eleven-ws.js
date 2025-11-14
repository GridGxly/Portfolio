let audioCtx;
let queue = [];
let playing = false;

function ensureAudio() {
    if (!audioCtx) {
    try { audioCtx = new (window.AudioContext || window.webkitAudioContext)(); } catch {}
    }
}

async function playBase64Mp3(b64) {
const audio = new Audio(`data:audio/mpeg;base64,${b64}`);
await audio.play();
return new Promise((res) => { audio.onended = res; audio.onerror = res; });
}

async function drain(debug) {
if (playing) return;
playing = true;
while (queue.length) {
const b64 = queue.shift();
try { await playBase64Mp3(b64); }
catch (e) { if (debug) console.warn("[GRIDGXLY] audio chunk failed:", e); }
    }
    playing = false;
}

export function useElevenAgent({
onUserTranscript, onAgentText, onInterruption, onReady, getContextText,
debug = false,
} = {}) {
let ws;
let micStream;
let mediaRecorder;

    const start = async () => {
    ensureAudio();

    const r = await fetch("/api/eleven-signed-url");
    if (!r.ok) {
    const txt = await r.text().catch(() => "");
    throw new Error(`signed-url failed ${r.status}: ${txt}`);
    }
    const { signedUrl } = await r.json();
    if (!signedUrl) throw new Error("No signedUrl returned");

    ws = new WebSocket(signedUrl);

    ws.onopen = async () => {
    try { ws.send(JSON.stringify({ type: "conversation_initiation_client_data" })); } catch {}

        try {
        const ctx = (await getContextText?.()) || "";
        if (ctx) ws.send(JSON.stringify({ type: "contextual_update", text: ctx }));
        } catch (e) { if (debug) console.warn("[GRIDGXLY] context send failed:", e); }

        onReady?.();

        try {
        micStream = await navigator.mediaDevices.getUserMedia({ audio: true });
        mediaRecorder = new MediaRecorder(micStream, { mimeType: "audio/webm" });
        mediaRecorder.ondataavailable = async (e) => {
        if (e.data && e.data.size > 0 && ws?.readyState === WebSocket.OPEN) {
            const buf = await e.data.arrayBuffer();
            const b64 = btoa(String.fromCharCode(...new Uint8Array(buf)));
            ws.send(JSON.stringify({ user_audio_chunk: b64 }));
        }
        };
        mediaRecorder.start(250);
        } catch (e) { if (debug) console.error("[GRIDGXLY] getUserMedia failed:", e); }
    };

    ws.onmessage = (event) => {
    let msg; try { msg = JSON.parse(event.data); } catch { return; }
    const t = msg.type;

        if (t === "ping") {
        try { ws.send(JSON.stringify({ type: "pong", event_id: msg.ping_event?.event_id })); } catch {}
        return;
    }
        if (t === "user_transcript") {
        const text = msg.user_transcription_event?.user_transcript || "";
        onUserTranscript?.(text);
        return;
        }
        if (t === "agent_response") {
        const text = msg.agent_response_event?.agent_response || "";
        onAgentText?.(text);
        return;
    }
        if (t === "agent_response_correction") return;

        if (t === "interruption") {
        onInterruption?.(msg.interruption_event?.reason || "interrupted");
        return;
    }
        if (t === "audio") {
        const b64 = msg.audio_event?.audio_base_64;
        if (b64) { queue.push(b64); drain(debug); }
        return;
    }
    };

        ws.onerror = (e) => { if (debug) console.error("[GRIDGXLY] WS error", e); };
        ws.onclose = () => { if (debug) console.warn("[GRIDGXLY] WS closed"); stop(); };
};

    const stop = () => {
    try { if (mediaRecorder && mediaRecorder.state !== "inactive") mediaRecorder.stop(); } catch {}
    try { micStream?.getTracks()?.forEach((t) => t.stop()); } catch {}
    try { ws?.close?.(); } catch {}
    try { audioCtx?.close?.(); } catch {}
    queue = [];
    playing = false;
    };

    const contextualUpdate = (text) => {
    try { if (ws?.readyState === WebSocket.OPEN) ws.send(JSON.stringify({ type: "contextual_update", text })); } catch {}
    };

    const interrupt = () => {
    queue = [];
    try { if (ws?.readyState === WebSocket.OPEN) ws.send(JSON.stringify({ type: "interruption" })); } catch {}
    };

    return { start, stop, contextualUpdate, interrupt };
}
