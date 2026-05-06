import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { projectBySlug } from '../data/projects.js';
import { keyStyles } from '../data/keyStyles.js';
import { asset } from '../lib/asset.js';
import ProjectGallery from '../components/ProjectGallery.jsx';

export default function Project() {
  const { slug } = useParams();
  const project = projectBySlug[slug];
  const accent = keyStyles[slug]?.accent;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [slug]);

  if (!project) {
    return (
      <main className="container-page pt-32">
        <p className="text-zinc-400">Project not found.</p>
        <Link to="/" className="btn-ghost mt-6">← Back to keyboard</Link>
      </main>
    );
  }

  return (
    <main className="container-page pb-24 pt-24">
      <Link to="/" className="btn-ghost mb-8">← Back</Link>

      <header>
        <span className="chip">{project.tag}</span>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
          {project.title}
        </h1>
        <p className="mt-2 text-sm text-zinc-400 sm:text-base">
          {project.role} · {project.year}
        </p>
        <p className="mt-6 max-w-2xl text-base leading-relaxed text-zinc-200 sm:text-lg">
          {project.summary}
        </p>
      </header>

      <figure className="mt-10 overflow-hidden rounded-2xl border border-white/5">
        <img
          src={asset(project.images[0])}
          alt={project.title}
          loading="eager"
          decoding="async"
          className="h-auto w-full"
        />
      </figure>

      <Section title="Problem">
        <p className="leading-relaxed text-zinc-300">{project.problem}</p>
      </Section>

      <Section title="Process">
        <ol className="space-y-5">
          {project.process.map((step, i) => (
            <li key={i} className="card p-5">
              <div className="flex items-baseline gap-3">
                <span className="font-mono text-xs text-accent-400">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="text-base font-semibold text-white">{step.title}</h3>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-zinc-300">{step.body}</p>
            </li>
          ))}
        </ol>
      </Section>

      {project.gallery && project.gallery.length > 0 && (
        <Section title="Selected Works">
          <ProjectGallery items={project.gallery} accent={accent} />
        </Section>
      )}

      {!project.gallery && project.images.length > 1 && (
        <Section title="Visuals">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {project.images.slice(1).map((src, i) => (
              <img
                key={i}
                src={asset(src)}
                alt={`${project.title} visual ${i + 1}`}
                loading="lazy"
                decoding="async"
                className="w-full rounded-xl border border-white/5"
              />
            ))}
          </div>
        </Section>
      )}

      {project.technical && (
        <Section title="Technical details">
          <dl className="card divide-y divide-white/5">
            {Object.entries(project.technical).map(([k, v]) => (
              <div key={k} className="grid grid-cols-1 gap-1 px-5 py-4 sm:grid-cols-3 sm:gap-6">
                <dt className="text-xs uppercase tracking-wider text-zinc-400">{k}</dt>
                <dd className="text-sm text-zinc-100 sm:col-span-2">{v}</dd>
              </div>
            ))}
          </dl>
        </Section>
      )}

      <Section title="Outcome">
        <p className="leading-relaxed text-zinc-300">{project.outcome}</p>
      </Section>

      <div className="mt-16 border-t border-white/5 pt-8">
        <Link to="/" className="btn-ghost">← All projects</Link>
      </div>
    </main>
  );
}

function Section({ title, children }) {
  return (
    <section className="mt-12">
      <h2 className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-zinc-400">
        {title}
      </h2>
      {children}
    </section>
  );
}
