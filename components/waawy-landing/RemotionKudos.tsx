'use client';

import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from 'remotion';

const kudos = [
    {
        from: '@sarah',
        message: 'crushed the Q4 launch. Absolute legend 🐐',
        value: 'Ownership',
        reactions: 12,
        color: '#007BFF',
    },
    {
        from: '@alex',
        message: 'onboarded 3 new hires seamlessly this week 🚀',
        value: 'Team Spirit',
        reactions: 8,
        color: '#a855f7',
    },
    {
        from: '@jordan',
        message: 'wrote docs that actually make sense 🤌',
        value: 'Craft',
        reactions: 15,
        color: '#22c55e',
    },
];

export const KudosAnimation = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const globalOpacity = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: 'clamp' });
    const globalScale = spring({ frame, fps, from: 0.9, to: 1, config: { damping: 14 } });

    // Animate reaction counters
    const totalKudos = Math.round(
        interpolate(frame, [10, 60], [0, 147], {
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
                    background: 'radial-gradient(circle, rgba(34,197,94,0.08) 0%, transparent 70%)',
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
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <span style={{ fontSize: 20 }}>✨</span>
                        <span style={{ color: '#a1a1aa', fontSize: 15, fontWeight: 600 }}>Kudos Wall</span>
                    </div>
                    <div style={{ color: '#71717a', fontSize: 13 }}>
                        <span style={{ color: '#22c55e', fontWeight: 700 }}>{totalKudos}</span> this month
                    </div>
                </div>

                {/* Kudos cards */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                    {kudos.map((kudo, idx) => {
                        const cardDelay = 20 + idx * 25;
                        const cardOpacity = interpolate(frame, [cardDelay, cardDelay + 15], [0, 1], {
                            extrapolateLeft: 'clamp',
                            extrapolateRight: 'clamp',
                        });
                        const cardY = interpolate(frame, [cardDelay, cardDelay + 15], [20, 0], {
                            extrapolateLeft: 'clamp',
                            extrapolateRight: 'clamp',
                        });

                        // Animate individual reaction counter
                        const rxnCount = Math.round(
                            interpolate(frame, [cardDelay + 10, cardDelay + 30], [0, kudo.reactions], {
                                extrapolateLeft: 'clamp',
                                extrapolateRight: 'clamp',
                            })
                        );

                        return (
                            <div
                                key={idx}
                                style={{
                                    opacity: cardOpacity,
                                    transform: `translateY(${cardY}px)`,
                                    background: '#27272a',
                                    borderRadius: 16,
                                    padding: '16px 18px',
                                    border: '1px solid rgba(255,255,255,0.05)',
                                }}
                            >
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                    <div style={{ flex: 1 }}>
                                        <div style={{ marginBottom: 6 }}>
                                            <span style={{ color: kudo.color, fontWeight: 700, fontSize: 14 }}>
                                                {kudo.from}
                                            </span>
                                            <span style={{ color: '#d4d4d8', fontSize: 14 }}> {kudo.message}</span>
                                        </div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                                            <span
                                                style={{
                                                    padding: '2px 8px',
                                                    borderRadius: 6,
                                                    background: `${kudo.color}15`,
                                                    color: kudo.color,
                                                    fontSize: 11,
                                                    fontWeight: 600,
                                                }}
                                            >
                                                #{kudo.value}
                                            </span>
                                            <span style={{ color: '#52525b', fontSize: 12 }}>
                                                ❤️ {rxnCount}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Friday Wins banner */}
                <div
                    style={{
                        marginTop: 16,
                        opacity: interpolate(frame, [100, 115], [0, 1], {
                            extrapolateLeft: 'clamp',
                            extrapolateRight: 'clamp',
                        }),
                        transform: `translateY(${interpolate(frame, [100, 115], [10, 0], {
                            extrapolateLeft: 'clamp',
                            extrapolateRight: 'clamp',
                        })}px)`,
                        background: 'linear-gradient(135deg, #007BFF15, #a855f715)',
                        borderRadius: 12,
                        padding: '12px 16px',
                        border: '1px solid rgba(0,123,255,0.15)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 10,
                    }}
                >
                    <span style={{ fontSize: 18 }}>🎉</span>
                    <div>
                        <div style={{ color: 'white', fontSize: 13, fontWeight: 600 }}>Friday Wins are live!</div>
                        <div style={{ color: '#71717a', fontSize: 11 }}>Share your W from this week</div>
                    </div>
                </div>
            </div>
        </AbsoluteFill>
    );
};
