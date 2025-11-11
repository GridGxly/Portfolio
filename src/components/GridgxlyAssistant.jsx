    import { useEffect, useRef, useState } from "react";

    function GridgxlyAssistant() {
    const [isActive, setIsActive] = useState(false);    // session on/off
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [hasGreeted, setHasGreeted] = useState(false);
    const [speechSupported, setSpeechSupported] = useState(true);


    const convoRef = useRef([]); 
    const recognitionRef = useRef(null);
    const sessionActiveRef = useRef(false);


    useEffect(() => {
    const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
    setSpeechSupported(false);
    return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.continuous = true;
    recognition.interimResults = false;

    recognition.onstart = () => {
    };

    recognition.onerror = (event) => {
    console.error("Speech recognition error:", event.error);
    };

    recognition.onend = () => {
    if (sessionActiveRef.current) {
    setTimeout(() => {
    try {
    recognition.start();
    } catch (e) {
    console.error("Error restarting recognition:", e);
        }
    }, 250);
        }
    };

    recognition.onresult = (event) => {
    const last = event.results[event.results.length - 1];
    if (!last || !last.isFinal) return;
    const transcript = last[0].transcript.trim();
    if (!transcript) return;

    handleUserSpeech(transcript);
    };

    recognitionRef.current = recognition;

    return () => {
    try {
    recognition.stop();
    } catch (_) {
    }
    recognitionRef.current = null;
    sessionActiveRef.current = false;
    };

    }, []);



    async function speak(text) {
    if (!text) return;


    try {
    setIsSpeaking(true);
    await playElevenLabsVoice(text);
    setTimeout(() => setIsSpeaking(false), 2000);
    return;
    } catch (err) {
    console.warn("ElevenLabs failed, falling back to browser TTS.");
    setIsSpeaking(false);
    }


    if (!window.speechSynthesis) return;

    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1.02;
    utterance.pitch = 0.95;
    utterance.volume = 1;

    utterance.onstart = () => {
    setIsSpeaking(true);
    };
    utterance.onend = () => {
    setIsSpeaking(false);
    };

    window.speechSynthesis.speak(utterance);
    }



    async function askGridgxly(userText) {
    const messagesForApi = [
    ...convoRef.current,
    { role: "user", content: userText },
    ];

    try {
    const res = await fetch("/api/gridgxly-chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ messages: messagesForApi }),
    });

    const data = await res.json();

    if (!res.ok) {
    console.error("GRIDGXLY API error:", data);
    return (
    "I’m having trouble reaching my AI core right now. " +
    "Please try again in a moment, or ask to contact Master Ralph."
        );
    }

    const replyText =
    data.reply ||
    data.message ||
    "I couldn’t quite generate a proper response. Could you try phrasing that differently?";


    convoRef.current = [
    ...messagesForApi,
    { role: "assistant", content: replyText },
    ];

    return replyText;
    } catch (err) {
    console.error("GRIDGXLY chat error:", err);
    return (
    "My connection to the mainframe glitched. " +
    "If it’s important, you can always use the contact section to reach Master Ralph."
    );
    }
}

async function handleUserSpeech(transcript) {
    if (!hasGreeted) {
    const intro =
        "Hello. Master Ralph is away at the moment. " +
        "You’re speaking with G.R.I.D.G.X.L.Y. Ask me anything about this site, " +
        "Master Ralph, or his projects.";
    speak(intro);
    setHasGreeted(true);


    convoRef.current = [
    ...convoRef.current,
    {
    role: "assistant",
    content: intro,
        },
    ];
    }


    const t = transcript.toLowerCase();
    if (
    t.includes("talk to ralph") ||
    t.includes("speak to ralph") ||
    t.includes("contact ralph") ||
    t.includes("master ralph")
    ) {
    const reply =
    "Understood. I can’t summon Master Ralph directly, " +
    "but you can leave him a message in the contact section. " +
    "He usually replies within twenty four hours.";
    speak(reply);

    convoRef.current = [
    ...convoRef.current,
    { role: "user", content: transcript },
    { role: "assistant", content: reply },
    ];

    const contactEl = document.getElementById("contact");
    if (contactEl) {
    setTimeout(
    () => contactEl.scrollIntoView({ behavior: "smooth" }),
    1200
        );
    }
    return;
    }


    const aiReply = await askGridgxly(transcript);
    speak(aiReply);
    }



    function handleOrbClick() {
    if (!speechSupported) {
    alert(
    "Your browser doesn’t support voice recognition yet. " +
    "Try Chrome or Edge on desktop for the full G.R.I.D.G.X.L.Y experience."
    );
    return;
    }

    if (!recognitionRef.current) return;

    if (!isActive) {
    sessionActiveRef.current = true;
    setIsActive(true);

    try {
    recognitionRef.current.start();
    } catch (e) {
    console.error("Error starting recognition:", e);
    }

    if (!hasGreeted) {
    const intro =
    "Hello. Master Ralph is away at the moment. " +
    "Tap the core, say what you’d like to know, and I will assist.";
    speak(intro);
    setHasGreeted(true);
    convoRef.current = [
    ...convoRef.current,
    { role: "assistant", content: intro },
        ];
    }
    } else {
    sessionActiveRef.current = false;
    setIsActive(false);

    try {
    recognitionRef.current.stop();
    } catch (e) {
    console.error("Error stopping recognition:", e);
    }

    window.speechSynthesis?.cancel();
    }
}

    const isGlowing = isActive || isSpeaking;

    return (
    <>

        <div
        className={`
        pointer-events-none fixed inset-0 z-30 transition-opacity duration-300
        ${isGlowing ? "opacity-100" : "opacity-0"}
        `}
        aria-hidden="true"
    >
        <div className="h-full w-full bg-slate-900/35 backdrop-blur-md" />
    </div>


        <button
        type="button"
        onClick={handleOrbClick}
        className={`
        fixed bottom-5 right-5 z-40
        h-16 w-16 rounded-full overflow-hidden border
        border-cyan-400/80 bg-slate-950/80
        shadow-[0_0_30px_rgba(56,189,248,0.85)]
        transition-transform transition-shadow duration-200
        hover:scale-105 hover:shadow-[0_0_45px_rgba(56,189,248,1)]
        ${isGlowing ? "animate-pulse" : ""}
        `}
        aria-label={
        isActive
            ? "End conversation with G.R.I.D.G.X.L.Y"
            : "Talk to G.R.I.D.G.X.L.Y"
        }
    >
        <img
        src="/core.gif"
        alt="GRIDGXLY AI core"
    className="h-full w-full object-cover"
    />
    </button>
</>
);
}

export default GridgxlyAssistant;
