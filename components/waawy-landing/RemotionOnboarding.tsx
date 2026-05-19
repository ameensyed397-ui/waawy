'use client';

import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from 'remotion';

const steps = [
    { icon: '📄', label: 'Contract Signed', color: '#007BFF' },
    { icon: '🛡️', label: 'Right to Work', color: '#22c55e' },
    { icon: '🔒', label: 'GDPR Consent', color: '#a855f7' },
    { icon: '🔑', label: 'Tool Access', color: '#f59e0b' },
    { icon: '✅', label: 'Ready to Go!', color: '#22c55e' },
];

export const OnboardingAnimation = () => {
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
            {/* Background glow */}
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
                    width: '85%',
                    maxWidth: 500,
                    background: '#18181b',
                    border: '1px solid rgba(255,255,255,0.08)',
                    borderRadius: 24,
                    padding: '36px 32px',
                    position: 'relative',
                }}
            >
                {/* Header */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                    <span style={{ fontSize: 20 }}>🚀</span>
                    <span style={{ color: '#a1a1aa', fontSize: 15, fontWeight: 600, letterSpacing: '0.02em' }}>
                        New Hire Onboarding
                    </span>
                </div>
                <div style={{ color: 'white', fontSize: 22, fontWeight: 700, marginBottom: 28 }}>
                    Sarah Mitchell
                </div>

                {/* Steps */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
                    {steps.map((step, idx) => {
                        const stepDelay = 20 + idx * 22;
                        const stepOpacity = interpolate(frame, [stepDelay, stepDelay + 12], [0, 1], {
                            extrapolateLeft: 'clamp',
                            extrapolateRight: 'clamp',
                        });
                        const stepX = interpolate(frame, [stepDelay, stepDelay + 12], [30, 0], {
                            extrapolateLeft: 'clamp',
                            extrapolateRight: 'clamp',
                        });
                        const checkScale = spring({
                            frame: Math.max(0, frame - stepDelay - 8),
                            fps,
                            from: 0,
                            to: 1,
                            config: { damping: 8, stiffness: 200 },
                        });
                        const isComplete = frame > stepDelay + 14;
                        const isLast = idx === steps.length - 1;

                        return (
                            <div key={idx} style={{ display: 'flex', alignItems: 'stretch', gap: 16 }}>
                                {/* Timeline line + dot */}
                                <div
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        width: 32,
                                    }}
                                >
                                    <div
                                        style={{
                                            width: 32,
                                            height: 32,
                                            borderRadius: '50%',
                                            background: isComplete ? step.color : '#27272a',
                                            border: `2px solid ${isComplete ? step.color : '#3f3f46'}`,
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            fontSize: 14,
                                            transform: `scale(${isComplete ? checkScale : 1})`,
                                            transition: 'background 0.3s',
                                            flexShrink: 0,
                                        }}
                                    >
                                        {isComplete ? '✓' : step.icon}
                                    </div>
                                    {!isLast && (
                                        <div
                                            style={{
                                                width: 2,
                                                flex: 1,
                                                minHeight: 16,
                                                background: isComplete
                                                    ? `linear-gradient(180deg, ${step.color}, #27272a)`
                                                    : '#27272a',
                                            }}
                                        />
                                    )}
                                </div>

                                {/* Step content */}
                                <div
                                    style={{
                                        opacity: stepOpacity,
                                        transform: `translateX(${stepX}px)`,
                                        paddingBottom: isLast ? 0 : 20,
                                        display: 'flex',
                                        alignItems: 'flex-start',
                                        paddingTop: 4,
                                    }}
                                >
                                    <span
                                        style={{
                                            color: isComplete ? 'white' : '#71717a',
                                            fontSize: 15,
                                            fontWeight: isComplete ? 600 : 400,
                                        }}
                                    >
                                        {step.label}
                                    </span>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Progress bar */}
                <div style={{ marginTop: 24, height: 6, background: '#27272a', borderRadius: 999, overflow: 'hidden' }}>
                    <div
                        style={{
                            height: '100%',
                            width: `${interpolate(frame, [20, 130], [0, 100], {
                                extrapolateLeft: 'clamp',
                                extrapolateRight: 'clamp',
                            })}%`,
                            background: 'linear-gradient(90deg, #007BFF, #22c55e)',
                            borderRadius: 999,
                        }}
                    />
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8 }}>
                    <span style={{ color: '#52525b', fontSize: 12 }}>10-minute wizard</span>
                    <span style={{ color: '#22c55e', fontSize: 12, fontWeight: 600 }}>
                        {Math.round(
                            interpolate(frame, [20, 130], [0, 100], {
                                extrapolateLeft: 'clamp',
                                extrapolateRight: 'clamp',
                            })
                        )}
                        % complete
                    </span>
                </div>
            </div>
        </AbsoluteFill>
    );
};
