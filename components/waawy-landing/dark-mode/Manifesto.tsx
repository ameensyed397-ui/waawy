'use client';

import Link from 'next/link';

export const Manifesto = () => {
    return (
        <footer className="py-16 border-t border-[#e2e5ed] bg-[#f0f2f6]">
            <div className="container mx-auto px-4 max-w-5xl">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-10 mb-10">
                    {/* Brand */}
                    <div className="max-w-xs">
                        <p
                            className="font-hand font-bold text-3xl mb-2"
                            style={{
                                background: 'linear-gradient(135deg, #007BFF, #38b0fc)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                backgroundClip: 'text',
                            }}
                        >
                            Waawy
                        </p>
                        <p className="text-sm text-[#606266] leading-relaxed">
                            Built with 🌊 by people who think work should be fun.
                        </p>
                        <p className="text-xs text-[#a7a7a7] mt-2 italic">
                            &ldquo;I felt invisible at work in Dubai. Building what I wish existed.&rdquo; — Ameen, Founder
                        </p>
                    </div>

                    {/* Links */}
                    <div className="flex flex-wrap gap-x-8 gap-y-3">
                        <Link href="/#features" className="text-sm text-[#606266] hover:text-[#101011] transition-colors font-medium">Features</Link>
                        <Link href="/#how-it-works" className="text-sm text-[#606266] hover:text-[#101011] transition-colors font-medium">How it works</Link>
                        <Link href="/#pricing" className="text-sm text-[#606266] hover:text-[#101011] transition-colors font-medium">Pricing</Link>
                        <Link href="/blog" className="text-sm text-[#606266] hover:text-[#101011] transition-colors font-medium">Blog</Link>
                        <Link href="mailto:hello@getwaawy.com" className="text-sm text-[#606266] hover:text-[#101011] transition-colors font-medium">Contact</Link>
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-8 border-t border-[#e2e5ed]">
                    <p className="text-xs text-[#a7a7a7]">© 2026 Waawy Inc. · hello@getwaawy.com</p>
                    <div className="flex gap-5">
                        <Link href="#" className="text-xs text-[#a7a7a7] hover:text-[#606266] transition-colors">Privacy</Link>
                        <Link href="#" className="text-xs text-[#a7a7a7] hover:text-[#606266] transition-colors">Terms</Link>
                        <Link href="https://twitter.com/getwaawy" className="text-xs text-[#a7a7a7] hover:text-[#606266] transition-colors">@getwaawy</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};
