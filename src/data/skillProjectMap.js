// Maps each Spline keycap (skill name from Naresh-Khatri's scene) to one of
// our portfolio projects. The keycap's icon stays as the original skill icon
// (we don't have the Spline source to relabel them); only the hover tooltip
// and the click destination are project-specific.
//
// The remaining ~15 skill keys without a project mapping get a generic
// "Coming Soon" tooltip and no navigation.

export const skillToProject = {
  react: 'cupra',                 // featured / centred-ish
  nodejs: 'microplastics-filter',
  docker: 'aparcat',
  ts: 'uab-hackathon',
  css: 'car-sketches',
  wordpress: 'university-sheets',
  postgres: 'technical-drawings',
  linux: 'intercom-study',
  firebase: 'urn-packaging',
  aws: 'dam-beverage',
};

// Reverse lookup if ever needed.
export const projectToSkill = Object.fromEntries(
  Object.entries(skillToProject).map(([k, v]) => [v, k])
);
