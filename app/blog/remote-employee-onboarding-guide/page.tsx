import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Calendar, Clock } from 'lucide-react';

export const metadata: Metadata = {
    title: "How to Onboard Remote Employees (Without Them Feeling Lost) | waavy Blog",
    description: "90% of remote onboarding is broken. Here's the framework that makes new hires feel like neighbors, not strangers: pre-Day 1 prep, Week 1 structure, and 90-day milestones.",
    alternates: { canonical: 'https://getwaawy.com/blog/remote-employee-onboarding-guide' },
    openGraph: {
        title: "How to Onboard Remote Employees (Without Them Feeling Lost)",
        description: "90% of remote onboarding is broken. Here's the framework that makes new hires feel like neighbors.",
        url: 'https://getwaawy.com/blog/remote-employee-onboarding-guide',
        type: 'article',
    },
};

const phases = [
    {
        phase: "Pre-Day 1",
        timing: "1–2 weeks before",
        color: "text-[#007BFF] bg-[#007BFF]/8",
        items: [
            "Send a welcome email the day offer is signed — not the day before they start",
            "Ship their equipment so it arrives 3+ days before Day 1",
            "Set up all accounts (email, Slack, GitHub, Notion) before they touch a computer",
            "Assign an onboarding buddy — someone outside their immediate team",
            "Share the 30/60/90 day plan so they know what success looks like",
        ],
    },
    {
        phase: "Week 1",
        timing: "Days 1–5",
        color: "text-emerald-700 bg-emerald-50",
        items: [
            "Day 1 should be social, not administrative — save paperwork for Day 2",
            "Schedule 15-min intro calls with 5–8 key people across the company",
            "Give them one small, completable task — early wins matter enormously",
            "Daily check-in from their manager (5 minutes, no agenda required)",
            "End-of-week retrospective: what went well, what was confusing",
        ],
    },
    {
        phase: "Days 30–60",
        timing: "Month 1–2",
        color: "text-purple-700 bg-purple-50",
        items: [
            "First 1:1 review — are they meeting the goals set in the 30/60/90 plan?",
            "Cross-functional project or collaboration (break the silo early)",
            "Ask: 'What would have made your onboarding better?' — and actually change it",
            "Introduce them to senior leadership outside their direct chain",
        ],
    },
    {
        phase: "Day 90",
        timing: "3-month mark",
        color: "text-amber-700 bg-amber-50",
        items: [
            "Formal 90-day review — honest, two-way conversation",
            "Confirm they feel connected to the team and understand the mission",
            "Transition from structured onboarding to ongoing career development",
            "Celebrate — 90 days is a milestone worth acknowledging",
        ],
    },
];

export default function BlogPost() {
    return (
        <main className="pt-32 pb-24 px-4">
            <div className="max-w-2xl mx-auto">
                <Link href="/blog" className="inline-flex items-center gap-2 text-sm text-[#606266] hover:text-[#007BFF] transition-colors mb-10">
                    <ArrowLeft className="w-4 h-4" /> Back to blog
                </Link>

                <div className="mb-10">
                    <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full text-purple-700 bg-purple-50">
                        Onboarding
                    </span>
                    <h1 className="text-3xl md:text-4xl font-black text-[#101011] mt-4 mb-4 leading-tight tracking-[-0.03em]">
                        How to Onboard Remote Employees (Without Them Feeling Lost)
                    </h1>
                    <div className="flex items-center gap-5 text-sm text-[#a7a7a7]">
                        <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /> February 27, 2026</span>
                        <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> 9 min read</span>
                    </div>
                </div>

                <article className="prose prose-lg max-w-none text-[#3a3a3a] leading-relaxed space-y-6">
                    <p className="text-xl text-[#606266] leading-relaxed font-medium">
                        90% of remote onboarding is broken. Most companies confuse &quot;onboarding&quot; with &quot;paperwork&quot; and wonder why new hires disengage by month three. Here&apos;s what actually works.
                    </p>

                    <h2 className="text-2xl font-black text-[#101011] tracking-[-0.02em] mt-10 mb-4">Why remote onboarding usually fails</h2>
                    <p>
                        In an office, onboarding has a hidden advantage: proximity. New hires absorb culture by osmosis — they see how people interact, they hear the informal conversations, they get pulled into lunch. None of that happens remotely.
                    </p>
                    <p>
                        Remote onboarding has to be <strong>intentionally designed</strong> to replicate what offices provide accidentally. Most companies don&apos;t do this. They send a laptop, add someone to Slack, throw them into 8 hours of tool tutorials, and call it done.
                    </p>
                    <p>
                        The result: new hires who feel isolated, confused about priorities, and disconnected from the team they just joined. Research from Glassdoor found that a strong onboarding programme improves new hire retention by 82% — which tells you what weak onboarding costs.
                    </p>

                    <h2 className="text-2xl font-black text-[#101011] tracking-[-0.02em] mt-10 mb-4">The 90-day framework</h2>
                    <p>Good remote onboarding isn&apos;t a week — it&apos;s a 90-day programme. Here&apos;s what each phase should include:</p>

                    <div className="space-y-5 my-6">
                        {phases.map((phase) => (
                            <div key={phase.phase} className="rounded-2xl bg-white border border-[#e2e5ed] p-6">
                                <div className="flex items-center gap-3 mb-4">
                                    <span className={`text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${phase.color}`}>
                                        {phase.phase}
                                    </span>
                                    <span className="text-sm text-[#a7a7a7]">{phase.timing}</span>
                                </div>
                                <ul className="space-y-2">
                                    {phase.items.map((item) => (
                                        <li key={item} className="flex items-start gap-3 text-sm text-[#606266]">
                                            <span className="text-[#007BFF] font-bold mt-0.5 flex-shrink-0">→</span>
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>

                    <h2 className="text-2xl font-black text-[#101011] tracking-[-0.02em] mt-10 mb-4">The onboarding buddy: your most underused asset</h2>
                    <p>
                        Almost every company has a buddy system on paper. Almost none implement it well. A good onboarding buddy isn&apos;t just a name on a doc — they&apos;re someone who:
                    </p>
                    <ul className="list-none space-y-2 my-4">
                        {[
                            "Proactively checks in, not just responds when asked",
                            "Is comfortable enough to share the informal norms (how meetings really work, who to go to for what)",
                            "Is outside the new hire's direct team — cross-functional perspective matters",
                            "Gets 30 minutes blocked in their calendar every week for the first month",
                        ].map((item) => (
                            <li key={item} className="flex items-start gap-3">
                                <span className="text-[#007BFF] font-bold mt-0.5">→</span>
                                <span>{item}</span>
                            </li>
                        ))}
                    </ul>

                    <h2 className="text-2xl font-black text-[#101011] tracking-[-0.02em] mt-10 mb-4">How to automate the parts that should be automated</h2>
                    <p>
                        Not everything in onboarding needs to be manual. The administrative parts — equipment ordering, account provisioning, paperwork — should be automated so your team focuses on the human parts that can&apos;t be.
                    </p>
                    <p>
                        Waawy integrates with your HRIS (Gusto, Rippling, BambooHR) and automatically triggers onboarding journeys on each employee&apos;s start date. Intro sequences, buddy assignments, check-in reminders, milestone celebrations — all run automatically, so your managers can focus on actual conversations rather than workflow management.
                    </p>

                    <div className="mt-12 rounded-2xl bg-[#f0f2f6] border border-[#007BFF]/20 p-8">
                        <p className="text-xs font-bold text-[#007BFF] uppercase tracking-widest mb-3">Free Beta — First 100 Companies</p>
                        <h3 className="text-xl font-black text-[#101011] mb-2 tracking-[-0.02em]">Automate the onboarding framework above</h3>
                        <p className="text-[#606266] mb-5 text-sm">Works with Gusto, Rippling, BambooHR. Triggers automatically on each hire&apos;s start date. Free during beta.</p>
                        <Link
                            href="/#waitlist"
                            className="inline-flex items-center gap-2 px-5 py-2.5 text-white rounded-xl font-bold text-sm transition-all hover:opacity-90"
                            style={{ background: 'linear-gradient(135deg, #007BFF, #38b0fc)' }}
                        >
                            Join Free Beta →
                        </Link>
                    </div>
                </article>
            </div>
        </main>
    );
}
