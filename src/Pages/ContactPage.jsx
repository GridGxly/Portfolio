    import { useState } from "react";

    export default function ContactPage() {
    const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    });
    const [status, setStatus] = useState("idle"); // idle | submitting | success | error
    const [error, setError] = useState("");

    const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    };

    const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("submitting");
    setError("");

    try {
    const res = await fetch("/api/contact-feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
    });
    const data = await res.json().catch(() => ({}));

    if (!res.ok || !data.ok) {
        throw new Error(data.error || "Failed to send");
    }

    setStatus("success");
    setForm({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
    console.error("contact submit error:", err);
    setStatus("error");
    setError("Something went wrong. Please try again.");
    }
    };

    const disabled = status === "submitting";

    return (
    <section id="contact" className="mx-auto max-w-3xl space-y-8 py-12">
    <header className="space-y-1">
        <p className="text-xs uppercase tracking-[0.25em] text-cyan-400">
        GridGxly.Dev
        </p>
        <h1 className="text-3xl font-semibold text-white">
        Get In Touch With Me!
        </h1>
        <p className="text-slate-300">I usually respond within 24 hours.</p>
    </header>

    <div className="grid gap-4 sm:grid-cols-2">
        <a
        href="mailto:noelralph2006@gmail.com?subject=Hello%20from%20GridGxly.Dev"
        className="rounded-2xl border border-white/10 bg-slate-900/60 p-4 hover:bg-slate-900"
        >
        <h2 className="font-medium text-white">Email</h2>
        <p className="text-sm text-slate-300">noelralph2006@gmail.com</p>
        </a>

        <a
        href="https://www.linkedin.com/in/ralphnoel/"
        target="_blank"
        rel="noreferrer"
        className="rounded-2xl border border-white/10 bg-slate-900/60 p-4 hover:bg-slate-900"
        >
        <h2 className="font-medium text-white">LinkedIn</h2>
        <p className="text-sm text-slate-300">@ralphnoel</p>
        </a>

        <a
        href="/Ralph-Resume.pdf"
        className="rounded-2xl border border-white/10 bg-slate-900/60 p-4 hover:bg-slate-900"
        >
        <h2 className="font-medium text-white">Resume</h2>
        <p className="text-sm text-slate-300">Latest Resume</p>
        </a>

        <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-4">
        <h2 className="font-medium text-white">Other</h2>
        <p className="text-sm text-slate-300">
            Happy to connect on Discord too:{" "}
            <span className="font-mono">GridGxly</span>
        </p>
        </div>
        </div>

        <form
        onSubmit={handleSubmit}
        className="space-y-4 rounded-2xl border border-white/10 bg-slate-900/70 p-5"
        >
        <h2 className="text-lg font-semibold text-white">
        Send me a quick message
        </h2>

        <div className="grid gap-4 sm:grid-cols-2">
        <label className="text-sm text-slate-200">
            Name
            <input
            name="name"
            type="text"
            value={form.name}
            onChange={handleChange}
            className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100 outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
            autoComplete="name"
            />
            </label>

            <label className="text-sm text-slate-200">
            Email <span className="text-red-400">*</span>
            <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            required
            className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100 outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
            autoComplete="email"
            />
            </label>
        </div>

        <label className="block text-sm text-slate-200">
            Subject
            <input
            name="subject"
            type="text"
            value={form.subject}
            onChange={handleChange}
            className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100 outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
            />
        </label>

        <label className="block text-sm text-slate-200">
        Message <span className="text-red-400">*</span>
        <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            required
            rows={5}
            className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100 outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
            placeholder="Tell me a bit about what you’d like to chat about."
        />
        </label>

        {status === "success" && (
        <p className="text-xs text-emerald-300">
            Thanks! Your message has been sent.
        </p>
        )}
        {status === "error" && (
        <p className="text-xs text-red-400">{error}</p>
        )}

        <button
        type="submit"
        disabled={disabled}
        className="inline-flex items-center justify-center rounded-lg bg-cyan-500 px-4 py-2 text-sm font-medium text-slate-950 hover:bg-cyan-400 disabled:opacity-60"
        >
        {status === "submitting" ? "Sending…" : "Send message"}
        </button>

        <p className="pt-1 text-[11px] text-slate-500">
        Your message is only used so I can reply. Nothing is shared or sold.
        </p>
        </form>
    </section>
    );
}
