import { MessageCircle, Mail } from 'lucide-react';

export const Community = () => {
    return (
        <section className="py-24 relative z-10">
            <div className="container mx-auto px-4 max-w-5xl">
                <div className="text-center mb-16">
                    <span className="text-waawy-blue font-bold uppercase tracking-wider text-sm mb-4 block">Community</span>
                    <h2 className="text-4xl md:text-5xl font-black mb-6 text-white">
                        Pull up. We&apos;re building in public. 🔨
                    </h2>
                    <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
                        Connect with founders, share wins, and get help from the Waawy team.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                    {/* Discord Card */}
                    <a
                        href="https://discord.gg/3UCSZZVq"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group relative p-8 rounded-3xl bg-zinc-900 border border-white/10 hover:border-[#5865F2]/50 transition-all hover:shadow-2xl hover:shadow-[#5865F2]/10 hover:-translate-y-2"
                    >
                        <div className="absolute top-8 right-8 w-12 h-12 rounded-xl bg-[#5865F2]/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                            <MessageCircle className="w-6 h-6 text-[#5865F2]" />
                        </div>

                        <div className="mb-6">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#5865F2]/10 text-[#5865F2] text-xs font-bold uppercase tracking-wider mb-4">
                                <span className="w-2 h-2 rounded-full bg-[#5865F2] animate-pulse" />
                                Live Community
                            </div>
                            <h3 className="text-2xl font-bold mb-3 text-white">
                                Join our Discord
                            </h3>
                            <p className="text-zinc-400 leading-relaxed mb-6">
                                Chat with 2,000+ founders building remote teams. Real-time help, shared wins, good vibes only.
                            </p>
                        </div>

                        <div className="flex items-center gap-2 text-[#5865F2] font-bold group-hover:gap-3 transition-all">
                            Join Discord
                            <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
                        </div>
                    </a>

                    {/* Contact Card */}
                    <a
                        href="mailto:hello@getwaawy.com"
                        className="group relative p-8 rounded-3xl bg-zinc-900 border border-white/10 hover:border-waawy-blue/50 transition-all hover:shadow-2xl hover:shadow-waawy-blue/10 hover:-translate-y-2"
                    >
                        <div className="absolute top-8 right-8 w-12 h-12 rounded-xl bg-waawy-blue/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                            <Mail className="w-6 h-6 text-waawy-blue" />
                        </div>

                        <div className="mb-6">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-waawy-blue/10 text-waawy-blue text-xs font-bold uppercase tracking-wider mb-4">
                                Direct Line
                            </div>
                            <h3 className="text-2xl font-bold mb-3 text-white">
                                Reach out to us
                            </h3>
                            <p className="text-zinc-400 leading-relaxed mb-6">
                                Feature request? Bug report? Just wanna chat? Our team responds within 24 hours (usually way faster).
                            </p>
                        </div>

                        <div className="flex items-center gap-2 text-waawy-blue font-bold group-hover:gap-3 transition-all">
                            Send us an email
                            <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
                        </div>
                    </a>
                </div>

                {/* Stats */}
                <div className="mt-12 text-center">
                    <p className="text-sm text-zinc-600">
                        Average response time: <span className="font-bold text-waawy-blue">4 hours</span> &bull;
                        Community members: <span className="font-bold text-[#5865F2]">2,000+</span>
                    </p>
                </div>
            </div>
        </section>
    );
};
