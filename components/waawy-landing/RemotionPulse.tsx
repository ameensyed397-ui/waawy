'use client';

import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from 'remotion';

const weekData = [
    { day: 'Mon', value: 72, mood: '😐' },
    { day: 'Tue', value: 85, mood: '🔥' },
    { day: 'Wed', value: 68, mood: '😐' },
    { day: 'Thu', value: 91, mood: '🔥' },
    { day: 'Fri', value: 78, mood: '😊' },
];

const nudges = [
    { text: '⚡ 2 team members need attention', color: '#f59e0b' },
    { text: '💜 Team energy trending up +8%', color: '#a855f7' },
];

export const PulseAnimation = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const globalOpacity = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: 'clamp' });
    const globalScale = spring({ frame, fps, from: 0.9, to: 1, config: { damping: 14 } });

    // Animate the average score
    const avgScore = Math.round(
        interpolate(frame, [20, 70], [0, 79], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
        })
    );

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
                    width: '60%',
                    height: '60%',
                    borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(168,85,247,0.08) 0%, transparent 70%)',
                }}
            />

            <div
                style={{
                    width: '85%',
                    maxWidth: 500,
                    background: '#18181b',
                    border: '1px solid rgba(255,255,255,0.08)',
                    borderRadius: 24,
                    padding: '32px 28px',
                }}
            >
                {/* Header */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
                    <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                            <span style={{ fontSize: 18 }}>💜</span>
                            <span style={{ color: '#a1a1aa', fontSize: 14, fontWeight: 600 }}>Weekly Pulse</span>
                        </div>
                        <div style={{ color: 'white', fontSize: 36, fontWeight: 800, lineHeight: 1, letterSpacing: '-0.02em' }}>
                            {avgScore}%
                        </div>
                        <div style={{ color: '#71717a', fontSize: 12, marginTop: 4 }}>team energy this week</div>
                    </div>
                    <div
                        style={{
                            padding: '6px 12px',
                            borderRadius: 20,
                            background: '#22c55e20',
                            color: '#22c55e',
                            fontSize: 13,
                            fontWeight: 600,
                        }}
                    >
                        ↑ 8%
                    </div>
                </div>

                {/* Bar chart */}
                <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8, height: 120, marginBottom: 20 }}>
                    {weekData.map((day, idx) => {
                        const barDelay = 25 + idx * 12;
                        const barHeight = interpolate(frame, [barDelay, barDelay + 20], [0, day.value], {
                            extrapolateLeft: 'clamp',
                            extrapolateRight: 'clamp',
                        });
                        const moodOpacity = interpolate(frame, [barDelay + 15, barDelay + 22], [0, 1], {
                            extrapolateLeft: 'clamp',
                            extrapolateRight: 'clamp',
                        });

                        const barColor = day.value >= 80 ? '#22c55e' : day.value >= 70 ? '#007BFF' : '#f59e0b';

                        return (
                            <div
                                key={idx}
                                style={{
                                    flex: 1,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    gap: 6,
                                }}
                            >
                                <span style={{ fontSize: 16, opacity: moodOpacity }}>{day.mood}</span>
                                <div
                                    style={{
                                        width: '100%',
                                        height: `${barHeight}%`,
                                        background: `linear-gradient(180deg, ${barColor}, ${barColor}66)`,
                                        borderRadius: 8,
                                        minHeight: 4,
                                    }}
                                />
                                <span style={{ color: '#52525b', fontSize: 11, fontWeight: 500 }}>{day.day}</span>
                            </div>
                        );
                    })}
                </div>

                {/* Nudges */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {nudges.map((nudge, idx) => {
                        const nudgeDelay = 90 + idx * 18;
                        const nudgeOpacity = interpolate(frame, [nudgeDelay, nudgeDelay + 12], [0, 1], {
                            extrapolateLeft: 'clamp',
                            extrapolateRight: 'clamp',
                        });
                        const nudgeX = interpolate(frame, [nudgeDelay, nudgeDelay + 12], [20, 0], {
                            extrapolateLeft: 'clamp',
                            extrapolateRight: 'clamp',
                        });

                        return (
                            <div
                                key={idx}
                                style={{
                                    opacity: nudgeOpacity,
                                    transform: `translateX(${nudgeX}px)`,
                                    background: '#27272a',
                                    borderRadius: 12,
                                    padding: '10px 14px',
                                    borderLeft: `3px solid ${nudge.color}`,
                                    color: '#d4d4d8',
                                    fontSize: 13,
                                    fontWeight: 500,
                                }}
                            >
                                {nudge.text}
                            </div>
                        );
                    })}
                </div>
            </div>
        </AbsoluteFill>
    );
};
