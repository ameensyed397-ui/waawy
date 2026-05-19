'use client';

import { motion } from 'framer-motion';

const steps = [
    {
        num: '01',
        title: 'Visual team map',
        subtitle: 'see everyone',
        body: 'Your entire team visualized as a world you can explore. Click on anyone to see their profile. Not a boring spreadsheet — a visual, memorable experience.',
        color: '#007BFF',
        bg: '#007BFF0d',
    },
    {
        num: '02',
        title: 'Centralized docs',
        subtitle: 'find everything',
        body: 'All your scattered docs in one searchable, beautiful place. Replaces 17 Notion workspaces and Google Drive folders. Find anything in 3 seconds.',
        color: '#0066CC',
        bg: '#0066CC0d',
    },
    {
        num: '03',
        title: 'Project visibility',
        subtitle: 'know what\'s happening',
        body: 'See what everyone is working on without asking for status updates. Cross-department transparency that makes remote work actually work.',
        color: '#0ea5e9',
        bg: '#0ea5e90d',
    },
    {
        num: '04',
        title: 'Culture tools',
        subtitle: 'actually connect',
        body: 'Coffee roulette, quests, and recognition that feels real. Public feeds and animated celebrations that compound your culture automatically.',
        color: '#22c55e',
        bg: '#22c55e0d',
    },
];

export const HowItWorks = () => {
    return (
        <section id="how-it-works" className="py-24 md:py-32 px-4 bg-[#f0f2f6]">
            <div className="max-w-5xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-16"
                >
                    <p className="text-xs font-bold text-[#007BFF] uppercase tracking-[0.1em] mb-4">How</p>
                    <h2 className="text-3xl md:text-5xl font-black tracking-[-0.03em] text-[#101011] leading-tight">
                        <span className="font-hand font-bold" style={{ color: '#007BFF', fontSize: '1.1em' }}>
                            waavy
                        </span>{' '}
                        makes remote teams feel like<br />
                        neighbors, not strangers.
                    </h2>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {steps.map((step, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 28 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-30px' }}
                            transition={{ duration: 0.5, delay: idx * 0.09 }}
                            whileHover={{ y: -3, transition: { duration: 0.2 } }}
                            className="rounded-2xl bg-white border border-[#e2e5ed] p-7 hover:border-[#007BFF]/25 hover:shadow-sm transition-all duration-300"
                        >
                            <div
                                className="inline-flex items-center justify-center w-10 h-10 rounded-xl mb-5"
                                style={{ background: step.bg }}
                            >
                                <span
                                    className="font-hand font-bold text-xl leading-none"
                                    style={{ color: step.color }}
                                >
                                    {step.num}
                                </span>
                            </div>
                            <div className="flex items-center gap-2 mb-2.5 flex-wrap">
                                <h3 className="text-lg font-bold text-[#101011] tracking-[-0.02em]">{step.title}</h3>
                                <span className="text-[10px] font-bold text-[#a7a7a7] uppercase tracking-[0.06em] px-2 py-0.5 rounded-full bg-[#f0f2f6] border border-[#e2e5ed]">{step.subtitle}</span>
                            </div>
                            <p className="text-base text-[#606266] leading-relaxed">{step.body}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};
