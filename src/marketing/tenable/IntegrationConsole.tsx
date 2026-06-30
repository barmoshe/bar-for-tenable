'use client';

import { useEffect, useState } from 'react';

/**
 * IntegrationConsole — a bespoke console that dramatizes the team's job: a
 * third-party source connects through the framework, assets and findings ingest,
 * the data is normalized and deduplicated, and a single exposure view (a score
 * plus ranked criticals) surfaces. It is the centerpiece of the application
 * page, built from scratch in Tenable's dark / lime palette. Pure React state +
 * one interval, no GSAP, no canvas. Under prefers-reduced-motion it renders the
 * final, resolved frame and never ticks.
 */

const ASSETS = [
  { type: 'EC2 · prod-api-07', src: 'aws-connector' },
  { type: 'S3 bucket · public-read', src: 'aws-connector' },
  { type: 'IAM role · wildcard *', src: 'aws-connector' },
  { type: 'K8s pod · CVE-2026-1188', src: 'k8s-agent' },
  { type: 'Snowflake · external share', src: 'snowflake' },
];

const STAGES = ['Connect · OAuth', 'Ingest assets', 'Normalize + dedup', 'Exposure scored'];

// Discrete timeline. The interval advances `step` and the whole UI is derived
// from it, so the animation is a pure function of one integer (easy to reason
// about, trivially resettable, and a single static value for reduced motion).
const CYCLE = 13;
const FIXED_STEP = 11; // the resolved frame reduced-motion users see
const TARGET_SCORE = 72;

function assetsVisible(step: number): number {
  // Steps 1..5 flood the ingested assets in.
  return Math.min(ASSETS.length, Math.max(0, step));
}
function assetsResolved(step: number): number {
  // From step 7 each asset is normalized, two per beat, done by step 10.
  if (step < 7) return 0;
  return Math.min(ASSETS.length, (step - 6) * 2);
}
function stageActive(step: number): number {
  // Pipeline lights up across steps 6..9 (Connect..Scored).
  if (step < 6) return -1;
  if (step >= 10) return STAGES.length; // all done
  return step - 6;
}
function phase(step: number): 'connect' | 'ingest' | 'normalize' | 'exposed' {
  if (step >= 10) return 'exposed';
  if (step >= 7) return 'normalize';
  if (step >= 2) return 'ingest';
  return 'connect';
}

function clock(step: number): string {
  const s = Math.min(step, 10) * 3; // a fast, machine-speed window
  const mm = String(Math.floor(s / 60)).padStart(2, '0');
  const ss = String(s % 60).padStart(2, '0');
  return `${mm}:${ss}`;
}

const PHASE_LABEL = {
  connect: 'CONNECT',
  ingest: 'INGEST',
  normalize: 'NORMALIZE',
  exposed: 'EXPOSED',
} as const;

const PHASE_CAPTION = {
  connect: 'Connecting the integration. Granting scoped access.',
  ingest: 'Pulling assets and findings from the source.',
  normalize: 'Normalizing and deduplicating across sources.',
  exposed: 'One exposure view. Criticals surfaced and ranked.',
} as const;

export default function IntegrationConsole() {
  const [step, setStep] = useState(FIXED_STEP);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const reduce =
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return; // hold the resolved frame, never tick

    // Kick the animation off on the client only: a stable SSR / first-paint
    // frame (the fixed step), then animate post-mount.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setAnimate(true);
    setStep(0);
    const id = setInterval(() => {
      setStep((s) => (s + 1) % CYCLE);
    }, 760);
    return () => clearInterval(id);
  }, []);

  const visible = assetsVisible(step);
  const resolved = assetsResolved(step);
  const active = stageActive(step);
  const ph = phase(step);
  const progress = Math.min(step, 10) / 10;
  const score = Math.round(progress * TARGET_SCORE);

  return (
    <div
      className="tn-console"
      data-phase={ph}
      role="img"
      aria-label="A simulated integration console moving from a connected third-party source, through ingesting and normalizing assets, to a single exposure score with the criticals surfaced."
    >
      <div className="tn-console__bar" aria-hidden="true">
        <span className="tn-console__dot" />
        <span className="tn-console__dot" />
        <span className="tn-console__dot" />
        <span className="tn-console__name">integrations // aws-connector</span>
        <span className="tn-console__clock">T+{clock(step)}</span>
      </div>

      <div className="tn-console__head" aria-hidden="true">
        <span className="tn-status" data-phase={ph}>
          <span className="tn-status__pip" />
          {PHASE_LABEL[ph]}
        </span>
        <span className="tn-console__caption">{PHASE_CAPTION[ph]}</span>
      </div>

      <div className="tn-console__body" aria-hidden="true">
        {/* Ingested assets — the raw data */}
        <div className="tn-stream">
          <p className="tn-stream__label">INGESTED ASSETS</p>
          <ul className="tn-stream__list">
            {ASSETS.map((a, i) => {
              const isVisible = i < visible;
              const isResolved = i < resolved;
              return (
                <li
                  key={a.type}
                  className="tn-asset"
                  data-on={isVisible}
                  data-resolved={isResolved}
                >
                  <span className="tn-asset__icon">{isResolved ? '✓' : '•'}</span>
                  <span className="tn-asset__type">{a.type}</span>
                  <span className="tn-asset__src">{a.src}</span>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Framework pipeline + exposure gauge — the unified view */}
        <div className="tn-pipe">
          <p className="tn-stream__label">FRAMEWORK PIPELINE</p>
          <ol className="tn-pipe__list">
            {STAGES.map((s, i) => (
              <li
                key={s}
                className="tn-pipe__step"
                data-state={i < active ? 'done' : i === active ? 'active' : 'idle'}
              >
                <span className="tn-pipe__node" />
                <span className="tn-pipe__name">{s}</span>
              </li>
            ))}
          </ol>

          <div className="tn-gauge">
            <div className="tn-gauge__head">
              <span className="tn-gauge__label">Exposure score</span>
              <span className="tn-gauge__score">{score}<small>/100</small></span>
            </div>
            <div className="tn-gauge__track">
              <span className="tn-gauge__fill" style={{ inlineSize: `${score}%` }} />
            </div>
            <p className="tn-gauge__meta">
              {resolved}/{ASSETS.length} assets unified · 2 critical surfaced
              {animate ? '' : ' · static preview'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
