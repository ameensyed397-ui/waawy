'use client';

import { motion } from 'framer-motion';

const problems = [
    {
        icon: '🗂️',
        title: 'Where The Hell Is Anything?',
        color: '#ef4444',
        bg: '#fef2f2',
        border: '#fecaca',
        timeline: [
            '9:00am: "Where\'s the company handbook?" — Searches Notion. Not there.',
            '9:30am: "How do I submit expenses?" — Asks in Slack. Gets link. Loses it.',
            '10:00am: "What\'s our PTO policy?" — Checks email. Nothing. Asks manager. Waits.',
            '11:00am: "Who handles payroll questions?" — Scrolls through 50 names. No idea.',
        ],
        why: 'Information scattered across Notion, Drive, Slack, and email. No single source of truth.',
        cost: 'By noon: Frustrated, overwhelmed, already Googling "is this normal?"',
        fix: 'One search bar that finds EVERYTHING. New hires get answers in 3 seconds, not 3 Slack messages.',
    },
    {
        icon: '😔',
        title: 'I Don\'t Know Anyone',
        color: '#007BFF',
        bg: '#eff6ff',
        border: '#bfdbfe',
        timeline: [
            'Week 1: Met immediate team on Zoom. Everyone on mute. Cameras off.',
            'Week 2: Still don\'t know what Marketing does. Or Sales. Or Ops.',
            'Week 4: Worked here a month. Had zero real conversations.',
            'Week 8: Feels like a contractor. Not a teammate.',
        ],
        why: 'No water cooler. No hallway chats. No structured way to meet people across teams.',
        cost: '40% consider quitting in first 90 days',
        fix: 'Team world map + coffee roulette + connection quests. Nobody feels invisible.',
    },
    {
        icon: '😴',
        title: 'Everything Is SO Boring',
        color: '#f59e0b',
        bg: '#fffbeb',
        border: '#fde68a',
        timeline: [
            'Login to Gusto — boring forms.',
            'Login to Slack — notification hell.',
            'Login to Notion — scattered docs.',
            'Login to Google Drive — can\'t find anything.',
            'Login to Email — inbox zero is a lie.',
        ],
        why: 'All business. Zero fun. No wonder people feel like employee IDs, not humans.',
        cost: 'Flat culture = disengaged team = churn',
        fix: 'Gamified quests, badges, achievements, and a team map that\'s actually fun to explore.',
    },
];

const fadeUp = {
    initial: { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
};

export const PainSection = () => {
    return (
        <section id="pain" className="py-24 md:py-32 px-4 bg-white">
            <div className="max-w-5xl mx-auto">
                {/* Header */}
                <motion.div {...fadeUp} transition={{ duration: 0.55 }} className="text-center mb-6">
                    <p className="text-xs font-bold text-[#007BFF] uppercase tracking-[0.1em] mb-4">The Problem</p>
                    <h2 className="text-3xl md:text-5xl font-black tracking-[-0.03em] text-[#101011] mb-5 leading-tight">
                        The Remote Work Experience Is Broken.
                        <br />
                        <span className="font-hand font-bold" style={{ color: '#007BFF', fontSize: '1em' }}>And Boring.</span>
                    </h2>
                </motion.div>

                {/* 3 Problem Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-12">
                    {problems.map((p, idx) => (
                        <motion.div
                            key={idx}
                            {...fadeUp}
                            transition={{ duration: 0.5, delay: idx * 0.1 }}
                            className="rounded-2xl bg-[#f0f2f6] border border-[#e2e5ed] p-7 flex flex-col gap-5"
                        >
                            {/* Icon + title */}
                            <div>
                                <div
                                    className="w-11 h-11 rounded-xl flex items-center justify-center text-xl mb-4"
                                    style={{ background: p.bg, border: `1px solid ${p.border}` }}
                                >
                                    {p.icon}
                                </div>
                                <h3 className="text-lg font-bold text-[#101011] tracking-[-0.02em]">{p.title}</h3>
                            </div>

                            {/* Timeline */}
                            <div className="space-y-2">
                                {p.timeline.map((line, i) => (
                                    <p key={i} className="text-sm text-[#606266] leading-snug">{line}</p>
                                ))}
                            </div>

                            {/* Why */}
                            <div className="rounded-xl bg-white border border-[#e2e5ed] px-4 py-3">
                                <p className="text-[10px] font-bold text-[#a7a7a7] uppercase tracking-[0.08em] mb-1">Why it happens</p>
                                <p className="text-sm text-[#606266]">{p.why}</p>
                            </div>

                            {/* Cost */}
                            <div className="rounded-xl px-4 py-3" style={{ background: p.bg, border: `1px solid ${p.border}` }}>
                                <p className="text-[10px] font-bold uppercase tracking-[0.08em] mb-1" style={{ color: p.color }}>Result</p>
                                <p className="text-sm font-semibold" style={{ color: p.color }}>{p.cost}</p>
                            </div>

                            {/* Fix */}
                            <div className="mt-auto">
                                <p className="text-[10px] font-bold text-[#007BFF] uppercase tracking-[0.08em] mb-1">How Waawy fixes it</p>
                                <p className="text-sm text-[#606266] leading-relaxed">{p.fix}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};
