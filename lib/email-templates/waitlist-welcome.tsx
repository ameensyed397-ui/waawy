import * as React from 'react';

interface WaitlistWelcomeProps {
    email: string;
    surveyUrl: string;
}

export const WaitlistWelcomeEmail: React.FC<WaitlistWelcomeProps> = ({
    email,
    surveyUrl,
}) => {
    return (
        <html>
            <body style={{ margin: 0, padding: 0, backgroundColor: '#09090b', fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif" }}>
                <table width="100%" cellPadding={0} cellSpacing={0} style={{ backgroundColor: '#09090b', padding: '40px 0' }}>
                    <tr>
                        <td align="center">
                            <table width="600" cellPadding={0} cellSpacing={0} style={{ maxWidth: '600px', width: '100%', backgroundColor: '#18181b', borderRadius: '16px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.08)' }}>
                                {/* Header */}
                                <tr>
                                    <td style={{ background: 'linear-gradient(135deg, #007AFF 0%, #0051D5 100%)', padding: '40px 32px', textAlign: 'center' as const }}>
                                        <h1 style={{ fontSize: '32px', fontWeight: 700, color: '#ffffff', margin: 0 }}>
                                            ~ waawy
                                        </h1>
                                    </td>
                                </tr>

                                {/* Content */}
                                <tr>
                                    <td style={{ padding: '40px 32px' }}>
                                        <h2 style={{ fontSize: '28px', fontWeight: 700, color: '#ffffff', margin: '0 0 8px 0' }}>
                                            You made it. Welcome in.
                                        </h2>
                                        <p style={{ fontSize: '14px', color: '#71717a', margin: '0 0 24px 0' }}>
                                            (No, this isn&apos;t another generic waitlist email.)
                                        </p>

                                        <p style={{ fontSize: '16px', color: '#a1a1aa', margin: '0 0 24px 0', lineHeight: '1.7' }}>
                                            Hey there — thanks for signing up with{' '}
                                            <span style={{ color: '#ffffff', fontWeight: 600 }}>{email}</span>.
                                            You just joined a small group of founders and HR leads who are
                                            tired of duct-taping their people ops together.
                                        </p>

                                        <p style={{ fontSize: '16px', color: '#a1a1aa', margin: '0 0 24px 0', lineHeight: '1.7' }}>
                                            We&apos;re building Waawy because remote teams deserve better than
                                            spreadsheets and Slack prayers. Real pulse checks. Actual human
                                            connection. The stuff that keeps people from quietly quitting.
                                        </p>

                                        {/* What you get */}
                                        <table width="100%" cellPadding={0} cellSpacing={0} style={{ margin: '24px 0' }}>
                                            <tr>
                                                <td style={{ padding: '8px 0', fontSize: '15px', color: '#d4d4d8', lineHeight: '1.6' }}>
                                                    <span style={{ marginRight: '10px', fontSize: '18px' }}>&#128640;</span>
                                                    <strong style={{ color: '#ffffff' }}>First in line</strong> — you&apos;ll get access before anyone else
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style={{ padding: '8px 0', fontSize: '15px', color: '#d4d4d8', lineHeight: '1.6' }}>
                                                    <span style={{ marginRight: '10px', fontSize: '18px' }}>&#128176;</span>
                                                    <strong style={{ color: '#ffffff' }}>Founder pricing</strong> — locked in forever, no bait-and-switch
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style={{ padding: '8px 0', fontSize: '15px', color: '#d4d4d8', lineHeight: '1.6' }}>
                                                    <span style={{ marginRight: '10px', fontSize: '18px' }}>&#128736;</span>
                                                    <strong style={{ color: '#ffffff' }}>Your voice matters</strong> — tell us what to build and we actually will
                                                </td>
                                            </tr>
                                        </table>

                                        {/* Survey CTA */}
                                        <table width="100%" cellPadding={0} cellSpacing={0} style={{ backgroundColor: '#27272a', borderRadius: '12px', margin: '28px 0' }}>
                                            <tr>
                                                <td style={{ padding: '28px 24px', textAlign: 'center' as const }}>
                                                    <p style={{ fontSize: '18px', fontWeight: 600, color: '#ffffff', margin: '0 0 8px 0' }}>
                                                        Want to skip the line?
                                                    </p>
                                                    <p style={{ fontSize: '14px', color: '#71717a', margin: '0 0 20px 0', lineHeight: '1.6' }}>
                                                        Take our 2-min survey. You&apos;ll jump ahead in the queue
                                                        AND help us build the exact tool you&apos;d actually pay for.
                                                        Win-win.
                                                    </p>
                                                    <a
                                                        href={surveyUrl}
                                                        style={{
                                                            display: 'inline-block',
                                                            backgroundColor: '#007AFF',
                                                            color: '#ffffff',
                                                            textDecoration: 'none',
                                                            padding: '14px 32px',
                                                            borderRadius: '10px',
                                                            fontWeight: 600,
                                                            fontSize: '16px',
                                                        }}
                                                    >
                                                        Take the 2-min survey &#8594;
                                                    </a>
                                                </td>
                                            </tr>
                                        </table>

                                        <p style={{ fontSize: '14px', color: '#71717a', margin: '0', lineHeight: '1.7' }}>
                                            No pressure though — you&apos;re on the list either way.
                                            We&apos;ll keep you posted as things come together. In the
                                            meantime, just know we&apos;re heads-down building this thing
                                            and your signup genuinely made our day.
                                        </p>
                                    </td>
                                </tr>

                                {/* Footer */}
                                <tr>
                                    <td style={{ padding: '24px 32px', textAlign: 'center' as const, borderTop: '1px solid #27272a' }}>
                                        <p style={{ fontSize: '13px', color: '#52525b', margin: '0 0 6px 0' }}>
                                            Sent with love by the Waawy team because you joined our waitlist.
                                        </p>
                                        <p style={{ fontSize: '13px', color: '#52525b', margin: 0 }}>
                                            Questions? Hit us up at{' '}
                                            <a href="mailto:hello@getwaawy.com" style={{ color: '#007AFF', textDecoration: 'none' }}>
                                                hello@getwaawy.com
                                            </a>
                                        </p>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>
            </body>
        </html>
    );
};

// Plain text version
export const getWaitlistWelcomeText = ({
    email,
    surveyUrl,
}: WaitlistWelcomeProps): string => {
    return `
You made it. Welcome in.

(No, this isn't another generic waitlist email.)

Hey there — thanks for signing up with ${email}. You just joined a small group of founders and HR leads who are tired of duct-taping their people ops together.

We're building Waawy because remote teams deserve better than spreadsheets and Slack prayers. Real pulse checks. Actual human connection. The stuff that keeps people from quietly quitting.

Here's what you get:
- First in line — you'll get access before anyone else
- Founder pricing — locked in forever, no bait-and-switch
- Your voice matters — tell us what to build and we actually will

Want to skip the line?
Take our 2-min survey and jump ahead in the queue:
${surveyUrl}

No pressure — you're on the list either way.
We'll keep you posted as things come together.

---
Waawy
Questions? hello@getwaawy.com
  `.trim();
};
