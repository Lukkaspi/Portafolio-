export default function Hero() {
  return (
    <div className="relative z-10 flex flex-col justify-center gap-8 lg:gap-10">
      <div className="anim-fade-up flex items-center gap-3" style={{ animationDelay: '20ms' }}>
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
        <span
          className="block bg-gradient-to-r from-white via-zinc-200 to-zinc-500 bg-clip-text text-[18vw] leading-[0.86] text-transparent sm:text-[14vw] md:text-[11vw] lg:text-[8.4vw] xl:text-[8.2vw]"
        >
          Spiluttini
        </span>
      </h1>

      <p
        className="anim-fade-up max-w-md text-base leading-relaxed text-zinc-300 md:text-lg"
        style={{ animationDelay: '240ms' }}
      >
        A keyboard of projects. Each key is a case study —
        from a CUPRA concept car to a microplastic filter.
        Pick one and dive in.
      </p>

      <div
        className="anim-fade-up flex flex-wrap items-center gap-3"
        style={{ animationDelay: '340ms' }}
      >
        <a href="#projects" className="btn-primary group">
          Explore projects
          <span aria-hidden className="ml-1 transition-transform group-hover:translate-x-0.5">→</span>
        </a>
        <a href="mailto:hello@example.com" className="btn-ghost">
          Get in touch
        </a>
      </div>

      <div
        className="anim-fade-up flex items-center gap-4 pt-2 text-[11px] uppercase tracking-[0.3em] text-zinc-500"
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
