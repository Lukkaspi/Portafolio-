#!/usr/bin/env python3
"""
Auto-crop excessive white/near-white margins around the actual content of
every PNG under public/media/urn-packaging/ (and any extra dirs passed on
the command line).

Strategy:
- Convert to grayscale.
- Treat any pixel below WHITE_THRESHOLD (default 244 / 255) as content.
- Take the bounding box of the content mask.
- Add a small symmetric margin so the crop doesn't feel claustrophobic.
- Skip files that are already tight (margin <= MIN_TRIM px on all sides).
- Save back as PNG, preserving alpha if present.

Run:
  python3 scripts/crop_urn_images.py
"""

from __future__ import annotations

import sys
from pathlib import Path

from PIL import Image, ImageOps


WHITE_THRESHOLD = 244       # 0..255: any pixel darker than this counts as content
MIN_TRIM_TO_BOTHER = 24     # don't bother re-saving if all sides trim < this
MARGIN_RATIO = 0.025        # add 2.5% of (cropped W or H) as breathing room


def find_content_bbox(img: Image.Image) -> tuple[int, int, int, int] | None:
    """Return (left, top, right, bottom) of non-white content, or None."""
    # Use grayscale for analysis. If image has alpha, anything fully
    # transparent is already content-free; treat opaque + dark as content.
    if img.mode in ("RGBA", "LA"):
        rgb = img.convert("RGB")
    else:
        rgb = img.convert("RGB")

    gray = rgb.convert("L")
    # Make a binary mask: 1 where content (darker than threshold), 0 elsewhere.
    mask = gray.point(lambda p: 255 if p < WHITE_THRESHOLD else 0)
    bbox = mask.getbbox()
    return bbox


def crop_with_margin(
    img: Image.Image, bbox: tuple[int, int, int, int]
) -> Image.Image:
    w, h = img.size
    left, top, right, bottom = bbox
    cw, ch = right - left, bottom - top
    margin = max(8, int(round(min(cw, ch) * MARGIN_RATIO)))
    nl = max(0, left - margin)
    nt = max(0, top - margin)
    nr = min(w, right + margin)
    nb = min(h, bottom + margin)
    return img.crop((nl, nt, nr, nb))


def trim_amount(bbox, size):
    w, h = size
    l, t, r, b = bbox
    return (l, t, w - r, h - b)


def process_file(path: Path) -> tuple[bool, str]:
    img = Image.open(path)
    img = ImageOps.exif_transpose(img)
    bbox = find_content_bbox(img)
    if bbox is None:
        return (False, f"empty mask, skipped: {path.name}")
    trims = trim_amount(bbox, img.size)
    if max(trims) < MIN_TRIM_TO_BOTHER:
        return (False, f"already tight: {path.name} (trims {trims})")
    cropped = crop_with_margin(img, bbox)
    # Save back as PNG. If original was RGBA, keep alpha.
    save_kwargs = {"optimize": True}
    if img.mode in ("RGBA", "LA"):
        cropped = cropped.convert("RGBA")
    cropped.save(path, "PNG", **save_kwargs)
    return (
        True,
        f"cropped {path.name}: {img.size} → {cropped.size}  trims {trims}",
    )


def main(roots: list[Path]) -> int:
    total = 0
    cropped = 0
    for root in roots:
        for png in sorted(root.rglob("*.png")):
            # Don't touch keycap textures or .gitkeep markers.
            if "keycaps" in png.parts or png.name == ".gitkeep":
                continue
            total += 1
            ok, msg = process_file(png)
            print(("✓ " if ok else "· ") + msg)
            if ok:
                cropped += 1
    print(f"\n{cropped}/{total} files cropped.")
    return 0


if __name__ == "__main__":
    if len(sys.argv) > 1:
        roots = [Path(p) for p in sys.argv[1:]]
    else:
        roots = [Path("public/media/urn-packaging")]
    sys.exit(main(roots))
