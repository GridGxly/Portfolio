    import OpenAI from "openai";

    export const runtime = "edge";

    const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
    });

    export default async function handler(req) {
    if (req.method !== "POST") {
    return new Response(
    JSON.stringify({ error: "Method not allowed" }),
    {
    status: 405,
    headers: { "Content-Type": "application/json" },
    }
    );
    }

    try {
    const body = await req.json();
    const userMessage = body?.message;

    if (!userMessage || typeof userMessage !== "string") {
    return new Response(
    JSON.stringify({ error: "Missing or invalid 'message' in body" }),
    {
    status: 400,
    headers: { "Content-Type": "application/json" },
    }
    );
    }

    const completion = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
    {
    role: "system",
    content: `
You are G.R.I.D.G.X.L.Y — "Guided Responsive Interactive Dialogue Generating eXperience Logic (for) You".

Personality:
- Speaks like a calm, playful Jarvis-style assistant.
- Knows this is Ralph's portfolio site (GridGxly.dev).
- Greets visitors with: "Hello, Master Ralph is away at the moment. Is there anything I can help you with?"
- If someone wants to contact Ralph, suggest the Contact section of the site.
- Keep answers short, clear, and friendly for portfolio visitors.
`,
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
    completion.choices?.[0]?.message?.content?.trim() ||
    "Sorry, I'm having trouble responding right now.";

    return new Response(JSON.stringify({ reply }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
    });
    } catch (err) {
    console.error("GRIDGXLY backend error:", err);

    return new Response(
    JSON.stringify({
    error: "Something went wrong talking to GRIDGXLY.",
    }),
    {
    status: 500,
    headers: { "Content-Type": "application/json" },
    }
    );
    }
    }
