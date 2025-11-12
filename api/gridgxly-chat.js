import OpenAI from "openai";

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export default async function handler(req, res) {
if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
    }

try {
    const { messages } = req.body || {};
    if (!Array.isArray(messages) || messages.length === 0) {
    res.status(400).json({ error: "Missing 'messages' array in request body." });
    return;
    }

    
    let grounded = "";
    try {
    const mod = await import("../src/data/site-context.js");
    if (mod?.toPrompt) grounded = mod.toPrompt();
    } catch (e) {
    console.warn("⚠️ GRIDGXLY grounding import failed (non-fatal):", e?.message);
    }

    const systemMessage = {
    role: "system",
    content:
        "You are G.R.I.D.G.X.L.Y, a calm, concise assistant living inside Ralph’s portfolio at GridGxly.dev. " +
        "Refer to him as 'Ralph'. Avoid hype. Be helpful and confident. " +
        "If asked for personal/unknown info, point them to the Contact section.\n\n" +
        (grounded
        ? "SITE CONTEXT (authoritative):\n" + grounded + "\nUse this to answer questions like “what projects has Ralph done?”\n"
        : ""),
    };


    const response = await client.responses.create({
    model: "gpt-5",
    input: [systemMessage, ...messages],
    });

    
    const text =
    response.output_text ??
    response.output?.[0]?.content?.[0]?.text ??
    response.content?.[0]?.text ??
    null;

    const replyText =
    (typeof text === "string" && text.trim()) ||
    "I had trouble generating a response just now. Could you try asking that again?";

    res.status(200).json({ reply: replyText });
    } catch (err) {
    console.error("GRIDGXLY chat backend error:", err);
    res.status(500).json({ error: "GRIDGXLY backend error", details: err.message });
    }
}
