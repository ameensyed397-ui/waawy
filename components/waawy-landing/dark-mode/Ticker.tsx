'use client';

import { motion } from 'framer-motion';

const items = [
    "Pulse Checks",
    "Recognition",
    "Culture Analytics",
    "Remote Bonding",
    "Daily Standups",
    "Team Morale",
    "Feedback Loops"
];

export const Ticker = () => {
    return (
        <section className="py-10 overflow-hidden bg-black border-y border-white/5 relative z-20">
            <div className="flex whitespace-nowrap">
                <motion.div
                    animate={{ x: [0, -1035] }} // Adjust based on content width
                    transition={{
                        repeat: Infinity,
                        duration: 30,
                        ease: "linear"
                    }}
                    className="flex gap-16 items-center pr-16"
                >
                    {[...items, ...items, ...items].map((item, idx) => (
                        <div key={idx} className="flex items-center gap-16">
                            <span className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-br from-zinc-500 to-zinc-800 uppercase tracking-tighter opacity-50 hover:opacity-100 transition-opacity cursor-default">
                                {item}
                            </span>
                            <div className="w-3 h-3 rounded-full bg-waawy-blue/30" />
                        </div>
                    ))}
                </motion.div>

                {/* Duplicate for seamless loop (if needed by screen width, but array tripling usually suffices) */}
                <motion.div
                    animate={{ x: [0, -1035] }}
                    transition={{
                        repeat: Infinity,
                        duration: 30,
                        ease: "linear"
                    }}
                    className="flex gap-16 items-center pr-16 absolute left-[1035px] top-10" // Simplified approach above is better usually
                />
            </div>

            <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-zinc-950 to-transparent z-30 pointer-events-none" />
            <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-zinc-950 to-transparent z-30 pointer-events-none" />
        </section>
    );
};
