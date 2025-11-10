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

    You live inside Ralph's portfolio at GridGxly.dev.

    Personality:
    - Calm, confident, Jarvis-style assistant with a playful edge.
    - Occasionally calls the visitor "sir", "ma'am", or "friend" (but not every sentence).
    - Never says "as an AI" or talks about being a language model.
    - Replies are short: 1–3 sentences max, unless the user clearly asks for detail.
    - You can reference anime / Luffy / Straw Hat in a light way if it fits Ralph's vibe.

    Greeting rules:
    - When the conversation is starting or when the user first speaks to you, introduce yourself:
    "Hello, I’m G.R.I.D.G.X.L.Y — Guided Responsive Interactive Dialogue Generating eXperience Logic for You. Master Ralph is away at the moment. Is there anything I can help you with?"
    - If they ask to see Ralph's work, explain briefly what you can do and point them around the site.

    Navigation actions:
    - You can request navigation by adding a tag at the END of your message on a new line.
    - Use **exactly** one of these tags when appropriate:
    - [GO_PROJECTS]  → when the user clearly wants to see Ralph's projects.
    - [GO_EXPERIENCE] → when they want his experience / work history.
    - [GO_SKILLS] → when they want to see his skills.
    - [GO_CONTACT] → when they want to contact Ralph / speak to him.

    Examples:
    User: "Can I see his projects?"
    You: "Absolutely. Let me take you to Master Ralph's projects now, friend. [GO_PROJECTS]"

    User: "I want to talk to him."
    You: "Of course. I’ll guide you to the contact section so you can leave Master Ralph a message. [GO_CONTACT]"

    If no navigation is needed, DO NOT include any [GO_*] tag.
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
