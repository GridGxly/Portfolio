import { useEffect, useRef, useState } from "react";
import { PLAYLIST, TUNG_TUNG_CUE_S } from "@/utils/brainrot";
import { unlock } from "@/utils/sound";

export default function BrainrotPlayer({
  pausedExternally = false,
  onSongWillChange = () => {},
  onSongEnded = () => {},
  onTungCue = () => {},
}) {
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [current, setCurrent] = useState(0);

  const audioRef = useRef(null);
  const rafRef = useRef(0);
  const resumeOnUnpauseRef = useRef(false);
  const autoResumeRef = useRef(false);
  const tungFiredRef = useRef(false);


  useEffect(() => {
    const a = new Audio(PLAYLIST[0].src);
    a.preload = "auto";
    a.playsInline = true;
    a.dataset.ggxly = "music";
    a.volume = 0.9;

    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);
    const onEnded = () => {
      onSongEnded(index);
      autoResumeRef.current = true; 
      setIndex((i) => (i + 1) % PLAYLIST.length);
    };

    const pump = () => {
      setCurrent(a.currentTime || 0);
      if (index === 2 && !tungFiredRef.current && (a.currentTime || 0) >= (TUNG_TUNG_CUE_S || 28)) {
        tungFiredRef.current = true;
        onTungCue();
      }
      rafRef.current = requestAnimationFrame(pump);
    };

    a.addEventListener("play", onPlay);
    a.addEventListener("pause", onPause);
    a.addEventListener("ended", onEnded);
    audioRef.current = a;
    rafRef.current = requestAnimationFrame(pump);

    return () => {
      cancelAnimationFrame(rafRef.current);
      a.removeEventListener("play", onPlay);
      a.removeEventListener("pause", onPause);
      a.removeEventListener("ended", onEnded);
      try { a.pause(); } catch {}
    };
  }, []);


  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;
    onSongWillChange(index);
    tungFiredRef.current = false;

    const nextSrc = PLAYLIST[index].src;
    if (a.src !== nextSrc) a.src = nextSrc;
    a.currentTime = 0;

    if (autoResumeRef.current && !pausedExternally) {
      autoResumeRef.current = false;
      a.play().catch(() => {});
    } else {
      autoResumeRef.current = false;
    }
  }, [index, pausedExternally, onSongWillChange]);


  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;
    if (pausedExternally) {
      resumeOnUnpauseRef.current = !a.paused;
      if (!a.paused) a.pause();
    } else if (resumeOnUnpauseRef.current) {
      resumeOnUnpauseRef.current = false;
      unlock().then(() => a.play().catch(() => {}));
    }
  }, [pausedExternally]);

  const playPause = async () => {
    const a = audioRef.current;
    if (!a) return;
    if (a.paused) {
      await unlock();
      a.play().catch(() => {});
    } else {
      a.pause();
    }
  };

  const next = () => {
    const a = audioRef.current;
    autoResumeRef.current = !!(a && !a.paused && !pausedExternally);
    setIndex((i) => (i + 1) % PLAYLIST.length);
  };

  return (
    <div className="fixed bottom-4 left-1/2 z-40 -translate-x-1/2 rounded-full border border-white/10 bg-black/50 px-3 py-1 text-xs text-neutral-200 backdrop-blur">
      <button onClick={playPause} className="mr-2 rounded px-2 py-1 ring-1 ring-white/10">
        {playing ? "Pause" : "Play"}
      </button>
      <button onClick={next} className="mr-3 rounded px-2 py-1 ring-1 ring-white/10">Skip ›</button>
      <span className="opacity-80">Now playing: {PLAYLIST[index].title}</span>
    </div>
  );
}
