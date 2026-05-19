import { LoopsClient } from 'loops';

const apiKey = process.env.LOOPS_API_KEY;

if (!apiKey) {
  console.warn('LOOPS_API_KEY is not defined in environment variables. Email sending will fail.');
}

export const loops = new LoopsClient(apiKey || '');

// Transactional template IDs (created in Loops dashboard)
export const LOOPS_TEMPLATES = {
  waitlistWelcome: process.env.LOOPS_WAITLIST_TRANSACTIONAL_ID || 'cmm0s7r9c0e230iylywojzmrm',
  invite: process.env.LOOPS_INVITE_TRANSACTIONAL_ID || '',
} as const;
