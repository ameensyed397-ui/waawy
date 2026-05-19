/* eslint-disable @next/next/no-head-element */
import * as React from 'react';

interface InviteEmailProps {
  companyName: string;
  inviterName?: string;
  inviteLink: string;
  expiresInDays: number;
}

export const InviteEmail: React.FC<InviteEmailProps> = ({
  companyName,
  inviterName,
  inviteLink,
  expiresInDays,
}) => {
  return (
    <html>
      <head>
        <style>{`
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Helvetica Neue', sans-serif;
            line-height: 1.6;
            color: #1f2937;
            background-color: #f9fafb;
            margin: 0;
            padding: 0;
          }
          .container {
            max-width: 600px;
            margin: 40px auto;
            background: #ffffff;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
          }
          .header {
            background: linear-gradient(135deg, #007AFF 0%, #0051D5 100%);
            padding: 40px 32px;
            text-align: center;
          }
          .logo {
            font-size: 32px;
            font-weight: 700;
            color: #ffffff;
            margin: 0;
          }
          .content {
            padding: 40px 32px;
          }
          .greeting {
            font-size: 24px;
            font-weight: 600;
            color: #111827;
            margin: 0 0 16px 0;
          }
          .message {
            font-size: 16px;
            color: #4b5563;
            margin: 0 0 24px 0;
          }
          .highlight {
            font-weight: 600;
            color: #111827;
          }
          .cta-button {
            display: inline-block;
            background: #007AFF;
            color: #ffffff;
            text-decoration: none;
            padding: 14px 32px;
            border-radius: 8px;
            font-weight: 600;
            font-size: 16px;
            margin: 8px 0 24px 0;
            transition: background 0.2s;
          }
          .cta-button:hover {
            background: #0051D5;
          }
          .info-box {
            background: #f3f4f6;
            border-left: 4px solid #007AFF;
            padding: 16px;
            margin: 24px 0;
            border-radius: 4px;
          }
          .info-text {
            font-size: 14px;
            color: #6b7280;
            margin: 0;
          }
          .footer {
            background: #f9fafb;
            padding: 24px 32px;
            text-align: center;
            border-top: 1px solid #e5e7eb;
          }
          .footer-text {
            font-size: 14px;
            color: #9ca3af;
            margin: 0 0 8px 0;
          }
          .link {
            color: #007AFF;
            text-decoration: none;
          }
        `}</style>
      </head>
      <body>
        <div className="container">
          <div className="header">
            <h1 className="logo">〜 waawy</h1>
          </div>

          <div className="content">
            <h2 className="greeting">You&apos;ve been invited! 👋</h2>

            <p className="message">
              {inviterName ? (
                <>
                  <span className="highlight">{inviterName}</span> has invited you to join{' '}
                  <span className="highlight">{companyName}</span> on Waawy.
                </>
              ) : (
                <>
                  You&apos;ve been invited to join{' '}
                  <span className="highlight">{companyName}</span> on Waawy.
                </>
              )}
            </p>

            <p className="message">
              Waawy is where your remote team feels like a team — not strangers
              who share a Slack workspace.
            </p>

            <a href={inviteLink} className="cta-button">
              Accept Invitation →
            </a>

            <div className="info-box">
              <p className="info-text">
                <strong>This will take about 5 minutes.</strong> You&apos;ll set up your profile,
                complete any required documents, and meet your team.
              </p>
            </div>

            <p className="message" style={{ fontSize: '14px', color: '#6b7280' }}>
              This invitation expires in {expiresInDays} days. If you&apos;re not expecting this
              email or think it was sent by mistake, you can safely ignore it.
            </p>
          </div>

          <div className="footer">
            <p className="footer-text">
              This email was sent by Waawy HRMS
            </p>
            <p className="footer-text">
              Need help? <a href="mailto:hello@getwaawy.com" className="link">hello@getwaawy.com</a>
            </p>
          </div>
        </div>
      </body>
    </html>
  );
};

// Plain text version for email clients that don't support HTML
export const getInviteEmailText = ({
  companyName,
  inviterName,
  inviteLink,
  expiresInDays,
}: InviteEmailProps): string => {
  return `
You've been invited to join ${companyName}!

${inviterName ? `${inviterName} has invited you` : 'You have been invited'} to join ${companyName} on Waawy — where remote teams actually feel like teams.

Accept your invitation:
${inviteLink}

This will take about 5 minutes to set up your profile.

This invitation expires in ${expiresInDays} days.

If you're not expecting this email, you can safely ignore it.

---
Waawy HRMS
Need help? hello@getwaawy.com
  `.trim();
};
