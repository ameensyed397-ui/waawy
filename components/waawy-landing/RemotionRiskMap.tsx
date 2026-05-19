'use client';

import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from 'remotion';

const riskIndicators = [
    { label: 'Burnout Risk', level: 'High', color: '#ef4444', value: 72 },
    { label: 'Engagement', level: 'Medium', color: '#f59e0b', value: 58 },
    { label: 'Compliance', level: 'Low', color: '#22c55e', value: 91 },
];

export const RemotionRiskMap = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const globalOpacity = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: 'clamp' });
    const globalScale = spring({ frame, fps, from: 0.9, to: 1, config: { damping: 14 } });

    const gaugeValue = interpolate(frame, [20, 80], [0, 72], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });

    const trendProgress = interpolate(frame, [30, 100], [0, 1], {
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
                    background: 'radial-gradient(circle, rgba(239,68,68,0.08) 0%, transparent 70%)',
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
                    <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#ef4444', boxShadow: '0 0 8px rgba(239,68,68,0.5)' }} />
                    <span style={{ color: '#a1a1aa', fontSize: 14, fontWeight: 600, letterSpacing: '0.02em' }}>Risk Dashboard</span>
                </div>

                {/* Burnout Gauge */}
                <div style={{ marginBottom: 20 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                        <span style={{ color: '#71717a', fontSize: 12 }}>Burnout Index</span>
                        <span style={{ color: '#ef4444', fontSize: 14, fontWeight: 700 }}>{Math.round(gaugeValue)}%</span>
                    </div>
                    <div style={{ height: 8, background: '#27272a', borderRadius: 999, overflow: 'hidden' }}>
                        <div style={{
                            height: '100%',
                            width: `${gaugeValue}%`,
                            background: 'linear-gradient(90deg, #f59e0b, #ef4444)',
                            borderRadius: 999,
                        }} />
                    </div>
                </div>

                {/* Engagement Trend Line */}
                <div style={{ marginBottom: 20, padding: '12px 0' }}>
                    <span style={{ color: '#71717a', fontSize: 12, marginBottom: 8, display: 'block' }}>Engagement Trend (4 weeks)</span>
                    <svg width="100%" height="48" viewBox="0 0 460 48" style={{ overflow: 'visible' }}>
                        <polyline
                            points="0,36 80,28 160,32 240,20 320,24 400,12 460,8"
                            fill="none"
                            stroke="#3f3f46"
                            strokeWidth="2"
                        />
                        <polyline
                            points="0,36 80,28 160,32 240,20 320,24 400,12 460,8"
                            fill="none"
                            stroke="#f59e0b"
                            strokeWidth="2"
                            strokeDasharray="1200"
                            strokeDashoffset={1200 * (1 - trendProgress)}
                        />
                    </svg>
                </div>

                {/* Risk Indicators */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    {riskIndicators.map((item, idx) => {
                        const delay = 40 + idx * 18;
                        const itemOpacity = interpolate(frame, [delay, delay + 12], [0, 1], {
                            extrapolateLeft: 'clamp',
                            extrapolateRight: 'clamp',
                        });
                        const barWidth = interpolate(frame, [delay, delay + 30], [0, item.value], {
                            extrapolateLeft: 'clamp',
                            extrapolateRight: 'clamp',
                        });

                        return (
                            <div key={idx} style={{
                                opacity: itemOpacity,
                                display: 'flex',
                                alignItems: 'center',
                                gap: 12,
                                background: '#27272a',
                                borderRadius: 12,
                                padding: '10px 14px',
                            }}>
                                <div style={{
                                    width: 8,
                                    height: 8,
                                    borderRadius: '50%',
                                    background: item.color,
                                    flexShrink: 0,
                                }} />
                                <span style={{ color: '#d4d4d8', fontSize: 13, fontWeight: 500, width: 90 }}>{item.label}</span>
                                <div style={{ flex: 1, height: 6, background: '#18181b', borderRadius: 999, overflow: 'hidden' }}>
                                    <div style={{
                                        height: '100%',
                                        width: `${barWidth}%`,
                                        background: item.color,
                                        borderRadius: 999,
                                    }} />
                                </div>
                                <span style={{
                                    color: item.color,
                                    fontSize: 11,
                                    fontWeight: 700,
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.05em',
                                    width: 52,
                                    textAlign: 'right',
                                }}>{item.level}</span>
                            </div>
                        );
                    })}
                </div>
            </div>
        </AbsoluteFill>
    );
};
