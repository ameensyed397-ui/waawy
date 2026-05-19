'use client';

import { motion } from 'framer-motion';
import { WaitlistForm } from './WaitlistForm';

const fadeUp = {
    initial: { opacity: 0, y: 28 },
    animate: { opacity: 1, y: 0 },
};

const stagger = {
    animate: { transition: { staggerChildren: 0.09 } },
};

export const Hero = () => {
    return (
        <section className="relative flex flex-col justify-center items-center text-center px-4 sm:px-6 pt-32 sm:pt-40 pb-24 bg-[#f0f2f6] overflow-hidden">

            {/* ── Floating gradient orbs ── */}
            <motion.div
                className="absolute pointer-events-none rounded-full"
                style={{
                    width: 560,
                    height: 560,
                    top: '-10%',
                    left: '-8%',
                    background: 'radial-gradient(circle, #007BFF22 0%, transparent 70%)',
                    filter: 'blur(40px)',
                }}
                animate={{ x: [0, 30, 0], y: [0, 20, 0], scale: [1, 1.05, 1] }}
                transition={{ duration: 9, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' }}
            />
            <motion.div
                className="absolute pointer-events-none rounded-full"
                style={{
                    width: 400,
                    height: 400,
                    top: '20%',
                    right: '-6%',
                    background: 'radial-gradient(circle, #38b0fc18 0%, transparent 70%)',
                    filter: 'blur(50px)',
                }}
                animate={{ x: [0, -25, 0], y: [0, 35, 0], scale: [1, 1.08, 1] }}
                transition={{ duration: 11, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut', delay: 2 }}
            />

            <motion.div
                variants={stagger}
                initial="initial"
                animate="animate"
                className="relative z-10 max-w-4xl mx-auto w-full"
            >
                {/* Free Beta Badge */}
                <motion.div
                    variants={fadeUp}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-emerald-300 bg-emerald-50 mb-10 max-w-xs sm:max-w-none text-center"
                >
                    <span className="text-base flex-shrink-0">🎉</span>
                    <span className="text-xs font-bold text-emerald-700 tracking-wide uppercase leading-snug">FREE BETA — First 100 companies get lifetime access</span>
                </motion.div>

                {/* Headline */}
                <motion.div
                    variants={fadeUp}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className="mb-7"
                >
                    <h1 className="text-[2.2rem] sm:text-[3rem] md:text-[3.8rem] lg:text-[4.5rem] font-black tracking-[-0.03em] text-[#101011] leading-[1.1]">
                        Make your remote team feel like
                    </h1>
                    {/* Hand-lettered accent line */}
                    <div className="relative inline-block mt-2">
                        <span
                            className="font-hand font-bold leading-none whitespace-nowrap"
                            style={{
                                fontSize: 'clamp(2rem, 7vw, 5rem)',
                                background: 'linear-gradient(135deg, #007BFF 20%, #38b0fc 80%)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                backgroundClip: 'text',
                                display: 'block',
                            }}
                        >
                            neighbors, not strangers.
                        </span>
                        {/* Animated squiggle underline */}
                        <svg
                            viewBox="0 0 420 18"
                            fill="none"
                            className="absolute -bottom-2 left-0 w-full"
                            preserveAspectRatio="none"
                        >
                            <motion.path
                                d="M4 10 Q40 3 80 10 Q120 17 160 10 Q200 3 240 10 Q280 17 320 10 Q360 3 416 10"
                                stroke="url(#squiggleGrad)"
                                strokeWidth="3"
                                strokeLinecap="round"
                                fill="none"
                                initial={{ pathLength: 0, opacity: 0 }}
                                animate={{ pathLength: 1, opacity: 1 }}
                                transition={{ duration: 1.1, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
                            />
                            <defs>
                                <linearGradient id="squiggleGrad" x1="0" y1="0" x2="420" y2="0" gradientUnits="userSpaceOnUse">
                                    <stop offset="0%" stopColor="#007BFF" />
                                    <stop offset="100%" stopColor="#38b0fc" />
                                </linearGradient>
                            </defs>
                        </svg>
                    </div>
                </motion.div>

                {/* Sub */}
                <motion.div
                    variants={fadeUp}
                    transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                    className="max-w-2xl mx-auto mb-10 space-y-2"
                >
                    <p className="text-lg md:text-xl text-[#606266] leading-relaxed tracking-[-0.01em]">
                        Visual team map. Centralized docs. Project visibility. Culture tools.
                        <br className="hidden sm:block" />
                        <span className="text-[#101011] font-semibold"> Everything you need to actually connect.</span>
                    </p>
                    <p className="text-base text-[#a7a7a7]">Launching February 2026 · After that: $8/employee/month</p>
                </motion.div>

                {/* Spots remaining + CTA */}
                <motion.div
                    variants={fadeUp}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className="flex flex-col items-center gap-3 mb-14"
                >
                    {/* Spots counter */}
                    <div className="flex items-center gap-2 mb-2">
                        <div className="flex items-center gap-1">
                            {Array.from({ length: 10 }).map((_, i) => (
                                <div
                                    key={i}
                                    className={`w-2 h-2 rounded-full ${i < 1 ? 'bg-[#007BFF]' : 'bg-[#e2e5ed]'}`}
                                />
                            ))}
                        </div>
                        <span className="text-xs font-bold text-[#606266]">
                            <span className="text-[#007BFF]">87</span>/100 spots remaining
                        </span>
                    </div>

                    <div id="waitlist" className="w-full max-w-md">
                        <WaitlistForm />
                    </div>
                    <p className="text-sm text-[#a7a7a7]">No setup fees · No credit card · Actually fun to use</p>
                </motion.div>

                {/* Trust bar */}
                <motion.div
                    variants={fadeUp}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                    <div className="flex flex-wrap items-center justify-center gap-5 text-sm text-[#606266]">
                        <span>✅ First 100 companies free for life</span>
                        <span>🎮 Launching February 2026</span>
                        <span>⚡ Built by designers who actually give a damn</span>
                    </div>
                </motion.div>
            </motion.div>
        </section>
    );
};
