'use client';

import { motion } from 'framer-motion';
import { WaitlistForm } from './WaitlistForm';

export const WaitlistCTA = () => {
    return (
        <section className="py-24 md:py-32 px-4 bg-white">
            <div className="max-w-3xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 32 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.55 }}
                    className="relative rounded-3xl overflow-hidden p-7 sm:p-10 md:p-14 text-center"
                    style={{ background: 'linear-gradient(135deg, #007BFF 0%, #0066CC 60%, #0047A3 100%)' }}
                >
                    {/* Background glows */}
                    <div className="absolute top-0 left-0 w-64 h-64 rounded-full blur-3xl opacity-20"
                        style={{ background: '#38b0fc', transform: 'translate(-30%, -30%)' }} />
                    <div className="absolute bottom-0 right-0 w-48 h-48 rounded-full blur-3xl opacity-10"
                        style={{ background: '#0047A3', transform: 'translate(20%, 20%)' }} />

                    <div className="relative z-10">
                        {/* Badge */}
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 border border-white/30 text-xs font-bold text-white uppercase tracking-wider mb-5">
                            🎉 Free Beta · 87 spots remaining
                        </div>

                        <h2 className="text-3xl md:text-4xl font-black tracking-[-0.03em] text-white mb-4 leading-tight">
                            Stop losing people in{' '}
                            <span className="font-hand font-bold" style={{ fontSize: '1.1em', color: '#cce8ff' }}>Notion / Slack / Drive hell.</span>
                        </h2>

                        {/* ROI comparison */}
                        <div className="grid sm:grid-cols-2 gap-3 mb-8 text-left">
                            <div className="rounded-2xl bg-white/10 border border-white/20 p-5">
                                <p className="text-xs font-bold text-white/50 uppercase tracking-[0.08em] mb-3">The scattered chaos</p>
                                <div className="space-y-1.5 text-sm text-white/70">
                                    <p>• New hires lost for weeks</p>
                                    <p>• Information re-created 5 times</p>
                                    <p>• Team working in silos</p>
                                    <p>• Culture feels flat. People quit.</p>
                                </div>
                                <p className="text-white font-bold mt-3">Cost: $50k per resignation</p>
                            </div>
                            <div className="rounded-2xl bg-white/15 border border-white/30 p-5">
                                <p className="text-xs font-bold text-white/60 uppercase tracking-[0.08em] mb-3">With Waawy</p>
                                <div className="space-y-1.5 text-sm text-white/80">
                                    <p>• One beautiful portal</p>
                                    <p>• Everything searchable</p>
                                    <p>• Team map (actually know people)</p>
                                    <p>• Gamified. Actually fun.</p>
                                </div>
                                <p className="text-white font-bold mt-3">$8/employee/month · ROI: obvious</p>
                            </div>
                        </div>

                        <p className="text-white/70 text-base mb-2 leading-relaxed">
                            First 100 companies get lifetime access — free forever.
                        </p>
                        <p className="text-white/50 text-sm mb-8">
                            Beta closes when 100 spots fill · Prevent ONE resignation = 5+ years of Waawy
                        </p>

                        <div className="max-w-md mx-auto mb-7">
                            <WaitlistForm />
                        </div>

                        <div className="flex flex-wrap items-center justify-center gap-5 text-xs text-white/55 font-medium">
                            <span>✅ Built by ex-Figma designers</span>
                            <span>⚡ 15-min setup</span>
                            <span>🔒 No credit card required</span>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};
