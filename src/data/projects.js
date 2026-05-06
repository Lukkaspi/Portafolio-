// Single source of truth for portfolio content + key bindings.
// `key` is the keyboard cap label that maps to this project on desktop.
// Replace summary, problem, process, technical, outcome, and images with the
// real content when ready — the structure is stable.

export const projects = [
  {
    slug: 'cupra',
    key: 'Space',
    title: 'CUPRA Concept Car',
    role: 'Concept design · Surfacing · Renders',
    year: '2024',
    tag: 'Automotive · Concept',
    accent: 'cupra',
    featured: true,
    summary:
      'A brand-coherent electric coupé concept exploring CUPRA’s "contemporary performance" language for a 2030 driver.',
    problem:
      'CUPRA’s identity sits between Spanish craftsmanship and electric performance, but most concept work still leans on combustion-era proportions. The brief: propose a driver-focused 2+2 EV silhouette that visually communicates instant torque, low CG, and sustainable materiality without losing the brand’s aggressive stance.',
    process: [
      {
        title: 'Research & moodboard',
        body: 'Benchmarked the Tavascan, Born VZ and direct competitors (Polestar 5, Hyundai N Vision 74). Built a moodboard around brushed copper, anodised graphite, and matte glass to anchor the material story.',
      },
      {
        title: 'Ideation sketches',
        body: '~80 thumbnail sketches in Procreate, narrowing to three directions: low-cab GT, raised-cab shooting brake, and a wedge coupé. The wedge tested best against the brand DNA matrix.',
      },
      {
        title: 'Tape drawing & blockmodel',
        body: 'Full-side tape drawing at 1:5 to lock proportions, followed by a foam blockmodel to validate the dash-to-axle and DLO graphic in real volume.',
      },
      {
        title: 'Digital surfacing',
        body: 'Surfaces rebuilt in Blender with Class-A discipline (G2 continuity on character lines). Wheel arches, shoulder line and copper accent strip iterated against package constraints (800V battery floor, 2.85 m wheelbase).',
      },
      {
        title: 'Visualisation',
        body: 'KeyShot studio renders for hero shots; in-context renders dropped onto Montjuïc and Castellet plates for narrative. Final deck delivered as a 18-page PDF case study.',
      },
    ],
    technical: {
      Platform: 'MEB+ EV (assumed) · 800 V architecture',
      Dimensions: '4 480 × 1 920 × 1 320 mm · WB 2 850 mm',
      Software: 'Procreate · Blender · KeyShot · Adobe Illustrator',
      Materials: 'Recycled aluminium body panels · bio-PU interior · brushed copper accents',
      Wheels: '21" forged, aero-optimised inserts',
    },
    outcome:
      'Selected as one of three concepts presented in the end-of-semester automotive studio review. Faculty highlighted the resolution of the rear three-quarter and the discipline of the surfacing. The full case study is the centrepiece of this portfolio.',
    images: ['images/projects/cupra/cover.svg'],
  },

  {
    slug: 'car-sketches',
    key: 'C',
    title: 'Automotive Sketches',
    role: 'Procreate · iPad',
    year: '2022 — 2025',
    tag: 'Automotive · Sketching',
    accent: 'accent',
    summary:
      'A collection of rapid automotive explorations created in Procreate for iPad. Short-form sketches driven by instinct, movement and passion for automotive design.',
    // Editorial presentation: only the gallery renders for this project.
    problem: null,
    process: null,
    technical: null,
    outcome: null,
    images: ['images/projects/car-sketches/cover.svg'],
    gallery: [
      {
        src: 'media/IMG_2425.png',
        tag: 'Hypercar Exploration',
        title: 'Lamborghini Huracán STO',
        caption:
          'A gridded under-drawing exploring the STO\'s wedge stance, dihedral nose vents and aggressive cab-forward proportions. The grid is kept in the final to expose the underlying construction.',
        specs: {
          Power: '640 CV',
          Engine: '5.2 L NA V10',
          Production: '2021 — Present',
        },
      },
      {
        src: 'media/IMG_2392.png',
        tag: 'GT Performance Study',
        title: 'Porsche 911 Turbo',
        caption:
          'Pencil tonal study of the 992 silhouette. Captures the iconic teardrop greenhouse, blistered rear haunches and the deltoid wheel arches that anchor the 911\'s design DNA.',
        specs: {
          Power: '580 CV',
          Engine: '3.8 L Twin-Turbo Flat-Six',
          Production: '2020 — Present',
        },
      },
      {
        src: 'media/IMG_2391.png',
        tag: 'Long-Tail Concept',
        title: 'McLaren 600LT',
        caption:
          'Side blockout under a long-tail brief: low-slung mid-engined proportions, dihedral door cuts and aero-driven side intakes. A personal interpretation of the LT lineage.',
        specs: {
          Power: '600 CV',
          Engine: '3.8 L Twin-Turbo V8',
          Production: '2018 — 2020',
        },
      },
    ],
  },

  {
    slug: 'microplastics-filter',
    key: 'M',
    title: 'Microplastics Washing Machine Filter',
    role: 'Industrial Design · Design Workshop III',
    year: 'TAD3 · Sole author',
    tag: 'Sustainability · Product',
    accent: 'accent',
    wip: true,
    author: 'Lukka Spiluttini',
    summary:
      'An ongoing industrial design project developed for the subject "Design Workshop III", focused on the creation of a microplastics filtration system for washing machines. The project explores sustainability-driven product development, filtration concepts, user interaction and environmental impact reduction through an evolving iterative design process.',
    problem: null,
    process: null,
    technical: null,
    outcome: null,
    images: ['images/projects/microplastics-filter/cover.svg'],
    drawings: {
      groups: [
        {
          key: 'process-document',
          // No section title → component skips the chapter header.
          itemKicker: 'Document',
          stamp: 'TAD3 · IN PROGRESS',
          items: [
            {
              title: 'Process Document',
              subtitle: 'TAD3 · PAP',
              file: 'media/microplastics-filter/01-presentation.pdf',
            },
          ],
        },
      ],
    },
  },

  {
    slug: 'aparcat',
    key: 'A',
    title: 'Plaça Lliure',
    role: 'Industrial Design · Basic Design',
    year: 'DIBA · M12',
    tag: 'Urban Mobility · Service Design',
    accent: 'accent',
    collaborators: [
      'Carla Clavet',
      'Joana Coronel',
      'Sergi Floriach',
      'Sara Giménez',
    ],
    appUrl:
      'https://diba-aurea-gp12.my.canva.site/copia-de-prototipo-interactivo-de-app-m-vil-pla-a-lliure',
    appLabel: 'Launch interactive prototype',
    summary:
      'A mobility-focused design project developed for the subject "Basic Design", centered around improving parking accessibility in Barcelona through a peer-to-peer parking rental platform. The project explores urban mobility, user interaction and service accessibility through the creation of a digital ecosystem connecting private parking owners with drivers in need of temporary parking solutions.',
    problem: null,
    process: null,
    technical: null,
    outcome: null,
    images: ['images/projects/aparcat/cover.svg'],
    drawings: {
      groups: [
        {
          key: 'process-document',
          // No section title → component skips chapter header.
          itemKicker: 'Document',
          stamp: 'DIBA · M12',
          items: [
            {
              title: 'Project Development',
              subtitle: 'DIBA · M12',
              file: 'media/aparcat/01-final-presentation.pdf',
            },
          ],
        },
      ],
    },
  },

  {
    slug: 'uab-hackathon',
    key: 'H',
    title: 'UAB Hackathon — 2 Editions',
    role: 'Hackathon · Team participation',
    year: '2023 · 2024',
    tag: 'Hackathon · Innovation',
    accent: 'accent',
    summary:
      'Participation in two consecutive UAB Hackathon editions focused on solving real-world technological challenges proposed by leading companies. Both experiences combined fast problem-solving, collaborative development and technical experimentation under intensive time constraints.',
    // Editorial layout: editions + stack carry the page.
    problem: null,
    process: null,
    technical: null,
    outcome: null,
    images: ['images/projects/uab-hackathon/cover.svg'],
    editions: [
      {
        id: '01',
        partner: "Caixa d'Enginyers",
        year: '2023',
        domain: 'Algorithms · Logistics',
        title: 'Route Optimization Challenge',
        description:
          'Development of route optimization systems inside a dedicated software environment provided during the hackathon. The challenge focused on improving route efficiency, data processing and decision-making logic through algorithmic approaches and rapid iteration.',
        tags: ['Routing', 'Optimization', 'Data Processing', 'Decision Logic'],
        scope: ['48 h sprint', 'Industry brief', 'Live pitch'],
      },
      {
        id: '02',
        partner: 'Deloitte',
        year: '2024',
        domain: 'Cybersecurity · Pen-testing',
        title: 'Cybersecurity Challenge',
        description:
          'Participation in a cybersecurity-oriented challenge focused on identifying and exploiting vulnerabilities inside controlled systems provided during the event. The experience involved technical analysis, system exploration and collaborative problem-solving within simulated security environments.',
        tags: ['Vulnerability Analysis', 'System Exploration', 'Pen-testing', 'Sandboxed Env'],
        scope: ['48 h sprint', 'Industry brief', 'Live pitch'],
      },
    ],
    stack: [
      { name: 'Java', kind: 'Language' },
      { name: 'HTML', kind: 'Markup' },
      { name: 'Python', kind: 'Language' },
    ],
  },

  {
    slug: 'university-sheets',
    key: 'U',
    title: 'University Sheets',
    role: 'Academic · Visual development',
    year: '2022 — 2025',
    tag: 'Academic · Documentation',
    accent: 'accent',
    summary:
      'An evolving archive of academic sheets, technical boards and visual development work produced throughout the degree — from early proportion exercises to finished editorial plates. A cross-section of how form, image and language are studied across courses.',
    problem: null,
    process: null,
    technical: null,
    outcome: null,
    images: ['images/projects/university-sheets/cover.svg'],
    categories: [
      {
        key: 'pop-art',
        title: 'Pop-Art · Color Theory',
        kicker: 'Visual Composition',
        description:
          'A Warhol-coded chromatic exercise: a vinyl player rendered in four palettes — analogous, triadic, complementary divided and tetradic. The final composition was selected for the Callao billboard in Madrid as part of the EXAR-UPC programme.',
        layout: 'asymmetric',
        images: [
          'media/university-sheets/pop-art/01-pop-art-poster-final.png',
          'media/university-sheets/pop-art/02-callao-billboard.png',
          'media/university-sheets/pop-art/03-color-theory-grid.png',
        ],
      },
      {
        key: 'matchbox',
        title: "Matchbox · Warhol's Soup Tribute",
        kicker: 'Graphic Design',
        description:
          'A New-Year matchbox redesigned as a Campbell\'s Soup tribute — full unfold template, printed plates with an Andy Warhol quote on the back, and the final hand-assembled object. A study in iconic graphic translation and printable surface design.',
        layout: 'asymmetric',
        images: [
          'media/university-sheets/matchbox/01-printed-plates.png',
          'media/university-sheets/matchbox/02-unfold-template.png',
          'media/university-sheets/matchbox/03-finished-matchbox.png',
          'media/university-sheets/matchbox/04-matchbox-pair.png',
        ],
      },
      {
        key: 'typography',
        title: 'Typography · Perspective Plate',
        kicker: 'Type Composition',
        description:
          'Black-and-white plate exploring how a typographic block bends in perspective when projected onto an architectural plane. A discipline of structure, contrast and visual rhythm.',
        layout: 'single-large',
        images: [
          'media/university-sheets/typography/01-typography-perspective.png',
        ],
      },
      {
        key: 'sentelman-chair',
        title: 'Sentelman Chair · Visual Analysis',
        kicker: 'Form Study',
        description:
          'A visual decomposition of the Gerrit Rietveld 1963 Sentelman chair: golden-ratio proportional analysis and volumetric breakdown into primitive geometries. Final A3 plate.',
        layout: 'single-large',
        images: [
          'media/university-sheets/sentelman-chair/01-final-analysis-sheet.png',
        ],
      },
      {
        key: 'object-studies',
        title: 'Object Studies',
        kicker: 'Observation',
        description:
          'Analytical drawings of everyday products — a Krups Infinissima coffee machine in elevation and 3/4 perspective, a dimensioned door-handle spec with material annotations, and form/volume studies of curved bodies on architectural bases. Looking at how form, mechanism and ergonomics resolve at the detail scale.',
        // single-large keeps every plate at its natural aspect, full width,
        // never aspect-cropped — readability of the technical detail wins
        // over a denser collage in this section.
        layout: 'single-large',
        images: [
          'media/university-sheets/object-studies/01-coffee-machine-elevation.png',
          'media/university-sheets/object-studies/02-coffee-machine-perspective.png',
          'media/university-sheets/object-studies/03-door-handle-spec.png',
          'media/university-sheets/object-studies/04-object-volume-study.png',
          'media/university-sheets/object-studies/05-object-construction-grid.png',
        ],
      },
      {
        key: 'furniture-development',
        title: 'Furniture Development',
        kicker: 'Form & Construction',
        description:
          'A spread across furniture explorations — chair perspective studies, table typology series ("Mesa piano · medusa · dalí · proporción áurea · árbol"), the collaborative T-BOOK bench inspired by stacked books, kitchen-cabinet construction details and an interior perspective drawing.',
        layout: 'masonry',
        images: [
          'media/university-sheets/furniture-development/01-tbook-bench-final.png',
          'media/university-sheets/furniture-development/02-furniture-concepts.png',
          'media/university-sheets/furniture-development/03-table-explorations.png',
          'media/university-sheets/furniture-development/04-chair-sketches.png',
          'media/university-sheets/furniture-development/05-cabinet-construction.png',
          'media/university-sheets/furniture-development/06-interior-perspective.png',
        ],
      },
      {
        key: 'bicycle-furniture',
        title: 'Bicycle-Integrated Furniture',
        kicker: 'Hybrid Design',
        description:
          'An ideation series for furniture that incorporates a bicycle — bench, stool, TV cabinet and shelf concepts that solve indoor bike storage as a piece of domestic design rather than as an accessory. Includes a small cable-cover study from the same brief.',
        layout: 'asymmetric',
        images: [
          'media/university-sheets/bicycle-furniture/01-bicycle-furniture-grid.png',
          'media/university-sheets/bicycle-furniture/02-tv-cabinet-development.png',
          'media/university-sheets/bicycle-furniture/03-cable-accessory.png',
        ],
      },
    ],
  },

  {
    slug: 'technical-drawings',
    key: 'T',
    title: 'Technical Drawings',
    role: 'Engineering · Technical Documentation',
    year: 'Design and Technical Representation',
    tag: 'CAD · Mechanical',
    accent: 'accent',
    summary:
      'A complete technical drawing project developed for the subject "Design and Technical Representation", focused on the engineering and construction documentation of a water suction pump system. The project includes detailed technical plans, dimensional studies and mechanical representation workflows developed through professional drafting methodologies.',
    problem: null,
    process: null,
    technical: null,
    outcome: null,
    images: ['images/projects/technical-drawings/cover.svg'],
    drawings: {
      groups: [
        {
          key: 'assembly',
          title: 'General Assembly',
          kicker: 'Overall',
          description:
            'Full-system documentation: exploded view, two assembly plates and a section reference. Establishes how the parts come together and how the pump is meant to be read at a glance.',
          items: [
            {
              title: 'Exploded View',
              subtitle: 'Vista Explosionada',
              file: 'media/technical-drawings/assembly/01-exploded-view.pdf',
            },
            {
              title: 'Assembly · Plate 1',
              subtitle: 'P1 · Plano Pieza 1',
              file: 'media/technical-drawings/assembly/02-assembly-plan-1.pdf',
            },
            {
              title: 'Assembly · Plate 2',
              subtitle: 'P1 · Plano Pieza 2',
              file: 'media/technical-drawings/assembly/03-assembly-plan-2.pdf',
            },
            {
              title: 'Section View',
              subtitle: 'P2 · Plano 3.1',
              file: 'media/technical-drawings/assembly/04-section-view.pdf',
            },
          ],
        },
        {
          key: 'body',
          title: 'Body & Cover',
          kicker: 'Housing',
          description:
            'The pump enclosure: outer body, cover plate and a detailed sectional study. Where the mechanical core lives.',
          items: [
            {
              title: 'Body',
              subtitle: 'Plànol Cos',
              file: 'media/technical-drawings/body/01-body.pdf',
            },
            {
              title: 'Body Cover',
              subtitle: 'Plànol Tapa Cos',
              file: 'media/technical-drawings/body/02-body-cap.pdf',
            },
            {
              title: 'Section Detail',
              subtitle: 'P2 · E2',
              file: 'media/technical-drawings/body/03-section-detail.pdf',
            },
          ],
        },
        {
          key: 'components',
          title: 'Component Parts',
          kicker: 'Mechanism',
          description:
            'Individual mechanical components — piston, pin, connecting rod, eccentric and motor. Each plate carries its own dimensions, tolerances and surface-finish callouts.',
          items: [
            {
              title: 'Piston',
              subtitle: 'Pieza 4 · Émbolo',
              file: 'media/technical-drawings/components/01-piston.pdf',
            },
            {
              title: 'Pin',
              subtitle: 'Pieza 5 · Bulón',
              file: 'media/technical-drawings/components/02-pin.pdf',
            },
            {
              title: 'Connecting Rod',
              subtitle: 'Pieza 6 · Biela',
              file: 'media/technical-drawings/components/03-connecting-rod.pdf',
            },
            {
              title: 'Eccentric',
              subtitle: 'Pieza 9 · Excéntrica',
              file: 'media/technical-drawings/components/04-eccentric.pdf',
            },
            {
              title: 'Motor',
              subtitle: 'Pieza 10 · Motor',
              file: 'media/technical-drawings/components/05-motor.pdf',
            },
          ],
        },
      ],
    },
  },

  {
    slug: 'intercom-study',
    key: 'I',
    title: 'Intercom Study',
    role: 'Industrial Design · Design Workshop II',
    year: 'TAD2 · GT05',
    tag: 'UX · Hardware',
    accent: 'accent',
    collaborators: ['Edda Gómez', 'Mario Torrejón', 'Ingrid López'],
    summary:
      'A redesign study developed for the subject "Design Workshop II", focused on rethinking the interaction, ergonomics and visual identity of a domestic intercom system. The project explores user-centered design methodologies, conceptual development and presentation workflows through a complete industrial design process.',
    problem: null,
    process: null,
    technical: null,
    outcome: null,
    images: ['images/projects/intercom-study/cover.svg'],
    drawings: {
      groups: [
        {
          key: 'group-presentations',
          // No title/kicker → component skips the section header.
          itemKicker: 'Document',
          stamp: 'TAD2 · PRESENTATION',
          items: [
            {
              title: 'Final Presentation',
              subtitle: 'TAD2-P1 · GT05',
              file: 'media/intercom-study/01-final-presentation.pdf',
            },
            {
              title: 'Follow-up Presentation',
              subtitle: 'TAD2-P2 · GT05',
              file: 'media/intercom-study/02-followup-presentation.pdf',
            },
          ],
        },
      ],
    },
  },

  {
    slug: 'urn-packaging',
    key: 'R',
    title: 'Urn Packaging',
    role: 'Graphic Design · Full-semester project',
    year: '2nd-year · 2023',
    tag: 'Packaging · Memorial',
    accent: 'accent',
    collaborators: ['Ingrid López', 'Pau Alonso'],
    summary:
      'Urn Packaging was developed throughout an entire semester during the second-year Graphic Design course. The project explores the complete packaging development process, from early research and symbolism studies to sketches, technical plans, physical mockups and final renders.',
    // Editorial case study — no Problem/Process/Outcome; the categories
    // below carry the page in a cinematic six-act sequence.
    problem: null,
    process: null,
    technical: null,
    outcome: null,
    images: ['images/projects/urn-packaging/cover.svg'],
    categories: [
      {
        key: 'study',
        title: 'Study',
        kicker: 'Research',
        description:
          'Design philosophy, symbolic exploration of three brand directions and the construction grid that locks in the chosen mark.',
        layout: 'single-large',
        images: [
          'media/urn-packaging/study/01-design-system-page.png',
          'media/urn-packaging/study/02-symbol-direction-breakdown.png',
          'media/urn-packaging/study/03-logo-construction-grid.png',
        ],
      },
      {
        key: 'symbolism',
        title: 'Symbolism',
        kicker: 'Visual Code',
        description:
          'Three explored brand directions for the memorial — Requies, Luz y Luna and Ceniza y Luz — each translating archetypes of closure, cycle and return.',
        layout: 'hero-detail',
        images: [
          'media/urn-packaging/symbolism/01-requies.png',
          'media/urn-packaging/symbolism/02-luz-y-luna.png',
          'media/urn-packaging/symbolism/03-ceniza-y-luz.png',
        ],
      },
      {
        key: 'sketches',
        title: 'Sketches',
        kicker: 'Ideation',
        description:
          'Form exploration in graphite — twisted spirals, leaf cradles, faceted volumes and stack-for-transport studies.',
        layout: 'masonry',
        images: [
          'media/urn-packaging/sketches/01-form-cylinder.png',
          'media/urn-packaging/sketches/02-twist-spiral.png',
          'media/urn-packaging/sketches/03-twist-variants.png',
          'media/urn-packaging/sketches/04-spiral-opening.png',
          'media/urn-packaging/sketches/05-nautilus-spiral.png',
          'media/urn-packaging/sketches/06-leaf-construction.png',
          'media/urn-packaging/sketches/07-concentric-form.png',
          'media/urn-packaging/sketches/08-leaf-wrap.png',
          'media/urn-packaging/sketches/09-leaf-pouch.png',
          'media/urn-packaging/sketches/10-geometric-cradle.png',
          'media/urn-packaging/sketches/11-polygonal-opening.png',
          'media/urn-packaging/sketches/12-faceted-rock.png',
        ],
      },
      {
        key: 'plans',
        title: 'Technical Plans',
        kicker: 'Construction',
        description:
          'Unfold sequences and brand-application plates for the outer carton — from raw construction sketch to finished printed sheet.',
        layout: 'single-large',
        images: [
          'media/urn-packaging/plans/01-unfold-sketch.png',
          'media/urn-packaging/plans/02-printed-unfold.png',
          'media/urn-packaging/plans/03-brand-application.png',
        ],
      },
      {
        key: 'mockup',
        title: 'Mockup',
        kicker: 'Prototype',
        description:
          'First 3D mockups of the packaging system with the urn in place — open and closed configurations.',
        layout: 'grid-detail',
        images: [
          'media/urn-packaging/mockup/01-urn-in-open-box.png',
          'media/urn-packaging/mockup/02-closed-box-leaf.png',
        ],
      },
      {
        key: 'renders',
        title: 'Renders',
        kicker: 'Visualisation',
        description:
          'Final cinematic stills — packaging system, unboxing composition and a hero shot of the EA Eterna brand applied.',
        layout: 'single-large',
        images: [
          'media/urn-packaging/renders/01-system-composition.png',
          'media/urn-packaging/renders/02-final-hero.png',
        ],
      },
    ],
  },

  {
    slug: 'dam-beverage',
    key: 'D',
    title: 'DAM Beverage Development',
    role: 'Product development · Branding',
    year: '2024',
    tag: 'Beverage · Packaging',
    accent: 'accent',
    summary:
      'A new low-alcohol beverage line concept for an Estrella Damm-style brief — from positioning through can, bottle, and shelf system.',
    problem:
      'The 0.0–3% ABV category is growing fast, but most extensions feel like apologetic line additions rather than a category in their own right. The brief: define a stand-alone sub-brand with its own visual code, optimised for on-trade and grocery.',
    process: [
      { title: 'Category audit', body: 'Audit of 38 SKUs across major Spanish and European competitors. Mapped flavour, visual code, and shelf occupancy.' },
      { title: 'Positioning', body: 'Settled on "social, citrus-forward, sessionable" — adjacent to but distinct from the parent brand’s tradition.' },
      { title: 'Liquid concept', body: 'Defined three flavour profiles (citrus-hop, herbal-spritz, cold-brew malt) with target sensory descriptors.' },
      { title: 'Pack system', body: 'Designed a 33 cl can, 25 cl returnable bottle, and a 4-pack carrier. Material-led visual code: matte ink with embossed glyphs.' },
      { title: 'Shelf prototype', body: 'Built a 1:1 shelf mock-up to test stand-out at three metres. Iterated typography weight after the test.' },
    ],
    technical: {
      Formats: '33 cl can · 25 cl returnable glass · 4-pack carrier',
      Materials: 'Aluminium can · light-weighted glass · uncoated FSC carrier',
      Software: 'Illustrator · KeyShot · SolidWorks (carrier)',
    },
    outcome:
      'Full brand + pack deck plus 1:1 prototype shelf. Used as the cornerstone deliverable in the Product Development & Branding course.',
    images: ['images/projects/dam-beverage/cover.svg'],
  },

  {
    slug: 'drone-concept',
    key: 'X', // not bound to a keyboard slot yet — project lives at /#/project/drone-concept
    title: 'Drone Concept Design',
    role: 'Industrial Design · R&D',
    year: 'Upcoming · in development',
    tag: 'Aerospace · Concept',
    accent: 'accent',
    wip: true,
    summary:
      'An upcoming industrial design project focused on the conceptual development of a drone platform exploring aerodynamics, lightweight structures and future-oriented mobility systems. The project is currently under development and already incorporates professional product development methodologies including functional analysis, QFD, value analysis, briefing definition, preliminary research and GANTT-based project structuring. Additional technical studies, concept exploration and visual material will be integrated progressively throughout the development process.',
    problem: null,
    process: null,
    technical: null,
    outcome: null,
    images: ['images/projects/drone-concept/cover.svg'],
    methodologies: [
      {
        name: 'Briefing',
        tag: 'Scope',
        body: 'Defining project scope, hard constraints and design intent. Aligns mission, target user and performance envelope before any concept work begins.',
      },
      {
        name: 'Preliminary Research',
        tag: 'Discovery',
        body: 'Benchmarking the drone landscape, mapping technological frontiers and surfacing the unexploited gaps the concept can address.',
      },
      {
        name: 'Functional Analysis',
        tag: 'Functions',
        body: 'Mapping every required and desired function of the drone system. Clarifies what the design must deliver before form follows.',
      },
      {
        name: 'QFD · Quality Function Deployment',
        tag: 'Specification',
        body: 'Translating user requirements into measurable engineering specifications through a structured priority matrix. Ensures every design decision is anchored in user value.',
      },
      {
        name: 'Value Analysis',
        tag: 'Optimisation',
        body: 'Auditing each subsystem for the value it contributes vs the cost it carries — driving toward a leaner, smarter, more focused architecture.',
      },
      {
        name: 'GANTT · Project Structuring',
        tag: 'Schedule',
        body: 'Time-boxed phases laid out across the development calendar. Milestones, dependencies and parallel workstreams aligned to delivery.',
      },
    ],
  },
];

// Fast lookup by slug (used by /project/:slug)
export const projectBySlug = Object.fromEntries(projects.map((p) => [p.slug, p]));

// Fast lookup by uppercase key label (used by the 3D keyboard)
export const projectByKey = Object.fromEntries(
  projects.map((p) => [p.key.toUpperCase(), p])
);
