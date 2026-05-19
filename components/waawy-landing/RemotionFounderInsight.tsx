'use client';

import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from 'remotion';

const riskItems = [
    {
        title: 'Burnout risk in Engineering',
        severity: 'High',
        severityColor: '#ef4444',
        action: 'Schedule 1:1 with 2 flagged engineers',
    },
    {
        title: '3 contractor agreements expiring',
        severity: 'Medium',
        severityColor: '#f59e0b',
        action: 'Review and renew before March 15',
    },
    {
        title: 'APAC timezone engagement drop',
        severity: 'Medium',
        severityColor: '#f59e0b',
        action: 'Adjust async standup cadence',
    },
];

export const RemotionFounderInsight = () => {
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
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
                    <span style={{ fontSize: 16 }}>📊</span>
                    <span style={{ color: '#a1a1aa', fontSize: 14, fontWeight: 600, letterSpacing: '0.02em' }}>Founder Brief</span>
                    <span style={{ marginLeft: 'auto', color: '#52525b', fontSize: 11 }}>Weekly Summary</span>
                </div>
                <div style={{ color: 'white', fontSize: 18, fontWeight: 700, marginBottom: 20 }}>
                    3 items need your attention
                </div>

                {/* Risk items */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                    {riskItems.map((item, idx) => {
                        const delay = 20 + idx * 22;
                        const itemOpacity = interpolate(frame, [delay, delay + 14], [0, 1], {
                            extrapolateLeft: 'clamp',
                            extrapolateRight: 'clamp',
                        });
                        const itemY = interpolate(frame, [delay, delay + 14], [16, 0], {
                            extrapolateLeft: 'clamp',
                            extrapolateRight: 'clamp',
                        });

                        return (
                            <div key={idx} style={{
                                opacity: itemOpacity,
                                transform: `translateY(${itemY}px)`,
                                background: '#27272a',
                                borderRadius: 14,
                                padding: '14px 16px',
                                borderLeft: `3px solid ${item.severityColor}`,
                            }}>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
                                    <span style={{ color: '#d4d4d8', fontSize: 13, fontWeight: 600 }}>{item.title}</span>
                                    <span style={{
                                        color: item.severityColor,
                                        fontSize: 10,
                                        fontWeight: 700,
                                        textTransform: 'uppercase',
                                        letterSpacing: '0.06em',
                                        background: `${item.severityColor}18`,
                                        padding: '3px 8px',
                                        borderRadius: 6,
                                    }}>{item.severity}</span>
                                </div>
                                <div style={{ color: '#71717a', fontSize: 11 }}>
                                    → {item.action}
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Bottom action */}
                <div style={{
                    marginTop: 18,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 8,
                    opacity: interpolate(frame, [90, 110], [0, 1], {
                        extrapolateLeft: 'clamp',
                        extrapolateRight: 'clamp',
                    }),
                }}>
                    <div style={{
                        background: '#007BFF',
                        color: 'white',
                        fontSize: 12,
                        fontWeight: 700,
                        padding: '8px 20px',
                        borderRadius: 10,
                    }}>
                        View Full Report →
                    </div>
                </div>
            </div>
        </AbsoluteFill>
    );
};
