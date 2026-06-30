import type { Metadata } from "next";
import { Sora, Inter, JetBrains_Mono } from "next/font/google";
import TenableApp from "@/src/marketing/tenable/TenableApp";

// Type trio chosen to read like tenable.com: Sora for display (a clean,
// slightly geometric grotesque close to Tenable's confident enterprise
// headline type), Inter for body, and JetBrains Mono for the dashboard
// metrics / connector labels. Exposed as --font-tn-* for tenable.css.
const display = Sora({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-tn-display",
  display: "swap",
});
const body = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-tn-body",
  display: "swap",
});
const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-tn-mono",
  display: "swap",
});

// Ad-hoc, personalized application page for Bar Moshe's "Full Stack Engineer,
// Integrations Frameworks" application to Tenable (Tel Aviv, Tenable One). Built
// in Tenable's own visual language (Tenable Navy #041E42, the turquoise accent,
// the diamond mark, mono connector labels). A private, shareable link sent to
// the Tenable team, so robots noindex.
const ogTitle = "Bar Moshe × Tenable · Integrations Frameworks";
const ogDescription =
  "Bar Moshe, full-stack engineer. Integration frameworks, data-ingestion pipelines, and the frontends on top, across React/TypeScript, Go, Python, and Node. A few things I have shipped, mapped to this role.";

// noindex (private, shareable link) but a rich share card still renders for
// direct shares (email / DM / LinkedIn). The og:image / twitter:image tags are
// generated from the colocated opengraph-image.tsx; here we set the copy, card
// type, and handle so the preview reads correctly.
export const metadata: Metadata = {
  title: ogTitle,
  description: ogDescription,
  robots: { index: false, follow: false },
  openGraph: {
    type: "website",
    siteName: "Bar Moshe",
    title: ogTitle,
    description: ogDescription,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    site: "@barmoshe1",
    creator: "@barmoshe1",
    title: ogTitle,
    description: ogDescription,
  },
};

export default function TenablePage() {
  return (
    <div className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <TenableApp />
    </div>
  );
}
