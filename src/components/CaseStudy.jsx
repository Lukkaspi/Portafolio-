import { asset } from '../lib/asset.js';
import { hexToRgba } from '../lib/colors.js';

// Six-act editorial case study renderer.
// Each category in `categories` is rendered as its own section with a
// chapter marker (01, 02, …), an accent kicker, a title, an optional
// description, and a category-specific image layout. When a category
// has no images yet, a discreet placeholder appears so the editorial
// rhythm is visible even before assets land.
//
// Image entries can be plain strings (paths under /public, e.g.
// "media/urn-packaging/study/01.jpg") or `{ src, caption }` objects.

const normalize = (img) => (typeof img === 'string' ? { src: img } : img);

const LAYOUTS = {
  asymmetric: AsymmetricLayout,
  'hero-detail': HeroDetailLayout,
  masonry: MasonryLayout,
  'single-large': SingleLargeLayout,
  'grid-detail': GridDetailLayout,
  cinematic: CinematicLayout,
};

export default function CaseStudy({ categories, accent = '#7c5cff', folderRoot }) {
  if (!categories || categories.length === 0) return null;

  return (
    <div className="space-y-24 md:space-y-32">
      {categories.map((cat, i) => {
        const Layout = LAYOUTS[cat.layout] ?? AsymmetricLayout;
        const items = (cat.images ?? []).map(normalize);
        const hasImages = items.length > 0;
        return (
          <section key={cat.key} className="anim-fade-up">
            <header className="md:max-w-3xl">
              <div className="flex items-center gap-4 text-[10px] font-mono uppercase leading-none tracking-[0.3em] text-zinc-500">
                <span>{String(i + 1).padStart(2, '0')}</span>
                <span
                  className="h-px w-10"
                  style={{ background: hexToRgba(accent, 0.55) }}
                />
                <span style={{ color: accent }}>{cat.kicker}</span>
              </div>
              <h2 className="mt-4 text-3xl font-semibold tracking-[-0.02em] text-white sm:text-4xl">
                {cat.title}
              </h2>
              {cat.description && (
                <p className="mt-3 text-sm leading-relaxed text-zinc-300/85 sm:text-base">
                  {cat.description}
                </p>
              )}
            </header>

            <div className="mt-8 md:mt-10">
              {hasImages ? (
                <Layout images={items} accent={accent} />
              ) : (
                <Placeholder
                  folder={`${folderRoot ?? ''}${cat.key}/`}
                  accent={accent}
                />
              )}
            </div>
          </section>
        );
      })}
    </div>
  );
}

// --- Placeholder ---------------------------------------------------------

function Placeholder({ folder, accent }) {
  return (
    <div
      className="flex aspect-[16/7] items-center justify-center rounded-2xl border border-dashed bg-white/[0.015]"
      style={{ borderColor: hexToRgba(accent, 0.28) }}
    >
      <div className="text-center">
        <div className="font-mono text-[10px] uppercase leading-none tracking-[0.32em] text-zinc-500">
          Awaiting upload
        </div>
        <div className="mt-2 font-mono text-xs text-zinc-400">{folder}</div>
      </div>
    </div>
  );
}

// --- Reusable image bits -------------------------------------------------

function Img({ src, caption, className = '', ...rest }) {
  return (
    <figure className={`group overflow-hidden rounded-xl border border-white/5 ${className}`}>
      <img
        src={asset(src)}
        alt={caption ?? ''}
        loading="lazy"
        decoding="async"
        className="block h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.025]"
        {...rest}
      />
    </figure>
  );
}

// --- Layouts -------------------------------------------------------------

function AsymmetricLayout({ images }) {
  // Best for 3-5 references / research images.
  // Layout: large left, two stacked right.
  const [a, b, c, ...rest] = images;
  return (
    <div className="grid grid-cols-12 gap-3 md:gap-5">
      {a && <Img {...a} className="col-span-12 md:col-span-7 aspect-[4/3]" />}
      <div className="col-span-12 grid grid-cols-1 gap-3 md:col-span-5 md:gap-5">
        {b && <Img {...b} className="aspect-[4/3]" />}
        {c && <Img {...c} className="aspect-[4/3]" />}
      </div>
      {rest.map((img, i) => (
        <Img key={i} {...img} className="col-span-12 md:col-span-4 aspect-[4/3]" />
      ))}
    </div>
  );
}

function HeroDetailLayout({ images }) {
  // 1 dominant square hero, 2 side details.
  const [a, b, c] = images;
  return (
    <div className="grid grid-cols-12 gap-3 md:gap-5">
      {a && <Img {...a} className="col-span-12 md:col-span-8 aspect-square md:aspect-[5/4]" />}
      <div className="col-span-12 grid grid-cols-2 gap-3 md:col-span-4 md:grid-cols-1 md:gap-5">
        {b && <Img {...b} className="aspect-square" />}
        {c && <Img {...c} className="aspect-square" />}
      </div>
    </div>
  );
}

function MasonryLayout({ images }) {
  // Native CSS columns for a true asymmetric flow.
  return (
    <div className="columns-2 gap-3 md:columns-3 md:gap-5">
      {images.map((img, i) => (
        <figure
          key={i}
          className="group mb-3 break-inside-avoid overflow-hidden rounded-xl border border-white/5 md:mb-5"
        >
          <img
            src={asset(img.src)}
            alt={img.caption ?? ''}
            loading="lazy"
            decoding="async"
            className="block w-full transition-transform duration-700 ease-out group-hover:scale-[1.025]"
          />
        </figure>
      ))}
    </div>
  );
}

function SingleLargeLayout({ images }) {
  // Full-bleed technical plates stacked.
  return (
    <div className="space-y-3 md:space-y-5">
      {images.map((img, i) => (
        <figure
          key={i}
          className="group overflow-hidden rounded-2xl border border-white/5 bg-white"
        >
          <img
            src={asset(img.src)}
            alt={img.caption ?? ''}
            loading="lazy"
            decoding="async"
            className="block w-full transition-transform duration-700 ease-out group-hover:scale-[1.01]"
          />
        </figure>
      ))}
    </div>
  );
}

function GridDetailLayout({ images }) {
  // 1 hero + N details. Stays balanced for 1, 2, 3 or more images.
  const [a, ...rest] = images;
  return (
    <div className="space-y-3 md:space-y-5">
      {a && <Img {...a} className="aspect-[4/3]" />}
      {rest.length > 0 && (
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-5">
          {rest.slice(0, 2).map((img, i) => (
            <Img key={i} {...img} className="aspect-[4/3]" />
          ))}
        </div>
      )}
      {rest.slice(2).length > 0 && (
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-5">
          {rest.slice(2).map((img, i) => (
            <Img key={i + 2} {...img} className="aspect-[3/4]" />
          ))}
        </div>
      )}
    </div>
  );
}

function CinematicLayout({ images }) {
  // Hero render full-width + 2 supporting renders.
  const [a, b, c, ...rest] = images;
  return (
    <div className="space-y-3 md:space-y-5">
      {a && <Img {...a} className="aspect-[16/9]" />}
      {(b || c) && (
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-5">
          {b && <Img {...b} className="aspect-[4/3]" />}
          {c && <Img {...c} className="aspect-[4/3]" />}
        </div>
      )}
      {rest.length > 0 && (
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-5">
          {rest.map((img, i) => (
            <Img key={i} {...img} className="aspect-square" />
          ))}
        </div>
      )}
    </div>
  );
}
