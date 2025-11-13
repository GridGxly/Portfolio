let audioCtx, playing = false;
let queue = [];

function ensureAudio() {
if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
}

async function playB64Mpeg(b64) {
ensureAudio();
const audio = new Audio(`data:audio/mpeg;base64,${b64}`);
await audio.play();
return new Promise(r => (audio.onended = r));
}

async function drain() {
if (playing) return;
playing = true;
while (queue.length) {
    const b = queue.shift();
    try { await playB64Mpeg(b); } catch {}
    }
    playing = false;
}

export function useElevenAgent({ onUserTranscript, onAgentText, onInterruption, onReady, getContextText }) {
let ws, micStream, mediaRecorder;

    const start = async () => {
    const r = await fetch("/api/eleven-signed-url");
    const { signedUrl } = await r.json();
    ws = new WebSocket(signedUrl);

    ws.onopen = async () => {
    ws.send(JSON.stringify({ type: "conversation_initiation_client_data" }));
    onReady?.();

    const ctx = (await getContextText?.()) || "";
    if (ctx) ws.send(JSON.stringify({ type: "contextual_update", text: ctx }));

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
    };

    ws.onmessage = (evt) => {
    const msg = JSON.parse(evt.data);

    if (msg.type === "ping") {
        ws.send(JSON.stringify({ type: "pong", event_id: msg.ping_event?.event_id }));
        return;
    }
        if (msg.type === "user_transcript") {
        onUserTranscript?.(msg.user_transcription_event?.user_transcript || "");
        return;
    }
        if (msg.type === "agent_response") {
        const text = msg.agent_response_event?.agent_response || "";
        onAgentText?.(text);
        const nav = text.match(/NAV:([/\w-]+)/i);
        if (nav) window.history.pushState({}, "", nav[1]);
        return;
        }
        if (msg.type === "interruption") {
        onInterruption?.(msg.interruption_event?.reason || "interrupted");
        return;
        }
        if (msg.type === "audio") {
        const b64 = msg.audio_event?.audio_base_64;
        if (b64) {
        queue.push(b64);
        drain();
        }
    }
    };

    ws.onerror = (e) => console.error("[Eleven WS] error", e);
    ws.onclose  = () => stop();
    };

    const stop = () => {
    try { mediaRecorder && mediaRecorder.state !== "inactive" && mediaRecorder.stop(); } catch {}
    micStream?.getTracks()?.forEach(t => t.stop());
    ws?.close?.();
    audioCtx?.close?.();
    queue = [];
    playing = false;
    };

    const contextualUpdate = (text) => {
    if (ws?.readyState === WebSocket.OPEN) {
    ws.send(JSON.stringify({ type: "contextual_update", text }));
    }
    };

    const interrupt = () => {
    queue = [];
    if (ws?.readyState === WebSocket.OPEN) ws.send(JSON.stringify({ type: "interruption" }));
    };

    return { start, stop, contextualUpdate, interrupt };
}
