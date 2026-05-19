'use client';

import { motion } from 'framer-motion';

const features = [
    {
        emoji: '🗺️',
        title: 'Team World Map',
        badge: 'Actually Explorable',
        description: 'Your entire team visualized as a world you can explore. Engineering = Mountain. Marketing = Forest. Sales = Beach. Click on anyone to see their profile. Not a boring spreadsheet — a visual, memorable experience.',
        accent: '#007BFF',
        accentBg: '#007BFF0d',
        accentBorder: '#007BFF25',
    },
    {
        emoji: '⚔️',
        title: 'Quest System',
        badge: 'Gamified Onboarding',
        description: 'Onboarding tasks turned into quests. "Meet 5 teammates" → unlock Social Butterfly badge. "Find benefits doc" → earn 100 XP. "Give 3 kudos" → Team Player badge. Progress is visible. Completion feels good.',
        accent: '#f59e0b',
        accentBg: '#f59e0b0d',
        accentBorder: '#f59e0b25',
    },
    {
        emoji: '📚',
        title: 'Knowledge Library',
        badge: 'One Search Bar',
        description: 'All your scattered docs in one searchable, beautiful place. Replaces 17 Notion workspaces, a Google Drive nobody can navigate, and Slack messages lost forever. Find anything in 3 seconds.',
        accent: '#0ea5e9',
        accentBg: '#0ea5e90d',
        accentBorder: '#0ea5e925',
    },
    {
        emoji: '💬',
        title: 'Rich Team Profiles',
        badge: 'Actually Human',
        description: 'Not just name/role/email — but what they\'re working on, what to ask them about, and their coffee chat availability. "Sarah loves Figma AND tacos? We\'re getting lunch." Real connections start here.',
        accent: '#ec4899',
        accentBg: '#ec48990d',
        accentBorder: '#ec489925',
    },
    {
        emoji: '⭐',
        title: 'Recognition System',
        badge: 'Better Than Slack Kudos',
        description: 'Give teammates "power-ups" (not boring kudos). Fire Starter, Problem Solver, Idea Generator — each type unlocks a different badge. Public feed. Animated celebrations. Permanent (not lost in threads).',
        accent: '#22c55e',
        accentBg: '#22c55e0d',
        accentBorder: '#22c55e25',
    },
    {
        emoji: '🎲',
        title: 'Coffee Roulette',
        badge: 'Auto-Matched Weekly',
        description: 'Opt-in weekly matches with someone you\'ve never met. Calendar invite sent automatically. Conversation starters provided. Smart matching: different departments, similar interests, never met before = prioritized.',
        accent: '#8b5cf6',
        accentBg: '#8b5cf60d',
        accentBorder: '#8b5cf625',
    },
    {
        emoji: '🏆',
        title: 'Achievements & Levels',
        badge: 'Track Your Journey',
        description: 'Level 1: Newcomer → Level 5: Contributor → Level 10: Veteran → Level 20: Legend. Unlock achievements for Early Bird, Recognition Champion, Social Butterfly, Knowledge Seeker. Progress is visible. Collecting is fun.',
        accent: '#f97316',
        accentBg: '#f973160d',
        accentBorder: '#f9731625',
    },
];

export const FeaturePreview = () => {
    return (
        <section id="features" className="py-24 md:py-32 px-4 bg-white">
            <div className="max-w-5xl mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-16"
                >
                    <p className="text-xs font-bold text-[#007BFF] uppercase tracking-[0.1em] mb-4">Features</p>
                    <h2 className="text-3xl md:text-5xl font-black tracking-[-0.03em] text-[#101011] mb-4 leading-tight">
                        Not HR Software.
                        <br />
                        <span className="font-hand font-bold" style={{ fontSize: '0.95em', color: '#007BFF' }}>
                            An Experience.
                        </span>
                    </h2>
                    <p className="text-base text-[#606266] max-w-md mx-auto tracking-[-0.01em]">
                        Seven features that turn scattered chaos into a world your team actually wants to use.
                    </p>
                </motion.div>

                {/* 3×2 grid (first 6) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    {features.slice(0, 6).map((f, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-30px' }}
                            transition={{ duration: 0.45, delay: idx * 0.07 }}
                            whileHover={{ y: -3, transition: { duration: 0.2 } }}
                            className="group rounded-2xl bg-[#f0f2f6] border border-[#e2e5ed] p-7 hover:border-[#007BFF]/30 transition-colors duration-300"
                        >
                            <div className="flex items-start justify-between mb-5">
                                <div
                                    className="w-11 h-11 rounded-xl flex items-center justify-center text-xl"
                                    style={{ background: f.accentBg, border: `1px solid ${f.accentBorder}` }}
                                >
                                    {f.emoji}
                                </div>
                                <span
                                    className="text-[10px] font-bold uppercase tracking-[0.08em] px-2.5 py-1 rounded-full"
                                    style={{ color: f.accent, background: f.accentBg, border: `1px solid ${f.accentBorder}` }}
                                >
                                    {f.badge}
                                </span>
                            </div>
                            <h3 className="text-lg font-bold text-[#101011] mb-2.5 tracking-[-0.02em] leading-snug">{f.title}</h3>
                            <p className="text-base text-[#606266] leading-relaxed">{f.description}</p>
                        </motion.div>
                    ))}
                </div>

                {/* 7th — full width */}
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.28 }}
                    whileHover={{ y: -3, transition: { duration: 0.2 } }}
                    className="rounded-2xl bg-[#f0f2f6] border border-[#e2e5ed] p-7 hover:border-[#007BFF]/30 transition-colors duration-300"
                >
                    <div className="flex flex-col sm:flex-row sm:items-center gap-5">
                        <div
                            className="w-11 h-11 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
                            style={{ background: features[6].accentBg, border: `1px solid ${features[6].accentBorder}` }}
                        >
                            {features[6].emoji}
                        </div>
                        <div className="flex-1">
                            <div className="flex flex-wrap items-center gap-2.5 mb-2">
                                <h3 className="text-lg font-bold text-[#101011] tracking-[-0.02em]">{features[6].title}</h3>
                                <span
                                    className="text-[10px] font-bold uppercase tracking-[0.08em] px-2.5 py-1 rounded-full"
                                    style={{ color: features[6].accent, background: features[6].accentBg, border: `1px solid ${features[6].accentBorder}` }}
                                >
                                    {features[6].badge}
                                </span>
                            </div>
                            <p className="text-base text-[#606266] leading-relaxed">{features[6].description}</p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};
