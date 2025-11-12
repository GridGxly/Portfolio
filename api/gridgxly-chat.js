    import OpenAI from "openai";

    const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
    });

    export default async function handler(req, res) {
    if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
    }

    try {
    const { messages } = req.body || {};

    if (!Array.isArray(messages) || messages.length === 0) {
    res
        .status(400)
        .json({ error: "Missing 'messages' array in request body." });
    return;
    }

    const systemMessage = {
    role: "system",
    content:
    "You are G.R.I.D.G.X.L.Y, a Jarvis-style AI assistant living inside Ralph's " +
    "portfolio at GridGxly.dev. You speak clearly and concisely, calm and confident, " +
    "never cringe, never overly hype. You refer to him simply as 'Ralph'. " +
    "You can answer questions about Ralph, his projects, skills, and general topics. " +
    "If a user asks for something very personal or unknown about Ralph, politely " +
    "suggest using the contact section so they can message him directly.",
    };

    const inputMessages = [systemMessage, ...messages];

    const response = await client.responses.create({
    model: "gpt-4.1",
    input: inputMessages,
    });

    const replyText =
    response.output?.[0]?.content?.[0]?.text?.trim() ||
    "I had trouble generating a response just now. Could you try asking that again?";

    res.status(200).json({ reply: replyText });
} catch (err) {
    console.error("GRIDGXLY chat backend error:", err);

    res.status(500).json({
    error: "GRIDGXLY backend error",
    details: err.message,
    });
}
}
