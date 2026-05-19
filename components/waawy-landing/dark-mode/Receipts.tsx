'use client';

import { motion } from 'framer-motion';

const timeline = [
    {
        label: 'Day 1',
        without: [
            '📧 "Check email for 17 different links"',
            '📁 "Notion is... somewhere?"',
            '💬 "Slack has 47 channels. Which one?"',
            '😰 Lost before lunch',
        ],
        with: [
            '🗺️ Open Waawy → see team world map',
            '🎯 Start "Welcome Quest" (7 tasks)',
            '☕ Auto-matched coffee chat with buddy',
            '😊 Actually excited',
        ],
    },
    {
        label: 'Week 1',
        without: [
            '❓ "Where\'s the benefits doc?" (asked 3 times)',
            '🤷 "Who does what?" (still don\'t know)',
            '📝 "Company values?" (never found them)',
            '😔 Feels like a contractor',
        ],
        with: [
            '⚡ Completed 3 quests → unlocked badges',
            '🤝 Met 8 people across departments',
            '📚 Found every doc in 3 seconds (search is magic)',
            '🎉 Gave 2 kudos, received 1 (dopamine hit)',
        ],
    },
    {
        label: 'Week 4',
        without: [
            '👤 Still haven\'t met anyone outside immediate team',
            '🔍 Still searching for basic docs',
            '😐 Work is just... work',
            '💼 Updates LinkedIn',
        ],
        with: [
            '🏆 Level 5 unlocked',
            '☕ 15 coffee chats completed (know half the company)',
            '💬 Teammates feel like actual humans',
            '🚀 Loves working here',
        ],
    },
];

const fadeUp = {
    initial: { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
};

export const Receipts = () => {
    return (
        <section id="why" className="py-24 md:py-32 px-4 bg-[#f0f2f6]">
            <div className="max-w-5xl mx-auto">
                <motion.div {...fadeUp} transition={{ duration: 0.5 }} className="text-center mb-16">
                    <p className="text-xs font-bold text-[#007BFF] uppercase tracking-[0.1em] mb-4">Before / After</p>
                    <h2 className="text-3xl md:text-5xl font-black tracking-[-0.03em] text-[#101011] mb-2 leading-tight">
                        Same company.{' '}
                        <span className="font-hand font-bold" style={{ color: '#007BFF', fontSize: '1em' }}>Different experience.</span>
                    </h2>
                    <p className="text-base text-[#606266] mt-4">See what changes when work actually feels like an adventure.</p>
                </motion.div>

                {/* Column headers */}
                <div className="grid grid-cols-[80px_1fr_1fr] gap-3 mb-4 px-1">
                    <div />
                    <div className="rounded-xl bg-red-50 border border-red-200 px-4 py-2 text-center">
                        <p className="text-xs font-bold text-red-600 uppercase tracking-[0.08em]">Without Waawy</p>
                    </div>
                    <div className="rounded-xl px-4 py-2 text-center" style={{ background: '#007BFF12', border: '1px solid #007BFF30' }}>
                        <p className="text-xs font-bold uppercase tracking-[0.08em]" style={{ color: '#007BFF' }}>With Waawy</p>
                    </div>
                </div>

                {/* Timeline rows */}
                <div className="space-y-3">
                    {timeline.map((row, idx) => (
                        <motion.div
                            key={idx}
                            {...fadeUp}
                            transition={{ duration: 0.45, delay: idx * 0.08 }}
                            className="grid grid-cols-[80px_1fr_1fr] gap-3 items-start"
                        >
                            {/* Label */}
                            <div className="flex items-center justify-center pt-4">
                                <span className="text-xs font-bold text-[#a7a7a7] uppercase tracking-[0.08em]">{row.label}</span>
                            </div>

                            {/* Without */}
                            <div className="rounded-2xl bg-white border border-red-100 p-5">
                                <div className="space-y-1.5">
                                    {row.without.map((line, i) => (
                                        <p key={i} className="text-sm text-[#606266] leading-snug">{line}</p>
                                    ))}
                                </div>
                            </div>

                            {/* With */}
                            <div className="rounded-2xl bg-white border border-[#007BFF20] p-5" style={{ boxShadow: '0 0 0 1px #007BFF15' }}>
                                <div className="space-y-1.5">
                                    {row.with.map((line, i) => (
                                        <p key={i} className="text-sm text-[#606266] leading-snug">{line}</p>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Cost comparison */}
                <motion.div
                    {...fadeUp}
                    transition={{ duration: 0.5, delay: 0.35 }}
                    className="grid md:grid-cols-2 gap-4 mt-10"
                >
                    <div className="rounded-2xl bg-white border border-red-100 p-6 text-center">
                        <p className="text-xs font-semibold text-red-500 uppercase tracking-[0.08em] mb-2">Cost of scattered chaos</p>
                        <p className="text-2xl font-black text-[#101011] tracking-[-0.02em]">$50,000</p>
                        <p className="text-sm text-[#a7a7a7] mt-1">to replace one resignation</p>
                    </div>
                    <div
                        className="rounded-2xl p-6 text-center relative overflow-hidden"
                        style={{ background: 'linear-gradient(135deg, #007BFF, #0066CC)' }}
                    >
                        <div className="absolute top-0 right-0 w-32 h-32 rounded-full blur-2xl opacity-20"
                            style={{ background: '#38b0fc', transform: 'translate(20%, -20%)' }} />
                        <p className="text-xs text-white/60 font-semibold uppercase tracking-[0.08em] mb-2 relative">With Waawy</p>
                        <p className="text-2xl font-black text-white tracking-[-0.02em] relative">$8<span className="text-base font-normal text-white/60">/employee/month</span></p>
                        <p className="text-xs text-white/50 mt-1 relative">Prevent 1 resignation = 5+ years of Waawy</p>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};
