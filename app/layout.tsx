import type { Metadata } from "next";
import { Inter, Caveat } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";

// Satoshi is loaded via CDN in globals.css for optimal performance
// Inter is used for body text and UI components

const inter = Inter({
    subsets: ["latin"],
    variable: "--font-inter",
    display: "swap",
});

const caveat = Caveat({
    subsets: ["latin"],
    variable: "--font-hand",
    display: "swap",
    weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
    title: {
        default: "waavy — Makes Remote Teams Feel Like Neighbors",
        template: "%s | waavy"
    },
    description: "waavy makes remote teams feel like neighbors. Visual team map, centralized docs, project visibility, and culture tools to make your distributed team actually connect.",
    keywords: [
        "employee experience platform",
        "employee experience software",
        "remote employee onboarding",
        "hr software for startups",
        "employee engagement platform",
        "gusto integration",
        "rippling integration",
        "bamboohr integration",
        "team culture software",
        "employee recognition platform",
    ],
    authors: [{ name: "Waawy" }],
    creator: "Waawy",
    publisher: "Waawy",
    formatDetection: {
        email: false,
        address: false,
        telephone: false,
    },
    metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'https://getwaawy.com'),
    openGraph: {
        title: "Waawy — Onboarding Infrastructure for Remote Teams",
        description: "Your HRIS handles payroll. Waawy handles people. Automated onboarding, knowledge capture, and team connections.",
        url: '/',
        siteName: 'Waawy',
        locale: 'en_US',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: "Waawy — Onboarding Infrastructure for Remote Teams",
        description: "Your HRIS handles payroll. Waawy handles people. Automated onboarding, knowledge capture, and team connections.",
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
    icons: {
        icon: '/favicon.svg',
        shortcut: '/favicon.svg',
        apple: '/apple-touch-icon.png',
    },
    manifest: '/site.webmanifest',
};

const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
        {
            "@type": "Organization",
            "name": "Waawy",
            "legalName": "Waawy Inc",
            "url": "https://getwaawy.com",
            "logo": "https://getwaawy.com/logo.svg",
            "email": "hello@getwaawy.com",
            "sameAs": [
                "https://twitter.com/getwaawy"
            ],
            "description": "Onboarding infrastructure for remote teams. Your HRIS handles payroll — Waawy handles the people side: automated onboarding, knowledge capture, team connections, and manager enablement.",
            "founder": {
                "@type": "Person",
                "name": "Waawy Team"
            }
        },
        {
            "@type": "WebSite",
            "name": "Waawy",
            "url": "https://getwaawy.com"
        },
        {
            "@type": "SoftwareApplication",
            "name": "Waawy",
            "applicationCategory": "BusinessApplication",
            "applicationSubCategory": "Human Resources",
            "operatingSystem": "Web Browser",
            "offers": {
                "@type": "Offer",
                "price": "10",
                "priceCurrency": "USD",
                "priceSpecification": {
                    "@type": "UnitPriceSpecification",
                    "price": "10",
                    "priceCurrency": "USD",
                    "unitText": "per employee per month"
                },
                "description": "30 days free trial, then $10 per employee per month"
            },
            "description": "Onboarding infrastructure for remote teams that works with Gusto, Rippling, BambooHR, ADP, or any HRIS. Automates access, knowledge, connection, and manager nudges so new hires succeed in their first 90 days.",
            "featureList": [
                "Pre-Day 1 onboarding — welcome video and team intros before Day 1",
                "Access automation — Pre-Day 1 checklist with auto-reminders for Slack, GitHub, Notion",
                "Knowledge capture — answers from Slack become permanent docs automatically",
                "Connection infrastructure — auto-scheduled coffee chats and onboarding buddy assignment",
                "Manager enablement — at-risk signals and 90-day check-in nudges",
                "HRIS integrations — Gusto, Rippling, BambooHR, ADP, or CSV upload",
                "Magic link access — no app downloads or extra passwords for employees"
            ],
            "url": "https://getwaawy.com"
        }
    ]
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <ClerkProvider>
            <html lang="en" suppressHydrationWarning>
                <head>
                    <link rel="preconnect" href="https://api.fontshare.com" />
                    <link rel="dns-prefetch" href="https://api.fontshare.com" />
                    <script
                        type="application/ld+json"
                        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
                    />
                </head>
                <body className={`${inter.variable} ${caveat.variable} antialiased`}>
                    {children}
                </body>
            </html>
        </ClerkProvider>
    );
}
