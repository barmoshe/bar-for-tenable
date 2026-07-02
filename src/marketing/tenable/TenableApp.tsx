'use client';

import { useRef } from 'react';
import { gsap, useGSAP, FULL_MOTION_QUERY } from '../../lib/gsap';
import TenableMark from './TenableMark';
import IntegrationConsole from './IntegrationConsole';
import './marketing-base.css';
import './tenable.css';

/**
 * TenableApp — an ad-hoc, personalized application page for Bar Moshe's
 * "Full Stack Engineer, Integrations Frameworks" application to Tenable (Tel
 * Aviv, Tenable One). Rebuilt to look like the real tenable.com AI-era brand: a
 * dark charcoal surface, the lime/chartreuse accent, white type, and the
 * signature rotating heptagon "octogram" mark that collapses into a solid
 * hexagon as you scroll the hero (GSAP ScrollTrigger). It speaks the team's own
 * language (integration frameworks, data ingestion, AI-driven workflows, one
 * exposure view) and makes the case for Bar in Tenable's brand.
 *
 * English, LTR. Self-contained: mounts `.mp-root` only to inherit the marketing
 * reset / focus base, then overrides everything via `.tn-root`. No LangProvider,
 * no shared #work emulators, no i18n coupling: every visual here is built fresh
 * for this application. All motion is gated on prefers-reduced-motion and the
 * page is fully legible with no JS.
 */

const EMAIL =
  'mailto:1barmoshe1@gmail.com?subject=Full%20Stack%20Engineer%2C%20Integrations%20Frameworks%20application%20from%20Bar%20Moshe';
const CV = '/Bar_Moshe_Resume.pdf';

type Proof = {
  tag: string;
  title: string;
  desc: string;
  /** Absent = credential-only card (employer IP, no public link). */
  href?: string;
};

const PROOF: Proof[] = [
  { tag: 'Open source · AI tooling', title: 'MDP', desc: 'Open-source Markdown compiler on npm: one source becomes decks, pages, and docs. Ships with an MCP server and Claude Code and Codex plugins.', href: 'https://barmoshe.github.io/mdp/' },
  { tag: 'Current role · Full stack + DevOps', title: 'Joomsy', desc: 'Primary full-stack and DevOps engineer at Joomsy, an early-stage startup. I ship features from design to deploy and run them in production on EKS with Terraform and CI/CD.' },
  { tag: 'Backend · Durable workflows', title: 'Temporal Data Service', desc: 'Cross-language data processing on Temporal: Go, Python, and TypeScript workers in one durable workflow. Featured on Temporal Code Exchange.', href: 'https://temporal.io/code-exchange/cross-language-data-processing-service-with-temporal' },
  { tag: 'AI agents · Durable workflows', title: 'Temporal plugin', desc: 'A Temporal.io plugin for Claude Code: durable, retryable workflows for AI agents. Other developers install it.', href: 'https://github.com/Base67-AI/temporal-plugin' },
  { tag: 'AI · Pipeline', title: 'MIDI GPT REST API', desc: 'A REST API that generates MIDI: a multi-step Temporal pipeline across three languages, calling OpenAI with retries and validation.', href: 'https://github.com/barmoshe/AI_MIDI_API' },
  { tag: 'Open source · AI video', title: 'Catalogue Orchestrator', desc: 'A local-first AI video orchestrator: RAG over a clip catalogue plans an edit, and a deterministic ffmpeg compiler renders the cut.', href: 'https://barmoshe.github.io/catalogue-orchestrator/' },
  { tag: 'AI agents · Systems', title: 'Creative Harness', desc: 'An open AI-agent harness for Claude Code: skills, hooks, and tooling for shipping production work fast.', href: 'https://github.com/barmoshe/claude-creative-stack' },
  { tag: 'Open source · Toolkit', title: 'entailer', desc: 'An open-source logic-validity toolkit: checks whether an argument actually follows. Public packages on npm.', href: 'https://github.com/barmoshe/entailer' },
  { tag: 'Product · Web app', title: 'Apartment Hunter', desc: 'A real-estate decision tool: side-by-side comparison, Israeli purchase-tax brackets, a full mortgage calculator. Shipped solo.', href: 'https://apartment-hunter-one.vercel.app' },
];

type Fit = { k: string; lead: string; body: string };

const FIT: Fit[] = [
  {
    k: 'Full stack across the seam',
    lead: 'React + TypeScript over Node, Go, and Python.',
    body: 'I ship the whole feature: a React and TypeScript UI on top of services I also write. At Joomsy I do this daily, from the API design to the UI it powers, as one job, not two.',
  },
  {
    k: 'Frameworks others extend',
    lead: 'MCP server, editor plugins, a plan-mode hook.',
    body: 'MDP ships with an MCP server plus Claude Code and Codex plugins, so other tools and agents extend it. That is this role: building the framework other teams plug into.',
  },
  {
    k: 'Data ingestion and distributed systems',
    lead: 'Durable pipelines, cloud-native, end to end.',
    body: 'My Temporal service ingests work across Go, Python, and TypeScript workers behind one durable workflow. I reason about data flow and performance from source to store, on Kubernetes and EKS.',
  },
  {
    k: 'Production-first, browser to data layer',
    lead: 'Owned design through deploy, then run it.',
    body: 'At Joomsy, an early-stage startup, I am the primary full-stack and DevOps engineer. I own features from design to deploy, run them on EKS with Terraform and CI/CD (Wix DevOps track), and debug from browser devtools to the logs.',
  },
];

export default function TenableApp() {
  const scope = useRef<HTMLDivElement | null>(null);
  const heroRef = useRef<HTMLElement | null>(null);

  useGSAP(
    () => {
      if (!matchMedia(FULL_MOTION_QUERY).matches) return;

      // Hero entrance: clip-reveal the copy block, staggered.
      gsap.from('.tn-hero__copy > [data-rise]', {
        yPercent: 18,
        opacity: 0,
        duration: 0.9,
        ease: 'power3.out',
        stagger: 0.1,
        delay: 0.08,
      });

      // Signature scroll move: as the hero scrolls away, the open octogram rings
      // spin down and fade while the solid hexagon scales in — tenable.com's mark
      // morph, tied to scroll progress.
      const hero = heroRef.current;
      if (hero) {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: hero,
            start: 'top top',
            end: 'bottom 35%',
            scrub: 0.6,
          },
        });
        tl.to('.tn-mark--hero .tn-mark__rings', {
          opacity: 0.1,
          scale: 0.6,
          rotate: 150,
          transformOrigin: '50% 50%',
          ease: 'none',
        }, 0)
          .fromTo(
            '.tn-mark--hero .tn-mark__solid',
            { opacity: 0, scale: 0.55, transformOrigin: '50% 50%' },
            { opacity: 1, scale: 1, ease: 'none' },
            0,
          )
          .to('.tn-hero__visual', { yPercent: -8, ease: 'none' }, 0);
      }

      // Section reveals: fade-up each marked block as it enters.
      const reveals = gsap.utils.toArray<HTMLElement>('[data-reveal]');
      reveals.forEach((el) => {
        gsap.from(el, {
          y: 26,
          opacity: 0,
          duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 86%' },
        });
      });
    },
    { scope },
  );

  return (
    <div className="mp-root tn-root" ref={scope}>
      <a className="tn-skip" href="#main">Skip to content</a>

      {/* ── Top navigation ──────────────────────────────────── */}
      <header className="tn-nav">
        <div className="tn-nav__inner">
          <a className="tn-brand" href="#main" aria-label="Bar Moshe">
            <TenableMark className="tn-nav__mark" />
            <span className="tn-wordmark">Bar Moshe</span>
          </a>
          <span className="tn-nav__tag">for Tenable</span>
          <nav className="tn-nav__links" aria-label="Sections">
            <a className="tn-nav__link" href="#demo">Demo</a>
            <a className="tn-nav__link" href="#work">Work</a>
            <a className="tn-nav__link" href="#fit">Why me</a>
          </nav>
          <div className="tn-nav__cta">
            <a className="tn-btn tn-btn--ghost tn-btn--sm" href={CV} target="_blank" rel="noopener noreferrer">Download CV</a>
            <a className="tn-btn tn-btn--primary tn-btn--sm" href={EMAIL}>
              <span className="tn-nav__full">Email me</span>
              <span className="tn-nav__short">Email</span>
            </a>
          </div>
        </div>
      </header>

      <main id="main" tabIndex={-1}>
        {/* ── Hero (dark, signature octogram) ───────────────── */}
        <section className="tn-hero" ref={heroRef}>
          <div className="tn-hero__visual" aria-hidden="true">
            <TenableMark variant="hero" />
          </div>
          <div className="tn-hero__inner">
            <div className="tn-hero__copy">
              <p className="tn-eyebrow" data-rise>
                <span className="tn-eyebrow__dot" />
                INTEGRATIONS FRAMEWORKS · TENABLE ONE · TEL AVIV
              </p>
              <h1 className="tn-title" data-rise>
                Bar Moshe, applying for{' '}
                <span className="tn-hl">Integrations Frameworks.</span>
              </h1>
              <p className="tn-lede" data-rise>
                Full stack engineer. React and TypeScript over Node, Go, and Python.
                I have shipped data-ingestion pipelines, developer-facing frameworks,
                and production systems I own from design to deploy. The work is below,
                mapped to this role.
              </p>
              <div className="tn-hero__cta" data-rise>
                <a className="tn-btn tn-btn--primary" href={EMAIL}>
                  Email me
                  <span className="tn-btn__arrow" aria-hidden="true">→</span>
                </a>
                <a className="tn-btn tn-btn--ghost" href={CV} target="_blank" rel="noopener noreferrer">
                  Download CV
                </a>
              </div>
              <p className="tn-hero__trust" data-rise>
                <strong>Tel Aviv</strong> · React + TypeScript · Go / Python / Node · Available for interviews
              </p>
            </div>
          </div>
          <span className="tn-hero__scroll" aria-hidden="true">scroll</span>
        </section>

        {/* ── Trust strip ───────────────────────────────────── */}
        <div className="tn-trust">
          <div className="tn-trust__inner">
            <span className="tn-trust__item"><b>MCP server</b> for Claude Code &amp; Codex</span>
            <span className="tn-trust__sep" />
            <span className="tn-trust__item">Open source, <b>on npm</b></span>
            <span className="tn-trust__sep" />
            <span className="tn-trust__item">Featured on <b>Temporal Code Exchange</b></span>
            <span className="tn-trust__sep" />
            <span className="tn-trust__item">React · TypeScript · Go · Python</span>
          </div>
        </div>

        {/* ── Signature piece: from integration to exposure ─── */}
        <section id="demo" className="tn-section tn-section--soft">
          <div className="tn-wrap">
            <header className="tn-section__head" data-reveal>
              <p className="tn-kicker">From integration to exposure</p>
              <h2 className="tn-h2">A working demo of the job itself.</h2>
              <p className="tn-sub">
                A source connects, assets ingest, the data is normalized and deduplicated,
                and one exposure view renders. Built from scratch for this page.
              </p>
            </header>
            <div data-reveal>
              <IntegrationConsole />
            </div>
          </div>
        </section>

        {/* ── Proof of work ─────────────────────────────────── */}
        <section id="work" className="tn-section">
          <div className="tn-wrap">
            <header className="tn-section__head" data-reveal>
              <p className="tn-kicker">Selected work</p>
              <h2 className="tn-h2">What I have shipped.</h2>
              <p className="tn-sub">
                Every card links to the live thing. Joomsy stays unlinked: that code
                belongs to my employer.
              </p>
            </header>
            <div className="tn-proof__grid">
              {PROOF.map((p) =>
                p.href ? (
                  <a
                    key={p.title}
                    className="tn-pcard"
                    href={p.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-reveal
                  >
                    <div className="tn-pcard__body">
                      <span className="tn-pcard__tag">{p.tag}</span>
                      <h3 className="tn-pcard__title">{p.title}</h3>
                      <p className="tn-pcard__desc">{p.desc}</p>
                      <span className="tn-pcard__link" aria-hidden="true">View ↗</span>
                    </div>
                  </a>
                ) : (
                  <article key={p.title} className="tn-pcard tn-pcard--static" data-reveal>
                    <div className="tn-pcard__body">
                      <span className="tn-pcard__tag">{p.tag}</span>
                      <h3 className="tn-pcard__title">{p.title}</h3>
                      <p className="tn-pcard__desc">{p.desc}</p>
                      <span className="tn-pcard__note">Private codebase</span>
                    </div>
                  </article>
                ),
              )}
            </div>
            <p className="tn-proof__more">
              More in{' '}
              <a href="https://github.com/barmoshe" target="_blank" rel="noopener noreferrer">
                my portfolio
              </a>
              .
            </p>
          </div>
        </section>

        {/* ── Why Bar, for this role ────────────────────────── */}
        <section id="fit" className="tn-section tn-section--soft">
          <div className="tn-wrap">
            <header className="tn-section__head" data-reveal>
              <p className="tn-kicker">Experience, mapped to the role</p>
              <h2 className="tn-h2">What the posting asks for, and where I have done it.</h2>
            </header>
            <div className="tn-fit__grid">
              {FIT.map((f, i) => (
                <article className="tn-fcard" key={f.k} data-reveal>
                  <span className="tn-fcard__no" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
                  <h3 className="tn-fcard__k">{f.k}</h3>
                  <p className="tn-fcard__lead">{f.lead}</p>
                  <p className="tn-fcard__body">{f.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA band (lime) ───────────────────────────────── */}
        <section className="tn-cta">
          <div className="tn-cta__inner" data-reveal>
            <TenableMark className="tn-cta__mark" />
            <h2 className="tn-cta__title">Let’s talk.</h2>
            <p className="tn-cta__sub">
              I would be glad to interview for this role. Here is how to reach me.
            </p>
            <div className="tn-cta__links">
              <a className="tn-btn tn-btn--oninvert" href={EMAIL}>Email me</a>
              <a className="tn-btn tn-btn--oninvert-ghost" href="https://www.linkedin.com/in/barmoshe/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
              <a className="tn-btn tn-btn--oninvert-ghost" href="https://github.com/barmoshe" target="_blank" rel="noopener noreferrer">GitHub</a>
              <a className="tn-btn tn-btn--oninvert-ghost" href={CV} target="_blank" rel="noopener noreferrer">Download CV</a>
            </div>
          </div>
        </section>
      </main>

      {/* ── Footer (dark) ───────────────────────────────────── */}
      <footer className="tn-footer">
        <div className="tn-footer__inner">
          <div className="tn-footer__brand">
            <span className="tn-footer__mark">
              <TenableMark className="tn-nav__mark" />
              <span className="tn-wordmark">tenable</span>
            </span>
            <p className="tn-footer__tag">
              An application page Bar Moshe built in Tenable’s brand for the Full Stack
              Engineer, Integrations Frameworks role in Tel Aviv. Not affiliated with Tenable.
            </p>
          </div>
          <div className="tn-footer__col">
            <p className="tn-footer__h">The work</p>
            <ul>
              <li><a className="tn-footer__link" href="https://barmoshe.github.io/mdp/" target="_blank" rel="noopener noreferrer">MDP + MCP server</a></li>
              <li><a className="tn-footer__link" href="https://temporal.io/code-exchange/cross-language-data-processing-service-with-temporal" target="_blank" rel="noopener noreferrer">Temporal Code Exchange</a></li>
              <li><a className="tn-footer__link" href="https://github.com/barmoshe" target="_blank" rel="noopener noreferrer">GitHub</a></li>
            </ul>
          </div>
          <div className="tn-footer__col">
            <p className="tn-footer__h">Get in touch</p>
            <ul>
              <li><a className="tn-footer__link" href={EMAIL}>1barmoshe1@gmail.com</a></li>
              <li><a className="tn-footer__link" href="https://www.linkedin.com/in/barmoshe/" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
              <li><a className="tn-footer__link" href={CV} target="_blank" rel="noopener noreferrer">Download CV</a></li>
            </ul>
          </div>
        </div>
        <div className="tn-footer__bottom">
          <div className="tn-footer__bottom-inner">
            <span>Built by Bar Moshe, in Tenable’s brand, for this application.</span>
            <span>Tel Aviv · 2026</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
