import OpenAI from "openai";

export default async function handler(req, res) {
if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
}

const apiKey = process.env.OPENAI_API_KEY;
if (!apiKey) {
    return res.status(500).json({ error: "OPENAI_API_KEY missing" });
}

const client = new OpenAI({ apiKey });
const model = process.env.OPENAI_MODEL || "gpt-5"; 


let site = "";
try {
    const mod = await import("../src/data/site-context.js");
    site = mod?.toPrompt?.() ?? mod?.default?.toPrompt?.() ?? "";
} catch (e) {
    console.warn("site-context import failed:", e?.message);
}

    try {
    const { messages } = req.body || {};
    if (!Array.isArray(messages)) {
    return res.status(400).json({ error: "messages must be an array" });
    }

    const system = [
    "You are GRIDGXLY (pronounced 'grid-glee'), Ralph’s on-site assistant at GridGxly.dev.",
    "Voice persona: confident, friendly, concise.",
    "Avoid repeating your intro unless asked.",
    site ? `SITE CONTEXT:\n${site}` : "",
    ]
    .filter(Boolean)
    .join("\n");

    const resp = await client.responses.create({
    model,
    temperature: 0.6,
    max_output_tokens: 350,
    input: [{ role: "system", content: system }, ...messages],
    });

    const reply =
    resp.output_text ??
    resp.output?.[0]?.content?.[0]?.text ??
    "I’m not sure—mind rephrasing?";

    const requestId =
    resp.id || resp.request_id || resp.headers?.get?.("x-request-id") || null;

    return res.status(200).json({ reply, requestId, model });
} catch (e) {
    console.error("gridgxly-chat error:", e);
    return res
    .status(500)
    .json({
        error: "OPENAI_REQUEST_FAILED",
        message: e?.message || "Unknown error",
        type: e?.type || null,
        code: e?.code || null,
    });
}
}
