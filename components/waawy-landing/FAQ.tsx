'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const faqs = [
    {
        q: "How is this different from Notion?",
        a: "Notion is a documentation tool. You organize everything manually, and it becomes a graveyard in 3 months. Waawy is an employee portal — we organize everything FOR you, plus gamification, team map, coffee roulette, and recognition. Think: Notion = filing cabinet. Waawy = interactive experience."
    },
    {
        q: "How is this different from Slack?",
        a: "Slack is a communication tool. Information gets lost in threads forever. Waawy is an information hub — everything is searchable, organized, and permanent. We integrate WITH Slack (send notifications), but we're not replacing it."
    },
    {
        q: "Is this just for onboarding?",
        a: "Nope. Onboarding is one quest line. But Waawy is useful daily: need a doc? Search Waawy. Want to know who does what? Check the team map. Want to connect? Coffee roulette. Want to recognize someone? Give a power-up. It's an ongoing experience, not a one-time thing."
    },
    {
        q: "Do employees actually use gamification?",
        a: "Yes — when done right. Bad gamification is forced, corporate, and cringe. Waawy's system is opt-in (not forced), friendly (not competitive leaderboards), and meaningful (badges reflect real contributions). Our beta users report 78% daily active usage. That's unheard of for HR software."
    },
    {
        q: "What if my team thinks this is too 'childish'?",
        a: "Fair concern. Two points: 1) Our design is playful, not childish — think Stripe (friendly), not Fisher-Price (kids). 2) Your team is already playing games: Wordle, Duolingo, Strava. Why not make work more engaging? If your team prefers boring spreadsheets, Waawy isn't for them. But most people appreciate fun."
    },
    {
        q: "How long does setup take?",
        a: "15 minutes. 1) Upload team list (CSV or connect Gusto/Rippling) — 2 min. 2) Import docs (connect Notion/Drive) — 5 min. 3) Customize world map (pick theme) — 5 min. 4) Invite team — 1 min. Done. Employees onboard themselves from there."
    },
    {
        q: "Can we customize the look?",
        a: "Yes. Upload your logo, choose your world theme (mountain, beach, space, forest, city), customize avatar styles, create custom badges, and set your brand colors. Make it yours."
    },
    {
        q: "What about security?",
        a: "SOC 2 Type II compliant (in progress). End-to-end encryption. SSO available (Google, Okta). Granular permissions (control who sees what). GDPR compliant. Your data is yours — we don't sell it or train AI on it."
    },
    {
        q: "Can we try it first?",
        a: "Yes. 30-day free trial. No credit card. (Or join the beta and get free forever if you're in the first 100.)"
    },
    {
        q: "What if we outgrow it?",
        a: "Waawy scales from 10 to 200 people easily. Beyond 200? We'll work with you on custom pricing and features. But honestly, most teams in our range stay there for years."
    },
];

export const FAQ = () => {
    const [open, setOpen] = useState<number | null>(null);

    return (
        <section className="py-24 bg-[#f0f2f6]">
            <div className="container mx-auto px-4 max-w-3xl">
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-14"
                >
                    <p className="text-xs font-bold text-[#007BFF] uppercase tracking-[0.1em] mb-4">FAQ</p>
                    <h2 className="text-3xl md:text-5xl font-black tracking-[-0.03em] text-[#101011] mb-3">
                        Questions?{' '}
                        <span className="font-hand font-bold" style={{ color: '#007BFF', fontSize: '1em' }}>Answered.</span>
                    </h2>
                    <p className="text-base text-[#606266]">Everything you need to know about <span className="font-hand font-bold" style={{ color: '#007BFF' }}>waawy</span>.</p>
                </motion.div>

                <div className="space-y-2">
                    {faqs.map((faq, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 16 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: i * 0.06 }}
                            className="rounded-2xl overflow-hidden border border-[#e2e5ed] bg-white hover:border-[#007BFF]/30 transition-colors duration-200"
                        >
                            <button
                                onClick={() => setOpen(open === i ? null : i)}
                                className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-[#f0f2f6] transition-colors duration-150"
                            >
                                <span className="font-bold text-base text-[#101011] pr-4 tracking-[-0.01em]">{faq.q}</span>
                                <ChevronDown
                                    className={`w-4 h-4 flex-shrink-0 transition-transform duration-200 ${open === i ? 'rotate-180' : ''}`}
                                    style={{ color: '#007BFF' }}
                                />
                            </button>
                            <AnimatePresence>
                                {open === i && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.2 }}
                                        className="overflow-hidden"
                                    >
                                        <p className="px-6 pb-5 text-base text-[#606266] leading-relaxed">{faq.a}</p>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};
