import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Waawy — You Can\'t Scale from 20 to 50 People with Manual Onboarding. Stop losing 40% of new hires in their first 90 days.';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function Image() {
    return new ImageResponse(
        (
            <div
                style={{
                    background: '#f0f2f6',
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontFamily: 'sans-serif',
                    position: 'relative',
                    overflow: 'hidden',
                    padding: '56px 80px',
                }}
            >
                {/* Blue glow top-left */}
                <div style={{ position: 'absolute', top: -150, left: -150, width: 600, height: 600, borderRadius: '50%', background: 'radial-gradient(circle, rgba(0,123,255,0.18) 0%, transparent 70%)', filter: 'blur(40px)' }} />
                {/* Light-blue glow bottom-right */}
                <div style={{ position: 'absolute', bottom: -100, right: -100, width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(56,176,252,0.14) 0%, transparent 70%)', filter: 'blur(50px)' }} />

                {/* Top row: Logo + Badge */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', marginBottom: 44 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <svg width="36" height="36" viewBox="0 0 38 38" fill="none">
                            <path d="M19 36.9065C28.9411 36.9065 37 28.8686 37 18.9532C37 9.03794 28.9411 1 19 1C9.05887 1 1 9.03794 1 18.9532C1 28.8686 9.05887 36.9065 19 36.9065Z" stroke="#007AFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M27.1 35.8443C25.7748 36.5888 24.282 36.9862 22.7611 36.9994C21.2402 37.0126 19.7407 36.6411 18.4028 35.9196C17.0648 35.1981 15.932 34.1502 15.1101 32.8738C14.2882 31.5973 13.804 30.1339 13.7029 28.6202C13.6017 27.1065 13.8868 25.592 14.5315 24.218C15.1762 22.844 16.1596 21.6554 17.3897 20.7632C18.6198 19.8709 20.0566 19.3042 21.5658 19.1159C23.075 18.9276 24.6074 19.1238 26.02 19.6863C25.5425 16.6325 23.9534 13.8613 21.5565 11.9023C19.1596 9.94336 16.123 8.93407 13.0271 9.06736C9.9312 9.20065 6.9931 10.4672 4.77437 12.6248C2.55565 14.7825 1.21191 17.68 1 20.7635" stroke="#007AFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <span style={{ fontSize: 26, fontWeight: 800, color: '#007BFF', letterSpacing: -0.5 }}>waawy</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: '#f0fdf4', border: '1.5px solid #86efac', borderRadius: 999, padding: '8px 18px' }}>
                        <span style={{ fontSize: 15 }}>🎉</span>
                        <span style={{ fontSize: 12, fontWeight: 700, color: '#15803d', letterSpacing: 1.2, textTransform: 'uppercase' }}>FREE BETA · First 100 Companies · Lifetime Access</span>
                    </div>
                </div>

                {/* Main headline */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', marginBottom: 28 }}>
                    <span style={{ fontSize: 60, fontWeight: 900, color: '#101011', letterSpacing: -2, lineHeight: 1.08 }}>
                        You Can&apos;t Scale from 20 to 50 People
                    </span>
                    <span style={{ fontSize: 60, fontWeight: 900, color: '#007BFF', letterSpacing: -2, lineHeight: 1.08, marginTop: 4 }}>
                        with manual onboarding.
                    </span>
                </div>

                {/* Stat pill */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, background: 'white', border: '1.5px solid #e2e5ed', borderRadius: 14, padding: '13px 26px', marginBottom: 40 }}>
                    <span style={{ fontSize: 17, fontWeight: 800, color: '#ef4444' }}>40% of new hires</span>
                    <span style={{ fontSize: 17, color: '#606266' }}>consider quitting in their first 90 days.</span>
                    <span style={{ fontSize: 17, fontWeight: 700, color: '#101011' }}>Waawy fixes that.</span>
                </div>

                {/* HRIS trust bar */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <span style={{ fontSize: 11, fontWeight: 700, color: '#a7a7a7', letterSpacing: 1.5, textTransform: 'uppercase', marginRight: 6 }}>Works with</span>
                    {['Gusto', 'Rippling', 'BambooHR', 'ADP'].map((name) => (
                        <span key={name} style={{ fontSize: 13, fontWeight: 600, color: '#606266', background: 'white', border: '1.5px solid #e2e5ed', borderRadius: 10, padding: '6px 14px' }}>{name}</span>
                    ))}
                    <span style={{ fontSize: 12, color: '#a7a7a7', marginLeft: 4 }}>+ any HRIS</span>
                </div>
            </div>
        ),
        { ...size },
    );
}
