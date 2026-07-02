import { ImageResponse } from 'next/og';

// Dynamic share card for the /tenable application page, matching the page's
// tenable.com look: a deep Tenable-Navy surface (#041E42), the turquoise accent,
// the faceted diamond mark, the lowercase "tenable" wordmark, and a turquoise
// base strip. Rendered at build time by next/og (Satori), so it uses a
// flexbox-only subset of CSS and plain hex colours. Next colocates this file
// with the route and wires the og:image / twitter:image tags automatically.

export const alt =
  'Bar Moshe, applying for Full Stack Engineer, Integrations Frameworks at Tenable. Shipped work, mapped to the role.';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

// The Tenable diamond, as four triangular facets meeting at the centre.
function Diamond({ size: s = 46 }: { size?: number }) {
  return (
    <svg width={s} height={s} viewBox="0 0 32 32">
      <polygon points="16,2 2,16 16,16" fill="#32e6d6" />
      <polygon points="16,2 30,16 16,16" fill="#00c4b3" />
      <polygon points="2,16 16,30 16,16" fill="#00a294" />
      <polygon points="30,16 16,30 16,16" fill="#0bd0bf" />
    </svg>
  );
}

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: '#041e42',
          fontFamily: 'sans-serif',
        }}
      >
        {/* Main panel */}
        <div
          style={{
            flex: '1',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            padding: '64px 72px 48px',
            backgroundImage:
              'radial-gradient(760px 460px at 90% 2%, rgba(0,196,179,0.20), transparent 60%), radial-gradient(620px 420px at 0% 100%, rgba(11,80,140,0.40), transparent 60%)',
          }}
        >
          {/* Brand row */}
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Diamond size={44} />
            <div style={{ display: 'flex', fontSize: 40, fontWeight: 700, color: '#ffffff', marginLeft: 14, letterSpacing: '-0.02em' }}>
              tenable
            </div>
            <div
              style={{
                display: 'flex',
                marginLeft: 18,
                padding: '8px 16px',
                borderRadius: 999,
                border: '1px solid rgba(0,196,179,0.55)',
                backgroundColor: 'rgba(0,196,179,0.10)',
                fontSize: 22,
                fontWeight: 700,
                color: '#32e6d6',
              }}
            >
              Bar Moshe · Application
            </div>
          </div>

          {/* Headline */}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div
              style={{
                display: 'flex',
                fontSize: 66,
                fontWeight: 700,
                color: '#ffffff',
                letterSpacing: '-0.03em',
                lineHeight: 1.06,
                maxWidth: '1010px',
              }}
            >
              Bar Moshe, applying for Integrations Frameworks.
            </div>
            <div style={{ display: 'flex', fontSize: 31, color: '#9fb3c8', marginTop: '22px', maxWidth: '940px', lineHeight: 1.35 }}>
              Full stack engineer. React and TypeScript over Node, Go, and Python. Shipped work, mapped to this role.
            </div>
          </div>

          {/* Foot meta */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: 26, color: '#7f93a8' }}>
            <div style={{ display: 'flex' }}>github.com/barmoshe</div>
            <div style={{ display: 'flex', fontWeight: 700, color: '#32e6d6' }}>Full Stack Engineer · Integrations Frameworks</div>
          </div>
        </div>

        {/* Turquoise base strip */}
        <div
          style={{
            display: 'flex',
            height: '14px',
            background: 'linear-gradient(90deg, #00a294 0%, #00c4b3 50%, #32e6d6 100%)',
          }}
        />
      </div>
    ),
    { ...size },
  );
}
