import OpenAI from "openai";

export default async function handler(req, res) {
if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });
if (!process.env.OPENAI_API_KEY) return res.status(500).json({ error: "OPENAI_API_KEY missing" });

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const model = process.env.OPENAI_MODEL || "gpt-5";

try {
    const { messages } = req.body || {};
    if (!Array.isArray(messages)) return res.status(400).json({ error: "messages must be an array" });

    let site = "";
    try {
    const mod = await import("../src/data/site-context.js");
    site = mod?.toPrompt ? mod.toPrompt() : (mod?.default?.toPrompt?.() ?? "");
    } catch {}

    const system = [
    "You are GRIDGXLY (pronounced 'grid-glee'), Ralph’s on-site assistant at GridGxly.dev.",
    "Voice persona: Hey-it’s-Brad confident — friendly, concise, a little charismatic. Occasional casual slang is okay.",
    "Never dump a resume. Speak naturally. Avoid repeating your intro unless explicitly asked.",
    "If you truly lack info after one clarifying question, say: “I don’t have that right now. You can contact Ralph and he’ll get you the exact info.”",
    "You can reference /projects, /experience, /skills, and /contact for navigation hints.",
    site ? `\nSITE CONTEXT (authoritative):\n${site}\n` : "",
    ].join("\n");

    const resp = await client.responses.create({
    model,
    temperature: 0.6,
    max_output_tokens: 350,
    input: [{ role: "system", content: system }, ...messages],
    });

    const reply =
    resp.output_text ??
    resp.output?.[0]?.content?.[0]?.text ??
    resp.content?.[0]?.text ??
    "I’m not sure—mind rephrasing?";

    const requestId = resp.id || resp.request_id || resp.headers?.get?.("x-request-id") || null;
    res.status(200).json({ reply, requestId, model });
    } catch (e) {
    console.error("gridgxly-chat error:", e);
    res.status(500).json({ error: "chat failed" });
    }
}
