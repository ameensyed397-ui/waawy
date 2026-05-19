'use client';

import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from 'remotion';

const teamMembers = [
    { name: 'Sarah M.', role: 'Engineer', status: 'green', score: 88, trend: 'up' },
    { name: 'Alex K.', role: 'Designer', status: 'amber', score: 62, trend: 'down' },
    { name: 'Jordan L.', role: 'PM', status: 'green', score: 79, trend: 'up' },
    { name: 'Priya R.', role: 'Engineer', status: 'red', score: 34, trend: 'down' },
    { name: 'Kai T.', role: 'DevOps', status: 'amber', score: 55, trend: 'flat' },
];

const statusColors: Record<string, string> = {
    green: '#22c55e',
    amber: '#f59e0b',
    red: '#ef4444',
};

const trendArrows: Record<string, string> = {
    up: '↑',
    down: '↓',
    flat: '→',
};

export const RemotionHealthSignals = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const globalOpacity = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: 'clamp' });
    const globalScale = spring({ frame, fps, from: 0.9, to: 1, config: { damping: 14 } });

    const overallScore = Math.round(interpolate(frame, [20, 70], [0, 64], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    }));

    const meterAngle = interpolate(frame, [20, 70], [-90, 25], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });

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
                    background: 'radial-gradient(circle, rgba(245,158,11,0.08) 0%, transparent 70%)',
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
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#f59e0b', boxShadow: '0 0 8px rgba(245,158,11,0.5)' }} />
                        <span style={{ color: '#a1a1aa', fontSize: 14, fontWeight: 600, letterSpacing: '0.02em' }}>Health Signals</span>
                    </div>
                    {/* Score meter */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <svg width="36" height="20" viewBox="0 0 36 20" style={{ overflow: 'visible' }}>
                            <path d="M 4 18 A 14 14 0 0 1 32 18" fill="none" stroke="#27272a" strokeWidth="4" strokeLinecap="round" />
                            <path d="M 4 18 A 14 14 0 0 1 32 18" fill="none" stroke="#f59e0b" strokeWidth="4" strokeLinecap="round"
                                strokeDasharray="44" strokeDashoffset={44 * (1 - (overallScore / 100))} />
                            <line x1="18" y1="18" x2="18" y2="6"
                                stroke="#d4d4d8" strokeWidth="2" strokeLinecap="round"
                                transform={`rotate(${meterAngle}, 18, 18)`}
                            />
                        </svg>
                        <span style={{ color: '#f59e0b', fontSize: 18, fontWeight: 800 }}>{overallScore}</span>
                    </div>
                </div>

                {/* Team members */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {teamMembers.map((member, idx) => {
                        const delay = 25 + idx * 14;
                        const rowOpacity = interpolate(frame, [delay, delay + 12], [0, 1], {
                            extrapolateLeft: 'clamp',
                            extrapolateRight: 'clamp',
                        });
                        const rowX = interpolate(frame, [delay, delay + 12], [20, 0], {
                            extrapolateLeft: 'clamp',
                            extrapolateRight: 'clamp',
                        });

                        const statusColor = statusColors[member.status];
                        const trendColor = member.trend === 'up' ? '#22c55e' : member.trend === 'down' ? '#ef4444' : '#71717a';

                        return (
                            <div key={idx} style={{
                                opacity: rowOpacity,
                                transform: `translateX(${rowX}px)`,
                                display: 'flex',
                                alignItems: 'center',
                                gap: 12,
                                background: '#27272a',
                                borderRadius: 12,
                                padding: '10px 14px',
                            }}>
                                {/* Status dot */}
                                <div style={{
                                    width: 10,
                                    height: 10,
                                    borderRadius: '50%',
                                    background: statusColor,
                                    boxShadow: `0 0 6px ${statusColor}80`,
                                    flexShrink: 0,
                                }} />
                                {/* Name & role */}
                                <div style={{ flex: 1, minWidth: 0 }}>
                                    <div style={{ color: '#d4d4d8', fontSize: 13, fontWeight: 600 }}>{member.name}</div>
                                    <div style={{ color: '#52525b', fontSize: 10 }}>{member.role}</div>
                                </div>
                                {/* Score */}
                                <span style={{ color: statusColor, fontSize: 14, fontWeight: 700, width: 30, textAlign: 'right' }}>{member.score}</span>
                                {/* Trend arrow */}
                                <span style={{ color: trendColor, fontSize: 14, fontWeight: 700, width: 16, textAlign: 'center' }}>
                                    {trendArrows[member.trend]}
                                </span>
                            </div>
                        );
                    })}
                </div>
            </div>
        </AbsoluteFill>
    );
};
