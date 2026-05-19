'use client';

import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from 'remotion';

const teamMembers = [
    { name: 'Priya', mood: '🌟', energy: 88, tz: 'IST', color: '#a855f7' },
    { name: 'Marcus', mood: '😊', energy: 74, tz: 'PST', color: '#007BFF' },
    { name: 'Yuki', mood: '🔥', energy: 95, tz: 'JST', color: '#22c55e' },
    { name: 'Sofia', mood: '😐', energy: 61, tz: 'CET', color: '#f59e0b' },
];

const ritualItems = [
    { label: 'Share your energy level', icon: '⚡', color: '#a855f7', delay: 38 },
    { label: 'What are you excited about?', icon: '🚀', color: '#007BFF', delay: 52 },
    { label: 'Someone you want to thank', icon: '💜', color: '#22c55e', delay: 66 },
];

export const HeroCultureAnimation = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const scale = spring({ frame, fps, from: 0.85, to: 1, config: { damping: 12 } });
    const opacity = interpolate(frame, [0, 25], [0, 1], { extrapolateRight: 'clamp' });
    const moveUp = interpolate(frame, [0, 25], [40, 0], { extrapolateRight: 'clamp' });
    const glowOpacity = interpolate(frame, [0, 75, 150], [0.25, 0.55, 0.25], { extrapolateRight: 'clamp' });
    const card1Y = interpolate(frame, [0, 75, 150], [0, -8, 0], { extrapolateRight: 'clamp' });
    const card2Y = interpolate(frame, [0, 75, 150], [0, 8, 0], { extrapolateRight: 'clamp' });

    const avgEnergy = Math.round(interpolate(frame, [30, 80], [0, 79], {
        extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
    }));

    const notif1X = interpolate(frame, [55, 75], [220, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
    const notif1O = interpolate(frame, [55, 75], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
    const notif2X = interpolate(frame, [80, 100], [220, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
    const notif2O = interpolate(frame, [80, 100], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
    const notif3X = interpolate(frame, [105, 125], [220, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
    const notif3O = interpolate(frame, [105, 125], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

    return (
        <AbsoluteFill style={{ backgroundColor: '#09090b', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {/* Background glow */}
            <div style={{
                position: 'absolute', top: '50%', left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '80%', height: '80%', borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(168,85,247,0.10) 0%, transparent 70%)',
                opacity: glowOpacity,
            }} />

            <div style={{
                opacity,
                transform: `scale(${scale}) translateY(${moveUp}px)`,
                display: 'flex', gap: 40, alignItems: 'stretch',
                justifyContent: 'center', padding: '40px 60px',
                width: '100%', maxWidth: 1400,
            }}>
                {/* Left: Team Vibe Card */}
                <div style={{
                    transform: `translateY(${card1Y}px)`,
                    background: '#18181b',
                    border: '1px solid rgba(255,255,255,0.08)',
                    borderRadius: 24, padding: 40, flex: 1, minWidth: 0,
                    position: 'relative', overflow: 'hidden',
                }}>
                    <div style={{
                        position: 'absolute', top: -40, right: -40,
                        width: 200, height: 200, borderRadius: '50%',
                        background: 'radial-gradient(circle, rgba(168,85,247,0.15) 0%, transparent 70%)',
                    }} />

                    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 28 }}>
                        <div style={{
                            width: 14, height: 14, borderRadius: '50%',
                            background: '#a855f7', boxShadow: '0 0 10px rgba(168,85,247,0.5)',
                        }} />
                        <span style={{ color: '#a1a1aa', fontSize: 18, fontWeight: 600, letterSpacing: '0.02em' }}>
                            Team Vibe
                        </span>
                    </div>

                    <div style={{ fontSize: 80, fontWeight: 800, color: 'white', lineHeight: 1, letterSpacing: '-0.03em' }}>
                        {avgEnergy}
                        <span style={{ fontSize: 32, color: '#71717a', fontWeight: 600 }}>/100</span>
                    </div>
                    <div style={{ color: '#a855f7', fontSize: 18, marginTop: 8, fontWeight: 600 }}>Feeling connected ✨</div>

                    <div style={{ marginTop: 28, height: 10, background: '#27272a', borderRadius: 999, overflow: 'hidden' }}>
                        <div style={{
                            height: '100%',
                            width: `${interpolate(frame, [30, 100], [0, 79], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })}%`,
                            background: 'linear-gradient(90deg, #007BFF, #a855f7)',
                            borderRadius: 999,
                        }} />
                    </div>

                    {/* Team member rows */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginTop: 28 }}>
                        {teamMembers.map((m, idx) => {
                            const rowOpacity = interpolate(frame, [35 + idx * 10, 45 + idx * 10], [0, 1], {
                                extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
                            });
                            return (
                                <div key={idx} style={{ opacity: rowOpacity, display: 'flex', alignItems: 'center', gap: 12 }}>
                                    <span style={{ fontSize: 18 }}>{m.mood}</span>
                                    <span style={{ color: '#d4d4d8', fontSize: 15, flex: 1 }}>{m.name}</span>
                                    <span style={{ color: '#52525b', fontSize: 12 }}>{m.tz}</span>
                                    <div style={{ width: 80, height: 6, background: '#27272a', borderRadius: 999, overflow: 'hidden' }}>
                                        <div style={{
                                            height: '100%',
                                            width: `${interpolate(frame, [35 + idx * 10, 70 + idx * 10], [0, m.energy], {
                                                extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
                                            })}%`,
                                            background: m.color,
                                            borderRadius: 999,
                                        }} />
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Right: Connection moments */}
                <div style={{
                    transform: `translateY(${card2Y}px)`,
                    display: 'flex', flexDirection: 'column', gap: 24, flex: 1, minWidth: 0,
                }}>
                    {/* Rituals card */}
                    <div style={{
                        background: '#18181b', border: '1px solid rgba(255,255,255,0.08)',
                        borderRadius: 24, padding: 36, flex: 1,
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
                            <span style={{ fontSize: 24 }}>☀️</span>
                            <span style={{ color: '#a1a1aa', fontSize: 18, fontWeight: 600 }}>Monday Ritual</span>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                            {ritualItems.map((item, idx) => {
                                const itemOpacity = interpolate(frame, [item.delay, item.delay + 12], [0, 1], {
                                    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
                                });
                                return (
                                    <div key={idx} style={{
                                        opacity: itemOpacity,
                                        background: '#27272a', padding: 18, borderRadius: 14,
                                        borderLeft: `3px solid ${item.color}`,
                                        display: 'flex', alignItems: 'center', gap: 12,
                                    }}>
                                        <span style={{ fontSize: 18 }}>{item.icon}</span>
                                        <span style={{ color: '#d4d4d8', fontSize: 15 }}>{item.label}</span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Notification toasts */}
                    <div style={{
                        background: '#18181b', border: '1px solid rgba(168,85,247,0.2)',
                        borderRadius: 16, padding: '20px 28px',
                        display: 'flex', alignItems: 'center', gap: 16,
                        transform: `translateX(${notif1X}px)`, opacity: notif1O,
                    }}>
                        <span style={{ fontSize: 28 }}>☕</span>
                        <div>
                            <div style={{ color: 'white', fontSize: 16, fontWeight: 600 }}>Coffee match: Priya & Marcus</div>
                            <div style={{ color: '#71717a', fontSize: 14 }}>Schedule your async coffee this week</div>
                        </div>
                    </div>

                    <div style={{
                        background: '#18181b', border: '1px solid rgba(34,197,94,0.2)',
                        borderRadius: 16, padding: '20px 28px',
                        display: 'flex', alignItems: 'center', gap: 16,
                        transform: `translateX(${notif2X}px)`, opacity: notif2O,
                    }}>
                        <span style={{ fontSize: 28 }}>✨</span>
                        <div>
                            <div style={{ color: 'white', fontSize: 16, fontWeight: 600 }}>@sofia gave kudos to @yuki</div>
                            <div style={{ color: '#71717a', fontSize: 14 }}>Absolutely crushed the launch 🐐</div>
                        </div>
                    </div>

                    <div style={{
                        background: '#18181b', border: '1px solid rgba(0,123,255,0.2)',
                        borderRadius: 16, padding: '20px 28px',
                        display: 'flex', alignItems: 'center', gap: 16,
                        transform: `translateX(${notif3X}px)`, opacity: notif3O,
                    }}>
                        <span style={{ fontSize: 28 }}>🎉</span>
                        <div>
                            <div style={{ color: 'white', fontSize: 16, fontWeight: 600 }}>Friday Wins are live!</div>
                            <div style={{ color: '#71717a', fontSize: 14 }}>Share your W from this week</div>
                        </div>
                    </div>
                </div>
            </div>
        </AbsoluteFill>
    );
};
