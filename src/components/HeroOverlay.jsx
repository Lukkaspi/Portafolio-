export default function HeroOverlay({ compact = false }) {
  return (
    <div
      className={`pointer-events-none ${
        compact ? 'pt-16' : 'pt-24'
      } container-page relative z-10`}
    >
      <span className="chip anim-fade-up" style={{ animationDelay: '0ms' }}>
        Industrial Design · Product Development Engineering
      </span>
      <h1
        className="anim-fade-up mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl md:text-5xl"
        style={{ animationDelay: '120ms' }}
      >
        Each key, a project.
      </h1>
      <p
        className="anim-fade-up mt-3 max-w-xl text-sm text-zinc-300 sm:text-base"
        style={{ animationDelay: '240ms' }}
      >
        A portfolio in the shape of a keyboard. Hover a key to light it up,
        click to open the project. Inactive keys are{' '}
        <span className="font-mono text-accent-400">coming soon</span>.
      </p>
    </div>
  );
}
