    import OpenAI from "openai";

    const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
    });

    export default async function handler(req, res) {
    if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({ error: "Method Not Allowed" });
    }


    if (!process.env.OPENAI_API_KEY) {
    console.error("Missing OPENAI_API_KEY");
    return res.status(500).json({ error: "Server is misconfigured." });
    }

    try {
    const { message } = req.body || {};

    if (!message || typeof message !== "string") {
    return res.status(400).json({ error: "Missing 'message' in request body." });
    }

    const completion = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
    {
    role: "system",
    content:
    "You are G.R.I.D.G.X.L.Y – Guided Responsive Interactive Dialogue Generating eXperience Logic for You. " +
    "You live inside Master Ralph's portfolio at gridgxly.dev. " +
    "You speak like a calm, helpful Jarvis-style assistant. " +
    "You call Ralph 'Master Ralph' when talking about him, and you address the visitor as 'you'. " +
    "When a new conversation starts, you usually say something like: " +
    "'Hello, Master Ralph is away at the moment. Is there anything I can help you with?' " +
    "Keep responses relatively short, focused on helping the visitor learn about Ralph, his skills, projects, or how to contact him. " +
    "If you don't know something, ask a clarifying question instead of making things up.",
    },
    {
    role: "user",
    content: message,
    },
    ],
    max_tokens: 300,
    });

    const reply =
    completion.choices?.[0]?.message?.content?.trim() ??
    "I'm sorry, I wasn't able to generate a response.";

    return res.status(200).json({ reply });
    } catch (error) {
    console.error("GRIDGXLY error:", error);
    return res.status(500).json({ error: "Something went wrong talking to G.R.I.D.G.X.L.Y." });
    }
    }