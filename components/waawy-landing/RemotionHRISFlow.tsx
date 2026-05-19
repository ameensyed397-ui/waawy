'use client';

import { useCurrentFrame, useVideoConfig, interpolate, spring } from 'remotion';

const PURPLE = '#5235ef';
const LIGHT_PURPLE = '#8771ff';
const BG = '#0d0b1e';

const steps = [
    { icon: '🏢', label: 'Gusto / Rippling', sub: 'Your HRIS' },
    { icon: '⚡', label: 'Syncing…', sub: 'Read-only API' },
    { icon: '🌊', label: 'Waawy', sub: 'Employee Experience' },
];

export const HRISFlowAnimation = () => {
    const frame = useCurrentFrame();
    const { fps, durationInFrames } = useVideoConfig();

    const stepSpring = (delay: number) =>
        spring({ frame: frame - delay, fps, config: { damping: 14, stiffness: 80 } });

    // Pulse ring on the Waawy node
    const pulseScale = 1 + 0.15 * Math.sin((frame / durationInFrames) * Math.PI * 4);
    const pulseOpacity = 0.3 + 0.2 * Math.sin((frame / durationInFrames) * Math.PI * 4);

    // Flowing dot along the connector
    const dotProgress = ((frame % 60) / 60);

    // Card data entries that appear
    const cardItems = [
        { label: 'Priya Sharma', sub: 'Day 1 welcome sent ✓', delay: 40 },
        { label: 'Team intro', sub: 'Coffee chat scheduled ✓', delay: 55 },
        { label: 'Alex Chen — 90 days', sub: 'Manager nudge sent ✓', delay: 70 },
        { label: 'Friday Wins 🎉', sub: 'Recognition round-up live', delay: 85 },
    ];

    return (
        <div style={{
            width: '100%',
            height: '100%',
            background: BG,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: 'Inter, system-ui, sans-serif',
            padding: '40px',
            position: 'relative',
            overflow: 'hidden',
        }}>
            {/* Background glow */}
            <div style={{
                position: 'absolute',
                top: '20%',
                left: '10%',
                width: 300,
                height: 300,
                background: `radial-gradient(circle, ${PURPLE}30, transparent 70%)`,
                borderRadius: '50%',
                filter: 'blur(40px)',
            }} />
            <div style={{
                position: 'absolute',
                bottom: '10%',
                right: '15%',
                width: 250,
                height: 250,
                background: `radial-gradient(circle, ${LIGHT_PURPLE}20, transparent 70%)`,
                borderRadius: '50%',
                filter: 'blur(40px)',
            }} />

            <div style={{ width: '100%', maxWidth: 700, position: 'relative', zIndex: 1 }}>
                {/* Top: HRIS → Waawy connector */}
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: 40,
                }}>
                    {steps.map((step, i) => {
                        const s = stepSpring(i * 15);
                        return (
                            <div key={i} style={{ display: 'flex', alignItems: 'center', flex: i === 1 ? 1 : 0 }}>
                                {i !== 1 ? (
                                    <div style={{
                                        opacity: s,
                                        transform: `scale(${s})`,
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        gap: 8,
                                    }}>
                                        <div style={{
                                            width: 72,
                                            height: 72,
                                            borderRadius: 20,
                                            background: i === 2
                                                ? `linear-gradient(135deg, ${PURPLE}, ${LIGHT_PURPLE})`
                                                : '#1a1a2e',
                                            border: `1.5px solid ${i === 2 ? PURPLE : '#2a2a4a'}`,
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            fontSize: 28,
                                            position: 'relative',
                                        }}>
                                            {step.icon}
                                            {i === 2 && (
                                                <div style={{
                                                    position: 'absolute',
                                                    inset: -8,
                                                    borderRadius: 28,
                                                    border: `1.5px solid ${PURPLE}`,
                                                    opacity: pulseOpacity,
                                                    transform: `scale(${pulseScale})`,
                                                }} />
                                            )}
                                        </div>
                                        <div style={{ textAlign: 'center' }}>
                                            <div style={{ color: '#fff', fontWeight: 700, fontSize: 13 }}>{step.label}</div>
                                            <div style={{ color: '#5a5a8a', fontSize: 11, marginTop: 2 }}>{step.sub}</div>
                                        </div>
                                    </div>
                                ) : (
                                    // Connector
                                    <div style={{
                                        flex: 1,
                                        margin: '0 16px',
                                        position: 'relative',
                                        height: 2,
                                        background: `linear-gradient(90deg, #2a2a4a, ${PURPLE}60, #2a2a4a)`,
                                        opacity: stepSpring(10),
                                    }}>
                                        {/* Moving dot */}
                                        <div style={{
                                            position: 'absolute',
                                            top: -4,
                                            left: `${dotProgress * 100}%`,
                                            width: 10,
                                            height: 10,
                                            borderRadius: '50%',
                                            background: LIGHT_PURPLE,
                                            boxShadow: `0 0 8px ${LIGHT_PURPLE}`,
                                            transform: 'translateX(-50%)',
                                        }} />
                                        <div style={{
                                            position: 'absolute',
                                            top: -10,
                                            left: '50%',
                                            transform: 'translateX(-50%)',
                                            background: '#12102a',
                                            border: `1px solid #2a2a4a`,
                                            borderRadius: 8,
                                            padding: '3px 10px',
                                            whiteSpace: 'nowrap',
                                        }}>
                                            <span style={{ color: LIGHT_PURPLE, fontSize: 10, fontWeight: 600 }}>Read-only API</span>
                                        </div>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>

                {/* Bottom: Action cards */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    {cardItems.map((item, i) => {
                        const cardSpring = spring({ frame: frame - item.delay, fps, config: { damping: 16, stiffness: 70 } });
                        const slideX = interpolate(cardSpring, [0, 1], [-30, 0]);
                        return (
                            <div key={i} style={{
                                opacity: cardSpring,
                                transform: `translateX(${slideX}px)`,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                background: '#12102a',
                                border: `1px solid #2a2a4a`,
                                borderRadius: 14,
                                padding: '12px 18px',
                            }}>
                                <div>
                                    <div style={{ color: '#fff', fontWeight: 600, fontSize: 13 }}>{item.label}</div>
                                    <div style={{ color: '#5a5a8a', fontSize: 11, marginTop: 2 }}>{item.sub}</div>
                                </div>
                                <div style={{
                                    width: 8,
                                    height: 8,
                                    borderRadius: '50%',
                                    background: '#22c55e',
                                    boxShadow: '0 0 6px #22c55e',
                                }} />
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};
