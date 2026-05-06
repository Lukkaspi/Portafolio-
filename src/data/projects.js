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
    role: 'Product design · Mechanical engineering',
    year: '2024',
    tag: 'Sustainability · Product',
    accent: 'accent',
    summary:
      'A retrofittable inline filter that captures synthetic microfibres from washing-machine drainage before they reach the wastewater stream.',
    problem:
      'A single 6 kg synthetic load can release ~700 000 microfibres into the water network. Existing solutions are either bulky external boxes that intimidate users or one-shot pouches with low capture efficiency. The brief was a low-cost, replaceable-cartridge filter that any consumer could install in under five minutes.',
    process: [
      { title: 'Research', body: 'Reviewed PlanetCare, Filtrol, and academic studies on fibre-size distribution (8–500 μm). Surveyed 32 households about appliance access and willingness to maintain a consumable.' },
      { title: 'Concept selection', body: 'Three concepts evaluated against a Pugh matrix: cyclonic separator, pleated mesh cartridge, and electrostatic capture. Pleated mesh won on cost, serviceability, and pressure drop.' },
      { title: 'Mechanical design', body: 'Modelled in SolidWorks with a 50 μm stainless mesh, snap-fit cartridge, and standard 3/4" hose threads. Sized to fit between machine outlet and waste pipe under any standard washing machine.' },
      { title: 'Prototyping', body: 'FDM-printed PETG housing + laser-cut steel mesh. Five units assembled for bench testing.' },
      { title: 'Validation', body: 'Tested with a 2 kg synthetic-load proxy: capture efficiency measured by gravimetric analysis on the mesh after 10 cycles.' },
    ],
    technical: {
      Filtration: '50 μm stainless steel mesh, pleated for surface area',
      Housing: 'PETG (prototype) → ABS or PP target for production',
      Connection: '3/4" BSP, standard washing-machine hose',
      Software: 'SolidWorks · KeyShot · Excel for test analysis',
      'Capture efficiency (test)': '~78% by mass over 10-cycle bench test',
    },
    outcome:
      'Working prototype demonstrating ~78% fibre capture in bench tests, with cartridge replacement under 30 seconds. Project earned a top-quartile grade in the Product Development course and is being extended for a sustainability competition.',
    images: ['images/projects/microplastics-filter/cover.svg'],
  },

  {
    slug: 'aparcat',
    key: 'A',
    title: "Aparca't",
    role: 'Product · Service design',
    year: '2023',
    tag: 'IoT · Urban',
    accent: 'accent',
    summary:
      'A street-level smart-parking system pairing a low-power sensor puck with a companion app to surface free spaces in dense city blocks.',
    problem:
      "Drivers in Barcelona spend an average of 17 minutes searching for street parking, generating extra emissions and congestion. Existing apps rely on user reports and lose accuracy fast. Aparca't proposes hardware-first ground-truth.",
    process: [
      { title: 'Field research', body: 'Mapped occupancy in two Eixample blocks across weekday rush hours. Confirmed crowdsourced apps under-report turnover by ~40%.' },
      { title: 'Sensor concept', body: 'Magnetometer + ToF dual-sensing puck, IP68, embedded flush in pavement. ESP32 with LoRa uplink for low-bandwidth, low-power operation.' },
      { title: 'Industrial design', body: 'Disc form, EPDM gasket, anti-tamper torx fasteners. Iterated for snowplough/road-sweep survival.' },
      { title: 'App UX', body: 'Map view with predictive "likely free in 2 min" tiles, plus paid-zone integration. Designed in Figma, prototyped flows tested with 8 users.' },
      { title: 'Service blueprint', body: 'End-to-end flow from city procurement through user payment, including maintenance routes and SLA.' },
    ],
    technical: {
      MCU: 'ESP32-S3 with LoRa SX1262',
      Battery: '3 × AA Li/SOCl₂ — projected ~4 year life',
      Housing: 'PA12 nylon (SLS prototype) · IP68',
      App: 'React Native · Mapbox · Figma prototypes',
    },
    outcome:
      'Working sensor + app prototype demonstrated to course faculty. Highlighted as a strong example of hardware/service integration in the year review.',
    images: ['images/projects/aparcat/cover.svg'],
  },

  {
    slug: 'uab-hackathon',
    key: 'H',
    title: 'UAB Hackathon (2 editions)',
    role: 'Team lead · Concept · Prototype',
    year: '2023 & 2024',
    tag: 'Hackathon · Innovation',
    accent: 'accent',
    summary:
      'Two consecutive years competing in the UAB engineering hackathon — 48 hours from brief to prototype, with focus on rapid validation.',
    problem:
      'Each edition delivers a fresh open-ended brief from an industry partner (sustainability, mobility, healthcare). The challenge is converging on a defensible solution and a working demo within 48 hours, as a team of 4–5.',
    process: [
      { title: 'Edition 2023 — sustainability brief', body: 'Designed a deposit-return interface for reusable food-delivery containers. Built a working RFID-tagged container demo and a partner-facing dashboard mockup.' },
      { title: 'Edition 2024 — urban mobility brief', body: 'Proposed a modular last-mile cargo-bike attachment for small couriers. Built a half-scale CAD model and a benefit-vs-cost case for a target courier persona.' },
      { title: 'Team role', body: 'Led concept direction and physical prototyping in both editions; coordinated handoffs between CAD, electronics and pitch.' },
      { title: 'Pitch', body: 'Both years closed with a 5-minute live pitch + Q&A in front of a mixed industry/academic jury.' },
    ],
    technical: {
      Software: 'SolidWorks · Figma · Arduino IDE',
      Prototyping: 'FDM 3D printing · laser cutting · RFID dev boards',
    },
    outcome:
      'Top-five finish in 2023; finalist mention for the prototype quality in 2024. Both editions sharpened time-boxed scoping and team coordination skills.',
    images: ['images/projects/uab-hackathon/cover.svg'],
  },

  {
    slug: 'university-sheets',
    key: 'U',
    title: 'University Sheets',
    role: 'Technical communication',
    year: '2022 — 2025',
    tag: 'Academic · Documentation',
    accent: 'accent',
    summary:
      'Curated set of academic deliverable sheets — concept boards, dimensioned drawings, and process pages — used across coursework.',
    problem:
      'A clean, consistent sheet template is rare in undergraduate work. The goal: build a personal house-style for handing in projects that reads as professional out of the box and survives black-and-white printing.',
    process: [
      { title: 'Grid system', body: '12-column A3 master grid, with strict 8-pt baseline. Variants for landscape technical drawings vs. portrait concept boards.' },
      { title: 'Type & colour', body: 'Two-typeface pairing (display + neutral mono), monochrome with a single accent. Tested for legibility in print at 80% scale.' },
      { title: 'Diagram library', body: 'Reusable callouts, arrows, and exploded-view conventions kept in a central Illustrator library.' },
    ],
    technical: {
      Tooling: 'Adobe Illustrator · InDesign',
      Format: 'A3 master + A4 derivative',
    },
    outcome:
      'House-style now reused across 12+ courses. Faculty have referenced the sheets as examples of strong technical communication.',
    images: ['images/projects/university-sheets/cover.svg'],
  },

  {
    slug: 'technical-drawings',
    key: 'T',
    title: 'Technical Drawings',
    role: 'CAD · Drafting',
    year: '2022 — 2025',
    tag: 'CAD · Mechanical',
    accent: 'accent',
    summary:
      'A selection of dimensioned mechanical drawings — single parts, sub-assemblies, and full exploded views — produced to ISO standards.',
    problem:
      'Industrial design without rigorous drafting falls apart at the manufacturing handoff. This collection demonstrates clean projection conventions, tolerancing, and exploded-view discipline.',
    process: [
      { title: 'Modelling', body: 'Parts modelled parametrically in SolidWorks/Fusion 360 with feature trees structured for downstream edits.' },
      { title: 'Drafting', body: 'Drawings produced with ISO first-angle projection, layered for outlines, hidden, centreline and dimensions.' },
      { title: 'Tolerancing', body: 'GD&T applied where functional fits demand it (clearance, locational, interference). Surface finish callouts on machined faces.' },
    ],
    technical: {
      Standards: 'ISO 128 · ISO 5455 · GD&T per ISO 1101',
      Software: 'SolidWorks · Fusion 360 · AutoCAD',
      Outputs: 'PDF + DWG, A3/A2 sheets',
    },
    outcome:
      'A growing reference set used to onboard team-mates on group projects. Drawings have been used directly to brief external machinists for prototype parts.',
    images: ['images/projects/technical-drawings/cover.svg'],
  },

  {
    slug: 'intercom-study',
    key: 'I',
    title: 'Intercom Study',
    role: 'UX research · Product redesign',
    year: '2023',
    tag: 'UX · Hardware',
    accent: 'accent',
    summary:
      'A redesign study of a residential building intercom, focused on accessibility for elderly residents and visually-impaired visitors.',
    problem:
      'Standard residential intercoms cluster small buttons with low-contrast labels next to a tinny speaker. Field interviews with residents over 70 highlighted severe legibility, audio, and naming issues — frequent failed deliveries and unanswered visits.',
    process: [
      { title: 'Field study', body: 'Observed 6 buildings across two neighbourhoods; logged 14 unsuccessful intercom interactions in 3 hours. Interviewed 9 residents and 4 delivery couriers.' },
      { title: 'Heuristic teardown', body: 'Mapped the existing UI against accessibility guidelines (WCAG 2.1 contrast equivalents, button size, audio SPL).' },
      { title: 'Concept directions', body: 'Three directions: tactile-first dial, high-contrast list with haptics, and voice-led search. Reviewed with residents in storyboard form.' },
      { title: 'Resolved concept', body: 'Chosen direction: a high-contrast OLED list with a single rotary encoder, a generous push-to-call button, and an upgraded speaker module. CAD modelled and rendered.' },
    ],
    technical: {
      Display: '2.7" monochrome OLED (concept)',
      Input: 'Rotary encoder + dedicated call button',
      Audio: 'Front-facing 1.5 W speaker, MEMS mic',
      Software: 'SolidWorks · Figma · KeyShot',
    },
    outcome:
      'Concept boards + functional CAD model delivered as the final UX deliverable. Course feedback highlighted the depth of field research and the clarity of the trade-off matrix.',
    images: ['images/projects/intercom-study/cover.svg'],
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
          'Sensitivity research and competitor audit grounding the brief in real ritual, carrier constraints and material end-of-life.',
        layout: 'asymmetric',
        images: [],
      },
      {
        key: 'symbolism',
        title: 'Symbolism',
        kicker: 'Visual Code',
        description:
          'Translating memorial archetypes into a coherent symbolic language — chosen marks for closure, cycle and return.',
        layout: 'hero-detail',
        images: [],
      },
      {
        key: 'sketches',
        title: 'Sketches',
        kicker: 'Ideation',
        description:
          'Form exploration and cradle studies in graphite, marker and quick blockouts.',
        layout: 'masonry',
        images: [],
      },
      {
        key: 'plans',
        title: 'Technical Plans',
        kicker: 'Construction',
        description:
          'Dimensioned drawings, exploded views and unfold sequences for the shells, ribbon closure and outer carton.',
        layout: 'single-large',
        images: [],
      },
      {
        key: 'mockup',
        title: 'Mockup',
        kicker: 'Prototype',
        description:
          'Physical proof of concept — moulded pulp, cork rim and ribbon closure under drop-test conditions.',
        layout: 'grid-detail',
        images: [],
      },
      {
        key: 'renders',
        title: 'Renders',
        kicker: 'Visualisation',
        description:
          'Cinematic stills capturing the full packaging system in unboxing context.',
        layout: 'cinematic',
        images: [],
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
];

// Fast lookup by slug (used by /project/:slug)
export const projectBySlug = Object.fromEntries(projects.map((p) => [p.slug, p]));

// Fast lookup by uppercase key label (used by the 3D keyboard)
export const projectByKey = Object.fromEntries(
  projects.map((p) => [p.key.toUpperCase(), p])
);
