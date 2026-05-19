'use client';

import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from 'remotion';

const countries = [
    { flag: '🇺🇸', name: 'United States', count: 12, x: 120, y: 140 },
    { flag: '🇬🇧', name: 'United Kingdom', count: 8, x: 260, y: 110 },
    { flag: '🇩🇪', name: 'Germany', count: 5, x: 310, y: 125 },
    { flag: '🇮🇳', name: 'India', count: 9, x: 380, y: 180 },
    { flag: '🇧🇷', name: 'Brazil', count: 4, x: 180, y: 240 },
];

const employmentTypes = [
    { label: 'Full-time', count: 24, color: '#007BFF', pct: 63 },
    { label: 'Part-time', count: 8, color: '#a855f7', pct: 21 },
    { label: 'Contractor', count: 6, color: '#f59e0b', pct: 16 },
];

export const RemotionWorkforce = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const globalOpacity = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: 'clamp' });
    const globalScale = spring({ frame, fps, from: 0.9, to: 1, config: { damping: 14 } });

    return (
        <AbsoluteFill
            style={{
                backgroundColor: '#09090b',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                opacity: globalOpacity,
                transform: `scale(${globalScale})`,
            }}
        >
            <div
                style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '70%',
                    height: '70%',
                    borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(0,123,255,0.08) 0%, transparent 70%)',
                }}
            />

            <div
                style={{
                    width: '88%',
                    maxWidth: 520,
                    background: '#18181b',
                    border: '1px solid rgba(255,255,255,0.08)',
                    borderRadius: 24,
                    padding: '28px 28px',
                }}
            >
                {/* Header */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
                    <span style={{ fontSize: 16 }}>🌍</span>
                    <span style={{ color: '#a1a1aa', fontSize: 14, fontWeight: 600, letterSpacing: '0.02em' }}>Workforce Overview</span>
                    <span style={{ marginLeft: 'auto', color: '#71717a', fontSize: 12 }}>38 people</span>
                </div>

                {/* Map dots */}
                <div style={{ position: 'relative', height: 120, marginBottom: 16, background: '#0f0f11', borderRadius: 14, overflow: 'hidden' }}>
                    {countries.map((c, idx) => {
                        const delay = 15 + idx * 12;
                        const dotScale = spring({
                            frame: Math.max(0, frame - delay),
                            fps,
                            from: 0,
                            to: 1,
                            config: { damping: 10, stiffness: 150 },
                        });
                        const dotOpacity = interpolate(frame, [delay, delay + 10], [0, 1], {
                            extrapolateLeft: 'clamp',
                            extrapolateRight: 'clamp',
                        });

                        return (
                            <div key={idx} style={{
                                position: 'absolute',
                                left: c.x * (520 - 56) / 460,
                                top: c.y * 120 / 320,
                                transform: `scale(${dotScale})`,
                                opacity: dotOpacity,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                            }}>
                                <span style={{ fontSize: 18 }}>{c.flag}</span>
                                <span style={{ color: '#71717a', fontSize: 9, marginTop: 2 }}>{c.count}</span>
                            </div>
                        );
                    })}
                </div>

                {/* Employment type breakdown */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    {employmentTypes.map((type, idx) => {
                        const delay = 50 + idx * 14;
                        const itemOpacity = interpolate(frame, [delay, delay + 12], [0, 1], {
                            extrapolateLeft: 'clamp',
                            extrapolateRight: 'clamp',
                        });
                        const barWidth = interpolate(frame, [delay, delay + 30], [0, type.pct], {
                            extrapolateLeft: 'clamp',
                            extrapolateRight: 'clamp',
                        });

                        return (
                            <div key={idx} style={{
                                opacity: itemOpacity,
                                display: 'flex',
                                alignItems: 'center',
                                gap: 12,
                            }}>
                                <span style={{ color: '#d4d4d8', fontSize: 12, fontWeight: 500, width: 80 }}>{type.label}</span>
                                <div style={{ flex: 1, height: 8, background: '#27272a', borderRadius: 999, overflow: 'hidden' }}>
                                    <div style={{
                                        height: '100%',
                                        width: `${barWidth}%`,
                                        background: type.color,
                                        borderRadius: 999,
                                    }} />
                                </div>
                                <span style={{ color: type.color, fontSize: 13, fontWeight: 700, width: 28, textAlign: 'right' }}>{type.count}</span>
                            </div>
                        );
                    })}
                </div>

                {/* Contract status cards */}
                <div style={{ display: 'flex', gap: 10, marginTop: 16 }}>
                    {[
                        { label: 'Active', count: 34, color: '#22c55e' },
                        { label: 'Expiring', count: 3, color: '#f59e0b' },
                        { label: 'Review', count: 1, color: '#ef4444' },
                    ].map((status, idx) => {
                        const delay = 80 + idx * 10;
                        const cardOpacity = interpolate(frame, [delay, delay + 12], [0, 1], {
                            extrapolateLeft: 'clamp',
                            extrapolateRight: 'clamp',
                        });
                        return (
                            <div key={idx} style={{
                                opacity: cardOpacity,
                                flex: 1,
                                background: '#27272a',
                                borderRadius: 12,
                                padding: '10px 12px',
                                textAlign: 'center',
                            }}>
                                <div style={{ color: status.color, fontSize: 20, fontWeight: 800 }}>{status.count}</div>
                                <div style={{ color: '#71717a', fontSize: 10, marginTop: 2 }}>{status.label}</div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </AbsoluteFill>
    );
};
