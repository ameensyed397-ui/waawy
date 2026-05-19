'use client';

import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from 'remotion';

export const HeroAnimation = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const scale = spring({
        frame,
        fps,
        from: 0.85,
        to: 1,
        config: { damping: 12 },
    });

    const opacity = interpolate(frame, [0, 25], [0, 1], {
        extrapolateRight: 'clamp',
    });

    const moveUp = interpolate(frame, [0, 25], [40, 0], {
        extrapolateRight: 'clamp',
    });

    // Pulsating glow
    const glowOpacity = interpolate(frame, [0, 75, 150], [0.25, 0.5, 0.25], {
        extrapolateRight: 'clamp',
    });

    // Floating cards
    const card1Y = interpolate(frame, [0, 75, 150], [0, -8, 0], {
        extrapolateRight: 'clamp',
    });
    const card2Y = interpolate(frame, [0, 75, 150], [0, 8, 0], {
        extrapolateRight: 'clamp',
    });

    // Risk score counter
    const riskScore = Math.round(interpolate(frame, [30, 90], [0, 73], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    }));

    // Progress bar fill
    const progressWidth = interpolate(frame, [30, 100], [0, 73], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });

    // Warning indicators
    const warnings = [
        { label: 'Burnout Risk', level: 'HIGH', color: '#ef4444', delay: 40 },
        { label: 'Compliance Gap', level: 'MEDIUM', color: '#f59e0b', delay: 55 },
        { label: 'Engagement Drop', level: 'HIGH', color: '#ef4444', delay: 70 },
    ];

    // Notification slide in
    const notifX = interpolate(frame, [60, 80], [200, 0], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });
    const notifOpacity = interpolate(frame, [60, 80], [0, 1], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });

    // Second notification
    const notif2X = interpolate(frame, [85, 105], [200, 0], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });
    const notif2Opacity = interpolate(frame, [85, 105], [0, 1], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });

    return (
        <AbsoluteFill style={{ backgroundColor: '#09090b', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {/* Background Glow */}
            <div
                style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '80%',
                    height: '80%',
                    borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(239,68,68,0.10) 0%, transparent 70%)',
                    opacity: glowOpacity,
                }}
            />

            <div
                style={{
                    opacity,
                    transform: `scale(${scale}) translateY(${moveUp}px)`,
                    display: 'flex',
                    gap: 40,
                    alignItems: 'stretch',
                    justifyContent: 'center',
                    padding: '40px 60px',
                    width: '100%',
                    maxWidth: 1400,
                }}
            >
                {/* Left: Risk Score Card */}
                <div
                    style={{
                        transform: `translateY(${card1Y}px)`,
                        background: '#18181b',
                        border: '1px solid rgba(255,255,255,0.08)',
                        borderRadius: 24,
                        padding: 40,
                        flex: 1,
                        minWidth: 0,
                        position: 'relative',
                        overflow: 'hidden',
                    }}
                >
                    {/* Subtle glow */}
                    <div style={{
                        position: 'absolute', top: -40, right: -40, width: 200, height: 200,
                        background: 'radial-gradient(circle, rgba(239,68,68,0.15) 0%, transparent 70%)',
                        borderRadius: '50%',
                    }} />

                    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 28 }}>
                        <div style={{ width: 14, height: 14, borderRadius: '50%', background: '#ef4444', boxShadow: '0 0 10px rgba(239,68,68,0.5)' }} />
                        <span style={{ color: '#a1a1aa', fontSize: 18, fontWeight: 600, letterSpacing: '0.02em' }}>Team Risk Score</span>
                    </div>
                    <div style={{ fontSize: 80, fontWeight: 800, color: 'white', lineHeight: 1, letterSpacing: '-0.03em' }}>
                        {riskScore}
                        <span style={{ fontSize: 32, color: '#71717a', fontWeight: 600 }}>/100</span>
                    </div>
                    <div style={{ color: '#ef4444', fontSize: 18, marginTop: 8, fontWeight: 600 }}>Needs attention</div>
                    <div style={{ marginTop: 28, height: 10, background: '#27272a', borderRadius: 999, overflow: 'hidden' }}>
                        <div style={{
                            height: '100%',
                            width: `${progressWidth}%`,
                            background: 'linear-gradient(90deg, #f59e0b, #ef4444)',
                            borderRadius: 999,
                        }} />
                    </div>

                    {/* Warning indicators */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 28 }}>
                        {warnings.map((w, idx) => {
                            const wOpacity = interpolate(frame, [w.delay, w.delay + 12], [0, 1], {
                                extrapolateLeft: 'clamp',
                                extrapolateRight: 'clamp',
                            });
                            return (
                                <div key={idx} style={{
                                    opacity: wOpacity,
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 12,
                                }}>
                                    <div style={{ width: 10, height: 10, borderRadius: '50%', background: w.color, flexShrink: 0 }} />
                                    <span style={{ color: '#d4d4d8', fontSize: 15, flex: 1 }}>{w.label}</span>
                                    <span style={{
                                        color: w.color,
                                        fontSize: 11,
                                        fontWeight: 700,
                                        letterSpacing: '0.06em',
                                        background: `${w.color}18`,
                                        padding: '3px 10px',
                                        borderRadius: 6,
                                    }}>{w.level}</span>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Right: Risk Alerts */}
                <div
                    style={{
                        transform: `translateY(${card2Y}px)`,
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 24,
                        flex: 1,
                        minWidth: 0,
                    }}
                >
                    {/* Alerts Card */}
                    <div style={{
                        background: '#18181b',
                        border: '1px solid rgba(255,255,255,0.08)',
                        borderRadius: 24,
                        padding: 36,
                        flex: 1,
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
                            <span style={{ fontSize: 24 }}>🚨</span>
                            <span style={{ color: '#a1a1aa', fontSize: 18, fontWeight: 600 }}>Risk Alerts</span>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                            <div style={{
                                background: '#27272a', padding: 18, borderRadius: 14,
                                border: '1px solid rgba(239,68,68,0.15)',
                                borderLeft: '3px solid #ef4444',
                            }}>
                                <div style={{ color: '#ef4444', fontWeight: 700, fontSize: 14, marginBottom: 4 }}>Burnout Alert</div>
                                <span style={{ color: '#d4d4d8', fontSize: 15 }}>2 engineers showing disengagement signals for 2+ weeks</span>
                            </div>
                            <div style={{
                                background: '#27272a', padding: 18, borderRadius: 14,
                                border: '1px solid rgba(245,158,11,0.15)',
                                borderLeft: '3px solid #f59e0b',
                            }}>
                                <div style={{ color: '#f59e0b', fontWeight: 700, fontSize: 14, marginBottom: 4 }}>Compliance</div>
                                <span style={{ color: '#d4d4d8', fontSize: 15 }}>3 contractor agreements need review before expiry</span>
                            </div>
                        </div>
                    </div>

                    {/* Risk Notification Toast */}
                    <div style={{
                        background: '#18181b',
                        border: '1px solid rgba(239,68,68,0.2)',
                        borderRadius: 16,
                        padding: '20px 28px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 16,
                        transform: `translateX(${notifX}px)`,
                        opacity: notifOpacity,
                    }}>
                        <div style={{
                            width: 44, height: 44, borderRadius: '50%',
                            background: 'linear-gradient(135deg, #ef4444, #f59e0b)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            fontSize: 22, color: 'white', fontWeight: 700,
                        }}>
                            ⚠
                        </div>
                        <div>
                            <div style={{ color: 'white', fontSize: 16, fontWeight: 600 }}>APAC engagement dropped 18%</div>
                            <div style={{ color: '#71717a', fontSize: 14 }}>Detected across 3 team members this week</div>
                        </div>
                    </div>

                    {/* Second notification */}
                    <div style={{
                        background: '#18181b',
                        border: '1px solid rgba(245,158,11,0.2)',
                        borderRadius: 16,
                        padding: '20px 28px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 16,
                        transform: `translateX(${notif2X}px)`,
                        opacity: notif2Opacity,
                    }}>
                        <div style={{
                            width: 44, height: 44, borderRadius: '50%',
                            background: 'linear-gradient(135deg, #f59e0b, #22c55e)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            fontSize: 22, color: 'white', fontWeight: 700,
                        }}>
                            📋
                        </div>
                        <div>
                            <div style={{ color: 'white', fontSize: 16, fontWeight: 600 }}>Contractor review due in 5 days</div>
                            <div style={{ color: '#71717a', fontSize: 14 }}>Jordan L. — agreement expires March 15</div>
                        </div>
                    </div>
                </div>
            </div>
        </AbsoluteFill>
    );
};
