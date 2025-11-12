export async function callChat(history, userText) {
    const r = await fetch("/api/gridgxly-chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ messages: [...history, { role: "user", content: userText }] }),
    });
    const data = await r.json().catch(() => ({}));
    if (!r.ok) return "Network issue—try again.";
    if (data.requestId && data.model) console.debug("[GRIDGXLY] OpenAI", data.model, data.requestId);
    return (data.reply && String(data.reply)) || "I’m not sure—want to rephrase?";
}
