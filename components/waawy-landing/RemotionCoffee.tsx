'use client';

import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from 'remotion';

export const CoffeeAnimation = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const globalOpacity = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: 'clamp' });
    const globalScale = spring({ frame, fps, from: 0.9, to: 1, config: { damping: 14 } });

    // Profile cards slide in
    const priyaX = interpolate(frame, [15, 35], [-30, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
    const priyaO = interpolate(frame, [15, 35], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

    const marcusX = interpolate(frame, [30, 50], [30, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
    const marcusO = interpolate(frame, [30, 50], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

    // Match icon pop
    const matchScale = spring({ frame: Math.max(0, frame - 50), fps, from: 0, to: 1, config: { damping: 8, stiffness: 180 } });
    const matchO = interpolate(frame, [50, 65], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

    // Message slide up
    const msgY = interpolate(frame, [85, 105], [20, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
    const msgO = interpolate(frame, [85, 105], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

    // Suggestion chips
    const chip1O = interpolate(frame, [110, 125], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
    const chip2O = interpolate(frame, [120, 135], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
    const chip3O = interpolate(frame, [130, 145], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

    return (
        <AbsoluteFill style={{
            backgroundColor: '#09090b',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            opacity: globalOpacity, transform: `scale(${globalScale})`,
        }}>
            {/* Background glow */}
            <div style={{
                position: 'absolute', top: '50%', left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '60%', height: '60%', borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(168,85,247,0.08) 0%, transparent 70%)',
            }} />

            <div style={{
                width: '85%', maxWidth: 500, background: '#18181b',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: 24, padding: '32px 28px',
            }}>
                {/* Header */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 24 }}>
                    <span style={{ fontSize: 20 }}>☕</span>
                    <span style={{ color: '#a1a1aa', fontSize: 15, fontWeight: 600 }}>This week&apos;s coffee pairing</span>
                </div>

                {/* Profiles row */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
                    {/* Priya */}
                    <div style={{
                        flex: 1, opacity: priyaO, transform: `translateX(${priyaX}px)`,
                        background: '#27272a', borderRadius: 16, padding: '16px',
                        border: '1px solid rgba(168,85,247,0.2)', textAlign: 'center',
                    }}>
                        <div style={{ fontSize: 28, marginBottom: 8 }}>🎨</div>
                        <div style={{ color: 'white', fontWeight: 700, fontSize: 15, marginBottom: 2 }}>Priya</div>
                        <div style={{ color: '#71717a', fontSize: 12, marginBottom: 6 }}>Design</div>
                        <div style={{
                            padding: '3px 8px', background: 'rgba(168,85,247,0.12)',
                            borderRadius: 6, color: '#a855f7', fontSize: 11, fontWeight: 600,
                            display: 'inline-block',
                        }}>IST</div>
                    </div>

                    {/* Match icon */}
                    <div style={{
                        opacity: matchO, transform: `scale(${matchScale})`,
                        flexShrink: 0, width: 44, height: 44, borderRadius: '50%',
                        background: 'linear-gradient(135deg, #a855f7, #007BFF)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: 20,
                    }}>
                        ✨
                    </div>

                    {/* Marcus */}
                    <div style={{
                        flex: 1, opacity: marcusO, transform: `translateX(${marcusX}px)`,
                        background: '#27272a', borderRadius: 16, padding: '16px',
                        border: '1px solid rgba(0,123,255,0.2)', textAlign: 'center',
                    }}>
                        <div style={{ fontSize: 28, marginBottom: 8 }}>💻</div>
                        <div style={{ color: 'white', fontWeight: 700, fontSize: 15, marginBottom: 2 }}>Marcus</div>
                        <div style={{ color: '#71717a', fontSize: 12, marginBottom: 6 }}>Engineering</div>
                        <div style={{
                            padding: '3px 8px', background: 'rgba(0,123,255,0.12)',
                            borderRadius: 6, color: '#007BFF', fontSize: 11, fontWeight: 600,
                            display: 'inline-block',
                        }}>PST</div>
                    </div>
                </div>

                {/* Match message */}
                <div style={{
                    opacity: msgO, transform: `translateY(${msgY}px)`,
                    background: 'linear-gradient(135deg, rgba(168,85,247,0.08), rgba(0,123,255,0.08))',
                    borderRadius: 14, padding: '14px 18px',
                    border: '1px solid rgba(168,85,247,0.15)', marginBottom: 14,
                }}>
                    <div style={{ color: 'white', fontSize: 14, fontWeight: 600, marginBottom: 4 }}>
                        You&apos;ve been matched! ☕
                    </div>
                    <div style={{ color: '#71717a', fontSize: 12 }}>
                        15 min async coffee — no agenda, just vibes.
                    </div>
                </div>

                {/* Suggested topics */}
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                    {[
                        { label: '🌍 Life in IST vs PST', o: chip1O },
                        { label: '🎵 Current playlist', o: chip2O },
                        { label: '✈️ Last trip taken', o: chip3O },
                    ].map((chip, idx) => (
                        <div key={idx} style={{
                            opacity: chip.o,
                            padding: '6px 12px', background: '#27272a',
                            borderRadius: 20, color: '#a1a1aa', fontSize: 12, fontWeight: 500,
                            border: '1px solid rgba(255,255,255,0.06)',
                        }}>
                            {chip.label}
                        </div>
                    ))}
                </div>
            </div>
        </AbsoluteFill>
    );
};
