    import OpenAI from "openai";

    const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
    });

    export default async function handler(req, res) {
    if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res
    .status(405)
    .json({ error: "Method not allowed. Use POST with JSON body." });
    }

    try {
    let body = req.body;
    if (typeof body === "string") {
    try {
    body = JSON.parse(body);
    } catch {
    return res.status(400).json({ error: "Invalid JSON in request body." });
    }
    }

    const userMessage = body?.message;

    if (!userMessage || typeof userMessage !== "string") {
    return res
    .status(400)
    .json({ error: "Missing or invalid 'message' in body." });
    }

    const completion = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
    {
    role: "system",
    content: `
    You are G.R.I.D.G.X.L.Y — "Guided Responsive Interactive Dialogue Generating eXperience Logic (for) You".

    Personality:
    - Calm, playful Jarvis-style assistant.
    - Knows this is Ralph's portfolio site (GridGxly.dev).
    - On first contact, greet with: "Hello, Master Ralph is away at the moment. Is there anything I can help you with?"
    - If someone wants to contact Ralph, suggest the Contact section of the site.
    - Keep answers short, clear, and friendly.
    `.trim(),
    },
    {   
    role: "user",
    content: userMessage,
    },
    ],
    max_tokens: 300,
    temperature: 0.7,
    });

    const reply =
    completion.choices?.[0]?.message?.content?.trim() ??
    "Sorry, I'm having trouble responding right now.";

    return res.status(200).json({ reply });
    } catch (err) {
    console.error("GRIDGXLY backend error:", err);
    return res
    .status(500)
    .json({ error: "Something went wrong talking to GRIDGXLY." });
    }
    }
