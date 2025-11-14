const BASE = (import.meta.env?.BASE_URL || "/").replace(/\/+$/, "");
export const asset = (p) => `${BASE}${p.startsWith("/") ? p : "/" + p}`;


export const BG_GIFS = [
asset("/brainrot/bg/01-temple-run.gif"),
asset("/brainrot/bg/02-subway-surfers.gif"),
asset("/brainrot/bg/03-family-guy.gif"),
asset("/brainrot/bg/04-parkour.gif"),
asset("/brainrot/bg/05-gta-wasted.gif"),
asset("/brainrot/bg/06-emoji-spam.gif"),
asset("/brainrot/bg/07-sigma.gif"),
asset("/brainrot/bg/08-mr-krabs.gif"),
];


export const PLAYLIST = [
{
    title: "one piece – fight together",
    src: asset("/brainrot/audio/tracks/01.fighttogether.mp3"),
    cover: asset("/brainrot/covers/01-fighttogether.jpg"),
    },
{
    title: "not like us (brainrot)",
    src: asset("/brainrot/audio/tracks/02-not-like-us.mp3"),
    cover: asset("/brainrot/covers/02-not-like-us.jpg"),
    },
{
    title: "tung tung sahoo",
    src: asset("/brainrot/audio/tracks/03-tung-tung-sahoo.mp3"),
    cover: asset("/brainrot/covers/03-tung-tung-sahoo.jpg"),
    },
{
    title: "fortnite shimmer",
    src: asset("/brainrot/audio/tracks/04-fortnite-shimmer.mp3"),
    cover: asset("/brainrot/covers/04-fortnite-shimmer.jpg"),
    },
{
    title: "ouuuu ouuu – summrs",
    src: asset("/brainrot/audio/tracks/05-ouuuu-ouuu-summrs.mp3"),
    cover: asset("/brainrot/covers/05-ouuuu-ouuu-summrs.jpg"),
    },
{
    title: "different strokes",
    src: asset("/brainrot/audio/tracks/06-different-strokes.mp3"),
    cover: asset("/brainrot/covers/06-different-strokes.jpg"),
    },
{
    title: "running off",
    src: asset("/brainrot/audio/tracks/07-running-off.mp3"),
    cover: asset("/brainrot/covers/07-running-off.jpeg"),
    },
{
    title: "the muffin song",
    src: asset("/brainrot/audio/tracks/08-muffin-song.mp3"),
    cover: asset("/brainrot/covers/08-muffin-song.jpg"),
    },
];


export const OVERLAY_RIGHT = [
asset("/brainrot/overlays/right/right-1.gif"),
asset("/brainrot/overlays/right/right-2.gif"),
asset("/brainrot/overlays/right/right-3.gif"),
asset("/brainrot/overlays/right/right-4.gif"),
];

export const OVERLAY_WRONG = [
asset("/brainrot/overlays/wrong/wrong-1.gif"),
asset("/brainrot/overlays/wrong/wrong-3.gif"),
asset("/brainrot/overlays/wrong/wrong-4.gif"),
asset("/brainrot/overlays/wrong/wrong2.gif"),
];


export const SFX = {
wrong: asset("/brainrot/audio/sfx/wrong.mp3"),
yay: asset("/brainrot/audio/sfx/yay.mp3"),
noNo: asset("/brainrot/no-no.gif"),
tungPop: asset("/brainrot/tungtung-pop.gif"),
};



export const TUNG_TUNG_CUE_S = 28;
