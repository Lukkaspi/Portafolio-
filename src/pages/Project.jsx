import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { projectBySlug } from '../data/projects.js';
import { keyStyles } from '../data/keyStyles.js';
import { asset } from '../lib/asset.js';
import { accentChipStyle } from '../lib/colors.js';
import ProjectGallery from '../components/ProjectGallery.jsx';
import CaseStudy from '../components/CaseStudy.jsx';
import HackathonEditions from '../components/HackathonEditions.jsx';
import TechnicalDrawings from '../components/TechnicalDrawings.jsx';

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
        {/* Accent-tinted tag chip — same colour as the project key.
            When the project is marked WIP, an animated status chip
            renders alongside it for an editorial "in development" mark. */}
        <div className="flex flex-wrap items-center gap-2">
          <span
            className="inline-flex items-center rounded-full px-2.5 py-[3px] text-[10px] font-medium uppercase leading-none tracking-[0.22em]"
            style={accentChipStyle(accent)}
          >
            {project.tag}
          </span>
          {project.wip && (
            <span
              className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-[3px] text-[10px] font-medium uppercase leading-none tracking-[0.22em]"
              style={accentChipStyle(accent)}
            >
              <span
                className="anim-blink inline-block h-1.5 w-1.5 rounded-full"
                style={{
                  background: accent,
                  boxShadow: `0 0 6px ${accent}`,
                }}
              />
              Work in Progress
            </span>
          )}
        </div>
        {/* Editorial title — sits between hero (8vw) and secondary copy */}
        <h1 className="mt-3 text-2xl font-semibold tracking-[-0.02em] text-white sm:text-3xl md:text-4xl">
          {project.title}
        </h1>
        <p className="mt-2 text-xs uppercase tracking-[0.2em] text-zinc-500 sm:text-[13px]">
          {project.role} · {project.year}
        </p>
        <p className="mt-6 max-w-2xl text-base leading-relaxed text-zinc-300 sm:text-lg">
          {project.summary}
        </p>

        {/* Collaboration credit — integrated naturally below the intro,
            not a footer note. Shows only when collaborators are listed. */}
        {project.collaborators && project.collaborators.length > 0 && (
          <p className="mt-5 max-w-2xl text-[11px] uppercase leading-relaxed tracking-[0.22em] text-zinc-500">
            In collaboration with{' '}
            <span className="text-zinc-200">
              {project.collaborators.join(' · ')}
            </span>
          </p>
        )}

        {/* Launch-App CTA — appears when the project ships an interactive
            prototype URL. Sits separately from the embedded PDF panel
            below so the live experience is clearly distinct from the
            case-study reading. */}
        {project.appUrl && (
          <div className="mt-7">
            <a
              href={project.appUrl}
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center gap-3 rounded-full border bg-ink-800/60 px-5 py-2.5 text-[12px] font-semibold uppercase leading-none tracking-[0.22em] text-white backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5"
              style={{
                borderColor: accent ? `${accent}99` : '#7c5cff99',
                boxShadow: accent
                  ? `0 14px 40px -18px ${accent}66, 0 0 0 1px ${accent}33 inset`
                  : '0 14px 40px -18px rgba(124,92,255,0.4)',
              }}
            >
              <span
                className="anim-blink inline-block h-1.5 w-1.5 rounded-full"
                style={{ background: accent ?? '#7c5cff' }}
              />
              {project.appLabel ?? 'Launch interactive prototype'}
              <span
                aria-hidden
                className="text-[14px] transition-transform duration-300 group-hover:translate-x-0.5"
                style={{ color: accent ?? '#7c5cff' }}
              >
                ↗
              </span>
            </a>
          </div>
        )}
      </header>

      {/* Cover hero — suppressed when the project provides any custom
          editorial structure so the page reads as a single sequence. */}
      {!project.gallery && !project.categories && !project.editions && !project.drawings && (
        <figure className="mt-10 overflow-hidden rounded-2xl border border-white/5">
          <img
            src={asset(project.images[0])}
            alt={project.title}
            loading="eager"
            decoding="async"
            className="h-auto w-full"
          />
        </figure>
      )}

      {project.problem && (
        <Section title="Problem">
          <p className="leading-relaxed text-zinc-300">{project.problem}</p>
        </Section>
      )}

      {project.process && project.process.length > 0 && (
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
      )}

      {project.gallery && project.gallery.length > 0 && (
        <div className="mt-14">
          <ProjectGallery items={project.gallery} accent={accent} />
        </div>
      )}

      {project.categories && project.categories.length > 0 && (
        <div className="mt-16 md:mt-20">
          <CaseStudy
            categories={project.categories}
            accent={accent}
            folderRoot={`media/${project.slug}/`}
          />
        </div>
      )}

      {project.editions && project.editions.length > 0 && (
        <div className="mt-14 md:mt-16">
          <HackathonEditions
            editions={project.editions}
            stack={project.stack}
            accent={accent}
          />
        </div>
      )}

      {project.drawings && project.drawings.groups && project.drawings.groups.length > 0 && (
        <div className="mt-16 md:mt-20">
          <TechnicalDrawings groups={project.drawings.groups} accent={accent} />
        </div>
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

      {project.outcome && (
        <Section title="Outcome">
          <p className="leading-relaxed text-zinc-300">{project.outcome}</p>
        </Section>
      )}

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
