// 60% QWERTY-ish layout. Each row is an array of keys.
// `w` is width in standard 1U units. Default 1.
// `label` is the visible cap glyph; case is preserved for display.
// The 3D Key component matches a project by uppercasing the label and
// looking it up in projectByKey from data/projects.js.

export const layout = [
  // Row 1 — number row
  [
    { label: 'Esc' },
    { label: '1' },
    { label: '2' },
    { label: '3' },
    { label: '4' },
    { label: '5' },
    { label: '6' },
    { label: '7' },
    { label: '8' },
    { label: '9' },
    { label: '0' },
    { label: '-' },
    { label: '=' },
    { label: '⌫', w: 2, sub: 'Back' },
  ],
  // Row 2
  [
    { label: 'Tab', w: 1.5 },
    { label: 'Q' },
    { label: 'W' },
    { label: 'E' },
    { label: 'R' },
    { label: 'T' },
    { label: 'Y' },
    { label: 'U' },
    { label: 'I' },
    { label: 'O' },
    { label: 'P' },
    { label: '[' },
    { label: ']' },
    { label: '\\', w: 1.5 },
  ],
  // Row 3 — home row
  [
    { label: 'Caps', w: 1.75 },
    { label: 'A' },
    { label: 'S' },
    { label: 'D' },
    { label: 'F' },
    { label: 'G' },
    { label: 'H' },
    { label: 'J' },
    { label: 'K' },
    { label: 'L' },
    { label: ';' },
    { label: "'" },
    { label: '⏎', w: 2.25, sub: 'Enter' },
  ],
  // Row 4
  [
    { label: '⇧', w: 2.25, sub: 'Shift' },
    { label: 'Z' },
    { label: 'X' },
    { label: 'C' },
    { label: 'V' },
    { label: 'B' },
    { label: 'N' },
    { label: 'M' },
    { label: ',' },
    { label: '.' },
    { label: '/' },
    { label: '⇧', w: 2.75, sub: 'Shift' },
  ],
  // Row 5 — bottom row
  [
    { label: 'Ctrl', w: 1.25 },
    { label: 'Win', w: 1.25 },
    { label: 'Alt', w: 1.25 },
    { label: 'Space', w: 6.25 },
    { label: 'Alt', w: 1.25 },
    { label: 'Fn', w: 1.25 },
    { label: 'Menu', w: 1.25 },
    { label: 'Ctrl', w: 1.25 },
  ],
];
