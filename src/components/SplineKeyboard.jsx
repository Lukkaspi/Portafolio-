import { lazy, Suspense, useCallback, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { skillToProject } from '../data/skillProjectMap.js';
import { projectBySlug } from '../data/projects.js';
import { asset } from '../lib/asset.js';

// Spline runtime is large; lazy-load it.
const Spline = lazy(() => import('@splinetool/react-spline'));

const SCENE_URL = asset('assets/skills-keyboard.spline');

// Track current hover/selected key without triggering re-renders for every event.
function getProject(skillName) {
  if (!skillName) return null;
  const slug = skillToProject[skillName.toLowerCase()];
  return slug ? projectBySlug[slug] ?? null : null;
}

export default function SplineKeyboard() {
  const navigate = useNavigate();
  const splineRef = useRef(null);
  const hoveredRef = useRef(null);
  const [tooltip, setTooltip] = useState(null);

  const handleLoad = useCallback((app) => {
    splineRef.current = app;

    const setVars = (heading, desc) => {
      try {
        if (app.getVariable && app.getVariable('heading') !== undefined) {
          app.setVariable?.('heading', heading ?? '');
        }
        if (app.getVariable && app.getVariable('desc') !== undefined) {
          app.setVariable?.('desc', desc ?? '');
        }
      } catch {
        /* variables may not exist on every scene */
      }
    };

    const onHover = (e) => {
      const name = e?.target?.name;
      if (!name) return;
      hoveredRef.current = name;

      // Background / chassis hovered → clear tooltip
      if (name === 'body' || name === 'platform') {
        setTooltip(null);
        setVars('', '');
        return;
      }

      const project = getProject(name);
      if (project) {
        setTooltip({
          title: project.title,
          tag: project.tag,
          summary: project.summary,
          isComingSoon: false,
        });
        setVars(project.title, project.tag);
      } else {
        setTooltip({
          title: 'Coming Soon',
          tag: name.toUpperCase(),
          summary: 'More projects on the way.',
          isComingSoon: true,
        });
        setVars('Coming Soon', '');
      }
    };

    const onMouseDown = (e) => {
      const name = e?.target?.name;
      if (!name) return;
      const project = getProject(name);
      if (project) navigate(`/project/${project.slug}`);
    };

    app.addEventListener?.('mouseHover', onHover);
    app.addEventListener?.('mouseDown', onMouseDown);
    // Also bind keyboard events that the original scene fires.
    app.addEventListener?.('keyDown', onMouseDown);
  }, [navigate]);

  return (
    <div className="relative h-full w-full">
      <Suspense fallback={<SceneFallback />}>
        <Spline scene={SCENE_URL} onLoad={handleLoad} />
      </Suspense>

      {tooltip && (
        <div className="pointer-events-none absolute bottom-8 left-1/2 z-10 -translate-x-1/2">
          <div
            className={`card px-5 py-3 backdrop-blur-md transition-all ${
              tooltip.isComingSoon ? 'opacity-70' : ''
            }`}
          >
            <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-zinc-400">
              {tooltip.tag}
            </div>
            <div className="mt-1 text-base font-semibold text-white">
              {tooltip.title}
            </div>
            {tooltip.summary && (
              <div className="mt-1 max-w-md text-xs text-zinc-300/80">
                {tooltip.summary}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Bottom-right credit per Naresh's "free to use, credit appreciated" license. */}
      <a
        href="https://github.com/Naresh-Khatri/3d-portfolio"
        target="_blank"
        rel="noreferrer"
        className="absolute bottom-3 right-4 z-10 text-[10px] uppercase tracking-widest text-zinc-500 transition hover:text-zinc-300"
      >
        Keyboard model · Naresh-Khatri ↗
      </a>
    </div>
  );
}

function SceneFallback() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="text-xs uppercase tracking-widest text-zinc-400">
        Loading scene…
      </div>
    </div>
  );
}
