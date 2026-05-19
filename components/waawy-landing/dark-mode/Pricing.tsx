'use client';

import { motion } from 'framer-motion';
import { Check, Sparkles, Zap } from 'lucide-react';

const tiers = [
    {
        name: 'Free',
        price: '£0',
        period: '/mo',
        description: 'Perfect for tiny teams getting started',
        features: [
            'Up to 5 team members',
            'Basic onboarding flows',
            'Weekly pulse check-ins',
            'Kudos wall',
        ],
        cta: 'Start free',
        featured: false,
        icon: null,
        border: 'border-white/10',
        hoverBorder: 'hover:border-white/20',
        bg: 'bg-zinc-900',
        ctaBg: 'bg-white/10 hover:bg-white/20 text-white',
    },
    {
        name: 'Founders Beta',
        price: '£49',
        period: '/mo',
        description: 'Grandfathered for life 🔒',
        features: [
            'Unlimited team members',
            'Full UK/EU compliance flows',
            'Advanced analytics & trends',
            'Priority support',
            'All future features',
        ],
        cta: 'Lock in this price →',
        featured: true,
        icon: Sparkles,
        border: 'border-waawy-blue/50',
        hoverBorder: 'hover:border-waawy-blue',
        bg: 'bg-zinc-900',
        ctaBg: 'bg-waawy-blue hover:bg-blue-600 text-white',
    },
    {
        name: 'Standard',
        price: '£99',
        period: '/mo',
        description: 'After beta — full power',
        features: [
            'Everything in Founders Beta',
            'Custom integrations',
            'API access',
            'Dedicated account manager',
        ],
        cta: 'Coming soon',
        featured: false,
        icon: Zap,
        border: 'border-white/10',
        hoverBorder: 'hover:border-white/20',
        bg: 'bg-zinc-900',
        ctaBg: 'bg-white/10 hover:bg-white/20 text-white',
    },
];

export const Pricing = () => {
    return (
        <section id="pricing" className="py-24 md:py-32 px-4 relative z-10">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="text-center mb-16">
                    <span className="text-emerald-400 font-bold uppercase tracking-wider text-sm mb-4 block">
                        PRICING THAT DOESN&apos;T PUNCH YOU IN THE BURN RATE
                    </span>
                    <h2 className="text-4xl md:text-6xl font-black text-white mb-6">
                        Simple, honest pricing 💰
                    </h2>
                    <p className="text-lg text-zinc-400 max-w-xl mx-auto">
                        Flat monthly for everything. No per-seat surprises.
                    </p>
                </div>

                {/* Tiers */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
                    {tiers.map((tier, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.12, duration: 0.5 }}
                            className={`relative rounded-3xl ${tier.bg} border ${tier.border} ${tier.hoverBorder} p-8 md:p-10 transition-all duration-300 flex flex-col`}
                        >
                            {/* Featured badge */}
                            {tier.featured && (
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                                    <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-waawy-blue text-white text-xs font-bold uppercase tracking-wider shadow-lg shadow-waawy-blue/30">
                                        <Sparkles className="w-3.5 h-3.5" />
                                        Most popular
                                    </div>
                                </div>
                            )}

                            {/* Glow for featured */}
                            {tier.featured && (
                                <div className="absolute inset-0 rounded-3xl bg-gradient-to-b from-waawy-blue/5 to-transparent pointer-events-none" />
                            )}

                            <div className="relative z-10 flex flex-col flex-1">
                                {/* Tier name */}
                                <h3 className="text-lg font-bold text-zinc-400 mb-6">{tier.name}</h3>

                                {/* Price */}
                                <div className="mb-2 flex items-end gap-1">
                                    <span className="text-5xl md:text-6xl font-black text-white tracking-tighter">{tier.price}</span>
                                    <span className="text-zinc-500 text-lg font-medium mb-2">{tier.period}</span>
                                </div>
                                <p className="text-zinc-500 text-sm mb-8">{tier.description}</p>

                                {/* Features */}
                                <ul className="space-y-3 mb-10 flex-1">
                                    {tier.features.map((feature, fIdx) => (
                                        <li key={fIdx} className="flex items-start gap-3">
                                            <Check className={`w-5 h-5 flex-shrink-0 mt-0.5 ${tier.featured ? 'text-waawy-blue' : 'text-zinc-600'}`} />
                                            <span className="text-zinc-300 text-sm">{feature}</span>
                                        </li>
                                    ))}
                                </ul>

                                {/* CTA */}
                                <button className={`w-full py-4 rounded-xl font-bold text-base transition-all hover:scale-[1.02] ${tier.ctaBg} ${tier.featured ? 'shadow-lg shadow-waawy-blue/20' : ''}`}>
                                    {tier.cta}
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Note */}
                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="text-center text-zinc-600 text-sm mt-8"
                >
                    Flat monthly for everything. No per-seat surprises. Cancel anytime.
                </motion.p>
            </div>
        </section>
    );
};
