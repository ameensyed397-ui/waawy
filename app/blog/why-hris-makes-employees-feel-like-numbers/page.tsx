import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Calendar, Clock } from 'lucide-react';

export const metadata: Metadata = {
    title: "Why Your HRIS Makes Employees Feel Like Numbers | waavy Blog",
    description: "Your HRIS is great at compliance. It's terrible at culture. Here's why the tools that run payroll were never designed to make remote teams feel connected — and what to do about it.",
    alternates: { canonical: 'https://getwaawy.com/blog/why-hris-makes-employees-feel-like-numbers' },
    openGraph: {
        title: "Why Your HRIS Makes Employees Feel Like Numbers",
        description: "Your HRIS is great at compliance. It's terrible at culture. Here's the fix for remote teams.",
        url: 'https://getwaawy.com/blog/why-hris-makes-employees-feel-like-numbers',
        type: 'article',
    },
};

export default function BlogPost() {
    return (
        <main className="pt-32 pb-24 px-4">
            <div className="max-w-2xl mx-auto">
                {/* Back */}
                <Link href="/blog" className="inline-flex items-center gap-2 text-sm text-[#606266] hover:text-[#007BFF] transition-colors mb-10">
                    <ArrowLeft className="w-4 h-4" /> Back to blog
                </Link>

                {/* Header */}
                <div className="mb-10">
                    <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full text-[#007BFF] bg-[#007BFF]/8">
                        Employee Experience
                    </span>
                    <h1 className="text-3xl md:text-4xl font-black text-[#101011] mt-4 mb-4 leading-tight tracking-[-0.03em]">
                        Why Your HRIS Makes Employees Feel Like Numbers
                    </h1>
                    <div className="flex items-center gap-5 text-sm text-[#a7a7a7]">
                        <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /> February 24, 2026</span>
                        <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> 8 min read</span>
                    </div>
                </div>

                {/* Article */}
                <article className="prose prose-lg max-w-none text-[#3a3a3a] leading-relaxed space-y-6">
                    <p className="text-xl text-[#606266] leading-relaxed font-medium">
                        Your HRIS is great at compliance. It&apos;s terrible at culture. Here&apos;s why the tools that run payroll were never designed to make employees feel valued — and what to do about it.
                    </p>

                    <h2 className="text-2xl font-black text-[#101011] tracking-[-0.02em] mt-10 mb-4">The HRIS was built for HR, not employees</h2>
                    <p>
                        Gusto, Rippling, BambooHR — these are powerful tools. They handle payroll, benefits, compliance, and time-tracking with remarkable precision. But there&apos;s one thing they were never built to do: make your employees feel like they belong.
                    </p>
                    <p>
                        Think about the last time an employee logged into your HRIS voluntarily. Not to check a pay stub or update a tax form — but just because they wanted to. It probably never happened. And that&apos;s not a failure of your HRIS. It&apos;s by design. These tools are transactional, and transactions don&apos;t build culture.
                    </p>

                    <h2 className="text-2xl font-black text-[#101011] tracking-[-0.02em] mt-10 mb-4">The onboarding gap</h2>
                    <p>
                        The problem starts on Day 1. A new hire joins your company. They receive a Gusto invite to set up direct deposit. They fill in their SSN, bank routing number, and emergency contact. Then they wait.
                    </p>
                    <p>
                        That&apos;s not an onboarding experience. That&apos;s paperwork. The difference matters enormously — research from the Brandon Hall Group found that organisations with strong onboarding improve new hire retention by <strong>82%</strong> and productivity by over 70%.
                    </p>
                    <p>
                        But most companies&apos; &quot;onboarding&quot; is really just HRIS setup. Meet the team in Slack (if you&apos;re lucky). Figure out the rest yourself.
                    </p>

                    <h2 className="text-2xl font-black text-[#101011] tracking-[-0.02em] mt-10 mb-4">Recognition lives in nobody&apos;s software</h2>
                    <p>
                        Ask yourself: where do you recognise employees today? Maybe a Slack message. Maybe a mention in an all-hands. Maybe nothing at all — because there&apos;s no system for it, so it happens inconsistently.
                    </p>
                    <p>
                        Your HRIS tracks performance reviews, but performance reviews happen once or twice a year. Recognition needs to happen weekly. The gap between annual reviews and day-to-day appreciation is where culture dies.
                    </p>
                    <p>
                        Studies consistently show that employees who feel recognised are <strong>63% more likely to stay</strong> at their current job. Yet most companies invest heavily in HRIS and almost nothing in recognition infrastructure.
                    </p>

                    <h2 className="text-2xl font-black text-[#101011] tracking-[-0.02em] mt-10 mb-4">The data your HRIS doesn&apos;t collect</h2>
                    <p>
                        Your HRIS knows when someone was hired, their salary, their benefits elections, and their PTO balance. It doesn&apos;t know:
                    </p>
                    <ul className="list-none space-y-2 my-6">
                        {[
                            "Whether a new hire has actually met anyone outside their immediate team",
                            "Which employee is quietly disengaging after 6 months",
                            "Whether your remote team feels connected or isolated",
                            "Who the informal culture carriers are in your organisation",
                        ].map((item) => (
                            <li key={item} className="flex items-start gap-3">
                                <span className="text-[#007BFF] font-bold mt-0.5">→</span>
                                <span>{item}</span>
                            </li>
                        ))}
                    </ul>
                    <p>
                        These are the leading indicators of retention and culture health. They&apos;re invisible to your HRIS because your HRIS was built to process transactions, not measure belonging.
                    </p>

                    <h2 className="text-2xl font-black text-[#101011] tracking-[-0.02em] mt-10 mb-4">The fix isn&apos;t switching HRIS</h2>
                    <p>
                        Some companies respond to this by switching tools entirely — chasing the &quot;all-in-one&quot; platform that does payroll AND culture. It rarely works. The platforms that do payroll well tend to do culture poorly, and vice versa.
                    </p>
                    <p>
                        The better approach is a layer approach: keep your HRIS for what it&apos;s great at (payroll, compliance, benefits), and add a dedicated employee experience layer on top. One that syncs with your HRIS data but focuses entirely on the human side.
                    </p>
                    <p>
                        That&apos;s the problem Waawy is designed to solve. It connects to Gusto, Rippling, or BambooHR — pulling employee data — and uses it to power onboarding journeys, team connections, and recognition that actually feels human.
                    </p>

                    <div className="mt-12 rounded-2xl bg-[#f0f2f6] border border-[#007BFF]/20 p-8">
                        <p className="text-xs font-bold text-[#007BFF] uppercase tracking-widest mb-3">Free Beta — First 100 Companies</p>
                        <h3 className="text-xl font-black text-[#101011] mb-2 tracking-[-0.02em]">Add the experience layer your HRIS is missing</h3>
                        <p className="text-[#606266] mb-5 text-sm">Works with Gusto, Rippling, BambooHR. Free forever for the first 100 companies. No credit card.</p>
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
