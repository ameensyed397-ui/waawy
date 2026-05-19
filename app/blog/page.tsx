import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Clock, Calendar } from "lucide-react";

export const metadata: Metadata = {
    title: "Remote Team Culture Blog | waavy",
    description: "Insights on making remote teams feel like neighbors — team visibility, centralized docs, onboarding, and culture tools for distributed companies.",
    keywords: [
        "remote team culture blog",
        "remote employee onboarding",
        "hr software for startups",
        "gusto vs rippling",
        "employee engagement",
        "distributed team tools",
    ],
    openGraph: {
        title: "Remote Team Culture Blog | waavy",
        description: "Insights on making remote teams feel like neighbors — team visibility, docs, onboarding, and culture tools.",
        url: "https://getwaawy.com/blog",
        images: [{ url: "https://getwaawy.com/og-image.jpg", width: 1200, height: 630 }],
    },
    twitter: {
        card: 'summary_large_image',
        title: "Remote Team Culture Blog | waavy",
        description: "Insights on making remote teams feel like neighbors — team visibility, docs, onboarding, and culture tools.",
        site: '@getwaawy',
        creator: '@getwaawy',
        images: ['https://getwaawy.com/og-image.jpg'],
    },
    alternates: { canonical: "https://getwaawy.com/blog" },
};

const posts = [
    {
        slug: "why-hris-makes-employees-feel-like-numbers",
        title: "Why Your HRIS Makes Employees Feel Like Numbers",
        excerpt: "Gusto and Rippling are great at payroll. But employee experience? Not so much. Here's what's missing from your HRIS and how to fix it.",
        date: "February 24, 2026",
        readTime: "8 min read",
        tag: "Employee Experience",
        tagColor: "text-[#007BFF] bg-[#007BFF]/8",
    },
    {
        slug: "complete-hr-stack-for-startups",
        title: "The Complete HR Stack for Remote Startups (2026)",
        excerpt: "Stop using one tool for everything. The best-in-class HR stack: Gusto for payroll, Waawy for people. Complete setup guide + real costs.",
        date: "February 25, 2026",
        readTime: "10 min read",
        tag: "HR Stack",
        tagColor: "text-emerald-700 bg-emerald-50",
    },
    {
        slug: "gusto-vs-rippling-comparison",
        title: "Gusto vs Rippling: Honest Comparison for Startups (2026)",
        excerpt: "Gusto or Rippling? Unbiased breakdown of pricing, features, and what BOTH are missing. Plus the fix that completes either stack.",
        date: "February 26, 2026",
        readTime: "11 min read",
        tag: "Comparison",
        tagColor: "text-amber-700 bg-amber-50",
    },
    {
        slug: "remote-employee-onboarding-guide",
        title: "How to Onboard Remote Employees (Without Them Feeling Lost)",
        excerpt: "90% of remote onboarding is broken. Here's the framework that works: pre-Day 1 prep, Week 1 structure, and 90-day milestones.",
        date: "February 27, 2026",
        readTime: "9 min read",
        tag: "Onboarding",
        tagColor: "text-purple-700 bg-purple-50",
    },
];

export default function BlogPage() {
    return (
        <main className="pt-32 pb-24 px-4">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="mb-16">
                    <span className="text-[#007BFF] font-bold uppercase tracking-wider text-xs mb-4 block">
                        <span className="font-hand font-bold" style={{ color: '#007BFF' }}>waawy</span> Blog
                    </span>
                    <h1 className="text-4xl md:text-5xl font-black text-[#101011] mb-4 leading-tight tracking-[-0.03em]">
                        Employee Experience Insights
                    </h1>
                    <p className="text-xl text-[#606266] max-w-2xl leading-relaxed">
                        Practical guides on onboarding, team culture, and building great employee experiences at remote and hybrid companies.
                    </p>
                </div>

                {/* Posts */}
                <div className="space-y-5">
                    {posts.map((post) => (
                        <Link
                            key={post.slug}
                            href={`/blog/${post.slug}`}
                            className="group block rounded-2xl bg-white border border-[#e2e5ed] hover:border-[#007BFF]/30 p-7 md:p-8 transition-all hover:shadow-sm hover:-translate-y-0.5"
                        >
                            <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-3">
                                        <span className={`text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${post.tagColor}`}>
                                            {post.tag}
                                        </span>
                                    </div>
                                    <h2 className="text-xl md:text-2xl font-bold text-[#101011] mb-3 group-hover:text-[#007BFF] transition-colors leading-snug tracking-[-0.02em]">
                                        {post.title}
                                    </h2>
                                    <p className="text-[#606266] leading-relaxed mb-4 text-base">
                                        {post.excerpt}
                                    </p>
                                    <div className="flex items-center gap-5 text-sm text-[#a7a7a7]">
                                        <span className="flex items-center gap-1.5">
                                            <Calendar className="w-3.5 h-3.5" />
                                            {post.date}
                                        </span>
                                        <span className="flex items-center gap-1.5">
                                            <Clock className="w-3.5 h-3.5" />
                                            {post.readTime}
                                        </span>
                                    </div>
                                </div>
                                <div className="hidden sm:flex items-center self-center">
                                    <ArrowRight className="w-5 h-5 text-[#a7a7a7] group-hover:text-[#007BFF] group-hover:translate-x-1 transition-all" />
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                {/* CTA */}
                <div className="mt-20 rounded-2xl bg-white border border-[#007BFF]/20 p-8 md:p-10 text-center">
                    <h3 className="text-xl md:text-2xl font-bold text-[#101011] mb-3 tracking-[-0.02em]">
                        Ready to fix your employee experience?
                    </h3>
                    <p className="text-[#606266] mb-6 max-w-md mx-auto">
                        Works with Gusto, Rippling, or any HRIS. Free forever for the first 100 companies — no credit card required.
                    </p>
                    <Link
                        href="/#waitlist"
                        className="inline-flex items-center gap-2 px-6 py-3.5 text-white rounded-xl font-bold transition-all hover:opacity-90 hover:scale-105"
                        style={{ background: 'linear-gradient(135deg, #007BFF, #0066CC)' }}
                    >
                        Join Free Beta <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>
            </div>
        </main>
    );
}
