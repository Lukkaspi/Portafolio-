import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <main className="container-page flex min-h-screen flex-col items-center justify-center text-center">
      <span className="chip">404</span>
      <h1 className="mt-4 text-3xl font-semibold text-white sm:text-4xl">
        That key isn’t mapped.
      </h1>
      <Link to="/" className="btn-ghost mt-6">← Back to keyboard</Link>
    </main>
  );
}
