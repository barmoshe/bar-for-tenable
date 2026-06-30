'use client';

/**
 * TenableMark — Tenable's signature "octogram": several regular heptagons drawn
 * as stroked outlines, rotated against each other into a spirograph ring, plus a
 * solid hexagon hidden underneath. On tenable.com the open ring slowly rotates
 * and, on scroll, collapses into the solid hexagon. We reproduce that here:
 *
 * - `.tn-mark__rings` spins continuously (pure CSS, per-ring speeds/directions).
 * - `.tn-mark__solid` is the filled hexagon the hero scroll-timeline cross-fades
 *   in (driven by GSAP in TenableApp; it just toggles opacity/scale on these two
 *   groups, so the mark degrades to the open ring with no JS).
 *
 * Reduced motion: the spin is disabled in tenable.css and the hero never builds
 * its ScrollTrigger, so the mark renders as a calm static ring.
 *
 * `variant="hero"` is the large animated lockup; the default is the small static
 * brandmark used in the nav, footer, and CTA.
 */

// Regular heptagon (7-gon), r≈42 about (50,50), first vertex at the top.
const HEPTAGON =
  '50,8 82.8,23.8 90.9,59.3 68.2,87.8 31.8,87.8 9.1,59.3 17.2,23.8';
// Regular hexagon (6-gon), pointy-top, r≈34 about (50,50).
const HEXAGON = '50,16 79.4,33 79.4,67 50,84 20.6,67 20.6,33';

export default function TenableMark({
  variant = 'brand',
  className,
}: {
  variant?: 'brand' | 'hero';
  className?: string;
}) {
  const cls = ['tn-mark', `tn-mark--${variant}`, className]
    .filter(Boolean)
    .join(' ');
  return (
    <svg className={cls} viewBox="0 0 100 100" aria-hidden="true" focusable="false">
      <g className="tn-mark__rings">
        <polygon className="tn-mark__ring tn-mark__ring--1" points={HEPTAGON} />
        <polygon className="tn-mark__ring tn-mark__ring--2" points={HEPTAGON} />
        <polygon className="tn-mark__ring tn-mark__ring--3" points={HEPTAGON} />
      </g>
      <polygon className="tn-mark__solid" points={HEXAGON} />
    </svg>
  );
}
