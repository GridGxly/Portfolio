const ABBY_SRC = "/AbbyPainting.png";

export default function AbbyBackground() {
    return (
    <div
    aria-hidden="true"
    className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
    >
        <img
        src={ABBY_SRC}
        alt="Abby painting background"
        className="h-full w-full object-cover opacity-35"
        />
    </div>
    );
}
