import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-40">
      <div className="container-page flex items-center justify-between py-4">
        <Link
          to="/"
          className="pointer-events-auto inline-flex items-center gap-2 font-mono text-sm tracking-widest text-zinc-200"
        >
          <span className="inline-block h-2 w-2 rounded-full bg-accent-500 shadow-glow" />
          PORTFOLIO_
        </Link>
        <nav className="pointer-events-auto hidden items-center gap-3 md:flex">
          <a
            href="mailto:lukkaspiluttini@gmail.com"
            className="btn-ghost"
          >
            Contact
          </a>
        </nav>
      </div>
    </header>
  );
}
