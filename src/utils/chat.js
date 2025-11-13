export async function callChat(history, userText) {
    const r = await fetch("/api/gridgxly-chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ messages: [...history, { role: "user", content: userText }] })
    });

    let data = {};
    try { data = await r.json(); } catch {}

    if (!r.ok) return data?.error ? `Server error: ${data.error}` : "Network issue—try again.";
    return (data.reply && String(data.reply)) || "I’m not sure—want to rephrase?";
}
