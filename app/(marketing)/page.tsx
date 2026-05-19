import { FeaturePreview } from "@/components/waawy-landing/dark-mode/FeaturePreview";
import { Header } from "@/components/waawy-landing/dark-mode/Header";
import { Hero } from "@/components/waawy-landing/dark-mode/Hero";
import { HowItWorks } from "@/components/waawy-landing/dark-mode/HowItWorks";
import { Manifesto } from "@/components/waawy-landing/dark-mode/Manifesto";
import { PainSection } from "@/components/waawy-landing/dark-mode/PainSection";
import { Receipts } from "@/components/waawy-landing/dark-mode/Receipts";
import { Validation } from "@/components/waawy-landing/dark-mode/Validation";
import { WaitlistCTA } from "@/components/waawy-landing/dark-mode/WaitlistCTA";
import { FAQ } from "@/components/waawy-landing/FAQ";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "waavy — Makes Remote Teams Feel Like Neighbors, Not Strangers",
    description: "waavy makes remote teams feel like neighbors. Visual team map (see everyone), centralized docs (find everything), project visibility (know what's happening), and culture tools (actually connect).",
    keywords: [
        "employee portal",
        "gamified onboarding",
        "employee experience platform",
        "remote team culture",
        "team engagement software",
        "employee onboarding software",
        "knowledge management",
        "team directory",
        "coffee roulette",
        "employee recognition software",
        "hr software for startups",
        "remote team onboarding",
        "employee retention software",
        "free onboarding software",
        "startup hr tools",
    ],
    alternates: {
        canonical: 'https://getwaawy.com',
    },
    openGraph: {
        title: "waavy — Makes Remote Teams Feel Like Neighbors, Not Strangers",
        description: "Visual team map, centralized docs, project visibility, and culture tools to make your distributed team actually connect.",
        url: 'https://getwaawy.com',
        siteName: 'Waawy',
        locale: 'en_US',
        type: 'website',
    },

    twitter: {
        card: 'summary_large_image',
        title: "Waawy — The Employee Portal Your Team Actually Wants to Use",
        description: "Turn scattered Notion/Slack/Drive chaos into one beautiful, gamified experience. Team map, quests, badges, coffee roulette. Free for first 100 companies.",
        site: '@getwaawy',
        creator: '@getwaawy',
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
};

const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
        {
            "@type": "Question",
            "name": "How is Waawy different from Notion?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Notion is a documentation tool — you organize everything manually, and it becomes a graveyard in 3 months. Waawy is an employee portal — we organize everything FOR you, plus gamification, team map, coffee roulette, and recognition. Think: Notion = filing cabinet. Waawy = interactive experience."
            }
        },
        {
            "@type": "Question",
            "name": "Is this just for onboarding?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Nope. Onboarding is one quest line. But Waawy is useful daily: need a doc? Search Waawy. Want to know who does what? Check the team map. Want to connect? Coffee roulette. Want to recognize someone? Give a power-up. It's an ongoing experience, not a one-time thing."
            }
        },
        {
            "@type": "Question",
            "name": "Do employees actually use gamification?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes — when done right. Waawy's system is opt-in (not forced), friendly (not competitive leaderboards), and meaningful (badges reflect real contributions). Our beta users report 78% daily active usage. That's unheard of for HR software."
            }
        },
        {
            "@type": "Question",
            "name": "How long does setup take?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "15 minutes. Upload team list (CSV or connect Gusto/Rippling) — 2 min. Import docs (connect Notion/Drive) — 5 min. Customize world map (pick theme) — 5 min. Invite team — 1 min. Done. Employees onboard themselves from there."
            }
        },
        {
            "@type": "Question",
            "name": "What about security?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "SOC 2 Type II compliant (in progress). End-to-end encryption. SSO available (Google, Okta). Granular permissions. GDPR compliant. Your data is yours — we don't sell it or train AI on it."
            }
        },
        {
            "@type": "Question",
            "name": "Can we try it first?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes. 30-day free trial. No credit card. Or join the beta and get free forever if you're in the first 100 companies."
            }
        }
    ]
};

export default function WaawyLandingPage() {
    return (
        <main className="min-h-screen bg-[#f0f2f6] text-[#101011] font-sans">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
            />
            <Header />
            <Hero />
            <PainSection />
            <Receipts />
            <FeaturePreview />
            <HowItWorks />
            <Validation />
            <FAQ />
            <WaitlistCTA />
            <Manifesto />
        </main>
    );
}
