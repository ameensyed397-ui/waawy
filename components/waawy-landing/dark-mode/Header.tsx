'use client';

import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

export const Header = () => {
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 24);
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    return (
        <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'py-3' : 'py-5'}`}>
            <div className="container mx-auto px-4 max-w-6xl">
                <div className={`
                    rounded-2xl px-5 py-3 flex items-center justify-between transition-all duration-300
                    ${scrolled
                        ? 'bg-white/92 backdrop-blur-xl border border-[#e2e5ed] shadow-sm shadow-black/5'
                        : 'bg-transparent'
                    }
                `}>
                    <Link href="/" className="flex items-center">
                        <span
                            className="font-hand font-bold text-3xl leading-none"
                            style={{
                                background: 'linear-gradient(135deg, #007BFF, #38b0fc)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                backgroundClip: 'text',
                            }}
                        >
                            waawy
                        </span>
                    </Link>

                    <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-[#606266]">
                        <Link href="/#features" className="hover:text-[#101011] transition-colors duration-150">Features</Link>
                        <Link href="/#how-it-works" className="hover:text-[#101011] transition-colors duration-150">How it works</Link>
                        <Link href="/#pricing" className="hover:text-[#101011] transition-colors duration-150">Pricing</Link>
                        <Link href="/blog" className="hover:text-[#101011] transition-colors duration-150">Blog</Link>
                    </nav>

                    <div className="hidden md:block">
                        <Link
                            href="/#waitlist"
                            className="px-6 py-2.5 rounded-xl text-sm font-bold text-white transition-all duration-200 hover:opacity-90 hover:scale-[1.02] active:scale-[0.98] inline-block"
                            style={{ background: 'linear-gradient(135deg, #007BFF, #38b0fc)' }}
                        >
                            Join Free Beta →
                        </Link>
                    </div>

                    <button
                        className="md:hidden text-[#606266] hover:text-[#101011] transition-colors"
                        onClick={() => setMobileOpen(!mobileOpen)}
                    >
                        {mobileOpen ? <X size={20} /> : <Menu size={20} />}
                    </button>
                </div>
            </div>

            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.18 }}
                        className="absolute top-[68px] left-4 right-4 bg-white border border-[#e2e5ed] rounded-2xl p-5 shadow-xl shadow-black/8 flex flex-col gap-3 z-50"
                    >
                        {[
                            ['/#features', 'Features'],
                            ['/#how-it-works', 'How it works'],
                            ['/#pricing', 'Pricing'],
                            ['/blog', 'Blog'],
                        ].map(([href, label]) => (
                            <Link
                                key={href}
                                href={href}
                                className="text-sm font-medium text-[#606266] hover:text-[#101011] transition-colors py-1"
                                onClick={() => setMobileOpen(false)}
                            >
                                {label}
                            </Link>
                        ))}
                        <hr className="border-[#e2e5ed]" />
                        <Link
                            href="/#waitlist"
                            onClick={() => setMobileOpen(false)}
                            className="block w-full py-3.5 rounded-xl text-white font-bold text-center text-sm"
                            style={{ background: 'linear-gradient(135deg, #007BFF, #38b0fc)' }}
                        >
                            Join Free Beta →
                        </Link>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
};
