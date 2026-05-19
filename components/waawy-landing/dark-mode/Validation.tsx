'use client';

import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { WaitlistForm } from './WaitlistForm';

const perfectFor = [
    { label: 'Remote or hybrid team', detail: '10–200 people working from different places' },
    { label: 'Information is scattered', detail: 'Notion, Drive, Slack chaos — nobody can find anything' },
    { label: 'New hires feel lost', detail: 'Can\'t find docs, don\'t know people, Week 1 is a blur' },
    { label: 'Team works in silos', detail: 'People don\'t know what other departments do' },
    { label: 'Culture feels flat', detail: 'Just Zoom calls and Slack — zero real connection' },
    { label: 'Want something FUN', detail: 'Tired of boring HR software nobody actually uses' },
];

const testimonials = [
    {
        quote: "We tried Notion. It became a graveyard. We tried Slack pins. Nobody reads them. We tried Google Drive. LOL. Waawy is the first thing people actually USE.",
        name: 'Alex Kim',
        role: 'CTO @ DataCo',
        detail: '28 people, remote',
        emoji: '📊',
    },
    {
        quote: "Our new designer said Waawy was the most fun onboarding she's ever had. She unlocked 8 badges in Week 1. Met 12 people through coffee roulette. Found every doc she needed in seconds.",
        name: 'Sarah Chen',
        role: 'Founder @ DesignStudio',
        detail: '19 people, hybrid',
        emoji: '🎨',
    },
    {
        quote: "I didn't think 'fun HR software' was possible. Then I saw someone get excited about unlocking the 'Knowledge Seeker' badge. Waawy just works.",
        name: 'Marcus Rivera',
        role: 'Head of Ops @ TechCo',
        detail: '42 people, remote-first',
        emoji: '🚀',
    },
];

const included = [
    'Beautiful team world map',
    'Gamified quest system',
    'One search for ALL docs',
    'Rich team profiles',
    'Recognition & badges',
    'Auto-matched coffee chats',
    'Achievement tracking',
    'Import from Notion / Drive',
    'Customize world theme',
    'Engagement analytics',
];

const fadeUp = {
    initial: { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
};

export const Validation = () => {
    return (
        <section id="pricing" className="py-24 md:py-32 px-4 bg-white">
            <div className="max-w-5xl mx-auto">

                {/* Who It's For */}
                <motion.div {...fadeUp} transition={{ duration: 0.5 }} className="text-center mb-12">
                    <p className="text-xs font-bold text-[#007BFF] uppercase tracking-[0.1em] mb-4">Is Waawy Right for You?</p>
                    <h2 className="text-3xl md:text-5xl font-black tracking-[-0.03em] text-[#101011] leading-tight">
                        <span className="font-hand font-bold" style={{ color: '#007BFF', fontSize: '1em' }}>Perfect</span> if you&apos;re:
                    </h2>
                </motion.div>

                <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3 mb-20">
                    {perfectFor.map((item, idx) => (
                        <motion.div
                            key={idx}
                            {...fadeUp}
                            transition={{ duration: 0.4, delay: idx * 0.06 }}
                            className="rounded-2xl bg-[#f0f2f6] border border-[#e2e5ed] p-5 flex gap-3"
                        >
                            <div className="w-5 h-5 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center flex-shrink-0 mt-0.5">
                                <Check className="w-3 h-3 text-emerald-600" />
                            </div>
                            <div>
                                <p className="text-base font-bold text-[#101011] tracking-[-0.01em]">{item.label}</p>
                                <p className="text-sm text-[#606266] mt-0.5">{item.detail}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Testimonials */}
                <motion.div {...fadeUp} transition={{ duration: 0.5 }} className="text-center mb-10">
                    <p className="text-xs font-bold text-[#007BFF] uppercase tracking-[0.1em] mb-4">What People Say</p>
                    <h3 className="text-3xl md:text-4xl font-black tracking-[-0.03em] text-[#101011] leading-tight">
                        Real stories.{' '}
                        <span className="font-hand font-bold" style={{ color: '#007BFF' }}>Real reactions.</span>
                    </h3>
                </motion.div>

                <div className="grid md:grid-cols-3 gap-4 mb-20">
                    {testimonials.map((t, idx) => (
                        <motion.div
                            key={idx}
                            {...fadeUp}
                            transition={{ duration: 0.45, delay: idx * 0.08 }}
                            className="rounded-2xl bg-[#f0f2f6] border border-[#e2e5ed] p-7 flex flex-col gap-5"
                        >
                            <p className="text-base text-[#606266] leading-relaxed flex-1 italic">&ldquo;{t.quote}&rdquo;</p>
                            <div className="flex items-center gap-3">
                                <div className="w-9 h-9 rounded-full bg-white border border-[#e2e5ed] flex items-center justify-center text-lg flex-shrink-0">
                                    {t.emoji}
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-[#101011]">{t.name}</p>
                                    <p className="text-xs text-[#a7a7a7]">{t.role} · {t.detail}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
                <p className="text-xs text-center text-[#a7a7a7] -mt-14 mb-20">Placeholder testimonials — replacing with real beta users soon.</p>

                {/* Pricing */}
                <motion.div {...fadeUp} transition={{ duration: 0.5 }} className="text-center mb-10">
                    <p className="text-xs font-bold text-[#007BFF] uppercase tracking-[0.1em] mb-4">Pricing</p>
                    <h3 className="text-3xl md:text-4xl font-black tracking-[-0.03em] text-[#101011]">Seriously affordable. Seriously fun.</h3>
                </motion.div>

                <motion.div
                    {...fadeUp}
                    transition={{ duration: 0.55, delay: 0.08 }}
                    className="rounded-3xl bg-[#f0f2f6] border border-[#e2e5ed] p-8 md:p-12"
                >
                    <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-10 pb-10 border-b border-[#e2e5ed]">
                        <div className="flex-1">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 mb-3">
                                <span className="text-xs font-bold text-emerald-700 uppercase tracking-wide">🎉 Founding Company — Free Forever</span>
                            </div>
                            <p className="mb-1">
                                <span className="font-hand font-bold text-[#007BFF]" style={{ fontSize: '3.5rem', lineHeight: 1 }}>Free</span>
                                <span className="text-base font-normal text-[#a7a7a7] ml-2">for first 100 companies</span>
                            </p>
                            <p className="text-sm text-[#a7a7a7]">After that: $8/employee/month · or $80/employee/year (save $16)</p>
                        </div>
                        <div className="md:text-right">
                            <p className="font-hand font-bold text-3xl mb-1" style={{ color: '#007BFF' }}>
                                Lifetime access
                            </p>
                            <p className="text-sm text-[#a7a7a7]">No credit card required</p>
                            <p className="text-xs text-[#a7a7a7] mt-1">87/100 spots remaining</p>
                        </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-3 mb-10">
                        {included.map((item) => (
                            <div key={item} className="flex items-center gap-2.5">
                                <Check className="w-4 h-4 flex-shrink-0" style={{ color: '#007BFF' }} />
                                <span className="text-base text-[#606266]">{item}</span>
                            </div>
                        ))}
                    </div>

                    <div className="max-w-md mx-auto">
                        <WaitlistForm />
                    </div>
                </motion.div>
            </div>
        </section>
    );
};
