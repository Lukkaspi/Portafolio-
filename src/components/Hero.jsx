export default function Hero() {
  return (
    <div className="relative z-10 flex flex-col justify-center gap-8 lg:gap-10">
      <div
        className="anim-fade-up flex items-center gap-3"
        style={{ animationDelay: '20ms' }}
      >
        <span className="inline-block h-2 w-2 rounded-full bg-accent-500 shadow-glow" />
        <span className="text-[11px] font-medium uppercase tracking-[0.3em] text-zinc-400">
          Industrial Design · Engineering
        </span>
      </div>

      <h1
        className="anim-fade-up font-semibold tracking-[-0.045em] text-white"
        style={{ animationDelay: '120ms' }}
      >
        <span className="block text-[18vw] leading-[0.86] sm:text-[14vw] md:text-[11vw] lg:text-[8.4vw] xl:text-[8.2vw]">
          Lukka
        </span>
        <span className="block bg-gradient-to-r from-white via-zinc-200 to-zinc-500 bg-clip-text text-[18vw] leading-[0.86] text-transparent sm:text-[14vw] md:text-[11vw] lg:text-[8.4vw] xl:text-[8.2vw]">
          Spiluttini
        </span>
      </h1>

      {/* Contact block — directly below the name, business-card style */}
      <address
        className="anim-fade-up not-italic flex flex-col gap-1 text-sm text-zinc-300 md:text-base"
        style={{ animationDelay: '240ms' }}
      >
        <span className="font-medium text-white">Lukka Spiluttini</span>
        <a
          href="mailto:lukkaspiluttini@gmail.com"
          className="self-start text-zinc-300 transition hover:text-white"
        >
          lukkaspiluttini@gmail.com
        </a>
        <a
          href="tel:+34673439527"
          className="self-start text-zinc-300 transition hover:text-white"
        >
          +34 673 439 527
        </a>
        <a
          href="https://www.linkedin.com/in/lukka-spiluttini/"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1 self-start text-zinc-300 transition hover:text-white"
        >
          LinkedIn
          <span aria-hidden>↗</span>
        </a>
      </address>

      <div
        className="anim-fade-up flex flex-wrap items-center gap-x-4 gap-y-2 pt-2 text-[11px] uppercase tracking-[0.3em] text-zinc-500"
        style={{ animationDelay: '440ms' }}
      >
        <span>3rd–4th yr · UPC</span>
        <span className="h-px w-10 bg-zinc-700" />
        <span>10 projects</span>
        <span className="h-px w-10 bg-zinc-700" />
        <span>1 keyboard</span>
      </div>
    </div>
  );
}
