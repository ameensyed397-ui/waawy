import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Calendar, Clock } from 'lucide-react';

export const metadata: Metadata = {
    title: "The Complete HR Stack for Remote Startups (2026) | waavy Blog",
    description: "Stop using one tool for everything. The best-in-class HR stack for remote startups: Gusto for payroll, waavy for making your team feel like neighbors. Complete setup guide + real costs.",
    alternates: { canonical: 'https://getwaawy.com/blog/complete-hr-stack-for-startups' },
    openGraph: {
        title: "The Complete HR Stack for Remote Startups (2026)",
        description: "Stop using one tool for everything. Gusto for payroll, waavy for making remote teams feel connected.",
        url: 'https://getwaawy.com/blog/complete-hr-stack-for-startups',
        type: 'article',
    },
};

const stack = [
    { category: "Payroll & Compliance", tool: "Gusto", cost: "~$6–12/employee/mo", why: "Best-in-class payroll, benefits, and compliance for US teams. Easy to set up, great support." },
    { category: "Employee Experience", tool: "Waawy", cost: "Free (beta) → $10/employee/mo", why: "Onboarding, recognition, team connections. Works on top of your HRIS — no migration needed." },
    { category: "Communication", tool: "Slack", cost: "~$7.25/user/mo", why: "Async-first communication, channels by team/project, integrates with everything." },
    { category: "Documentation", tool: "Notion", cost: "~$8–15/user/mo", why: "Company wiki, runbooks, onboarding docs. Replace your Google Drive chaos." },
    { category: "Project Management", tool: "Linear", cost: "~$8/user/mo", why: "For engineering teams. Clean, fast, opinionated. Non-eng teams can use Notion instead." },
];

export default function BlogPost() {
    return (
        <main className="pt-32 pb-24 px-4">
            <div className="max-w-2xl mx-auto">
                <Link href="/blog" className="inline-flex items-center gap-2 text-sm text-[#606266] hover:text-[#007BFF] transition-colors mb-10">
                    <ArrowLeft className="w-4 h-4" /> Back to blog
                </Link>

                <div className="mb-10">
                    <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full text-emerald-700 bg-emerald-50">
                        HR Stack
                    </span>
                    <h1 className="text-3xl md:text-4xl font-black text-[#101011] mt-4 mb-4 leading-tight tracking-[-0.03em]">
                        The Complete HR Stack for Remote Startups (2026)
                    </h1>
                    <div className="flex items-center gap-5 text-sm text-[#a7a7a7]">
                        <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /> February 25, 2026</span>
                        <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> 10 min read</span>
                    </div>
                </div>

                <article className="prose prose-lg max-w-none text-[#3a3a3a] leading-relaxed space-y-6">
                    <p className="text-xl text-[#606266] leading-relaxed font-medium">
                        Stop using one tool for everything. The best-in-class HR stack separates payroll from people ops — and it&apos;s cheaper and more effective than any all-in-one platform.
                    </p>

                    <h2 className="text-2xl font-black text-[#101011] tracking-[-0.02em] mt-10 mb-4">The all-in-one trap</h2>
                    <p>
                        Every few months, a new &quot;all-in-one&quot; HR platform promises to replace your entire stack. Payroll, benefits, performance, culture, engagement — all in one dashboard. It sounds great. It rarely works.
                    </p>
                    <p>
                        The reason is simple: building a great payroll engine and building a great culture product require completely different product philosophies. Payroll needs to be precise, compliant, and invisible. Culture needs to be warm, human, and proactive. Companies that try to do both tend to do neither particularly well.
                    </p>
                    <p>
                        The winning approach for remote startups in 2026: use best-in-class tools for each job, and make sure they work together.
                    </p>

                    <h2 className="text-2xl font-black text-[#101011] tracking-[-0.02em] mt-10 mb-4">The stack</h2>
                    <div className="space-y-4 my-6">
                        {stack.map((item) => (
                            <div key={item.tool} className="rounded-2xl bg-white border border-[#e2e5ed] p-6">
                                <div className="flex items-start justify-between gap-4 mb-2">
                                    <div>
                                        <p className="text-xs font-bold text-[#a7a7a7] uppercase tracking-wider mb-1">{item.category}</p>
                                        <p className="text-lg font-black text-[#101011]">{item.tool}</p>
                                    </div>
                                    <span className="text-xs font-semibold text-[#007BFF] bg-[#007BFF]/8 px-2.5 py-1 rounded-full whitespace-nowrap">{item.cost}</span>
                                </div>
                                <p className="text-sm text-[#606266]">{item.why}</p>
                            </div>
                        ))}
                    </div>

                    <h2 className="text-2xl font-black text-[#101011] tracking-[-0.02em] mt-10 mb-4">Total cost for a 20-person remote team</h2>
                    <p>
                        Let&apos;s do the maths for a 20-person fully remote startup:
                    </p>
                    <div className="rounded-2xl bg-[#f0f2f6] border border-[#e2e5ed] p-6 my-6">
                        <div className="space-y-3">
                            {[
                                ["Gusto (payroll)", "~$200–240/mo"],
                                ["Waawy (employee experience)", "Free during beta"],
                                ["Slack (communication)", "~$145/mo"],
                                ["Notion (docs)", "~$160–300/mo"],
                                ["Linear or Notion (projects)", "~$160/mo"],
                            ].map(([tool, cost]) => (
                                <div key={tool} className="flex items-center justify-between text-sm">
                                    <span className="text-[#606266]">{tool}</span>
                                    <span className="font-bold text-[#101011]">{cost}</span>
                                </div>
                            ))}
                            <div className="border-t border-[#e2e5ed] pt-3 flex items-center justify-between">
                                <span className="font-bold text-[#101011]">Total</span>
                                <span className="font-black text-[#007BFF]">~$665–885/mo</span>
                            </div>
                        </div>
                    </div>
                    <p>
                        That&apos;s roughly <strong>$33–44 per employee per month</strong> for a complete people operations stack. For a company with 20 employees, that&apos;s less than 0.1% of payroll — and it&apos;s the infrastructure that determines whether those employees stay or leave.
                    </p>

                    <h2 className="text-2xl font-black text-[#101011] tracking-[-0.02em] mt-10 mb-4">How the Waawy + HRIS integration works</h2>
                    <p>
                        When you connect Waawy to your HRIS, it syncs employee names, start dates, and org structure via read-only API. Setup takes about 2 minutes. From there, Waawy uses that data to:
                    </p>
                    <ul className="list-none space-y-2 my-4">
                        {[
                            "Trigger personalised onboarding journeys automatically on each employee's start date",
                            "Surface connection opportunities between employees who haven't met yet",
                            "Send recognition prompts to managers based on tenure milestones",
                            "Track culture health metrics you can't see in your HRIS",
                        ].map((item) => (
                            <li key={item} className="flex items-start gap-3">
                                <span className="text-[#007BFF] font-bold mt-0.5">→</span>
                                <span>{item}</span>
                            </li>
                        ))}
                    </ul>
                    <p>
                        No migration. No disruption to your existing payroll setup. It just adds the experience layer your HRIS is missing.
                    </p>

                    <div className="mt-12 rounded-2xl bg-[#f0f2f6] border border-[#007BFF]/20 p-8">
                        <p className="text-xs font-bold text-[#007BFF] uppercase tracking-widest mb-3">Free Beta — First 100 Companies</p>
                        <h3 className="text-xl font-black text-[#101011] mb-2 tracking-[-0.02em]">Complete your HR stack — free during beta</h3>
                        <p className="text-[#606266] mb-5 text-sm">Works with Gusto, Rippling, BambooHR. Free forever for the first 100 companies.</p>
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
