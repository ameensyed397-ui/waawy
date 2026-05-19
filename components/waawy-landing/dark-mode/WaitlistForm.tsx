'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import { ArrowRight, CheckCircle2, Loader2, Twitter, Linkedin } from 'lucide-react';

// ── Config ──────────────────────────────────────────────────
const STORAGE_KEY = 'waawy_waitlist';
const SHARE_TEXT = "Just joined the @WaawyHQ free beta — the employee experience platform that works alongside your HRIS. First 100 companies get lifetime access 🎉";
const SHARE_URL = 'https://getwaawy.com';

// ── localStorage helpers ────────────────────────────────────
function getStoredEmail(): string | null {
    if (typeof window === 'undefined') return null;
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        return raw ? JSON.parse(raw).email : null;
    } catch {
        return null;
    }
}

function storeLocally(email: string) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
        email,
        timestamp: new Date().toISOString(),
    }));
}

function clearLocal() {
    if (typeof window !== 'undefined') {
        localStorage.removeItem(STORAGE_KEY);
    }
}

// ── Email regex ─────────────────────────────────────────────
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

// ── Component ───────────────────────────────────────────────
interface WaitlistFormProps {
    variants?: Variants;
}

type FormStatus = 'checking' | 'idle' | 'loading' | 'success' | 'error' | 'duplicate';

export const WaitlistForm = ({ variants }: WaitlistFormProps) => {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState<FormStatus>('idle');
    const [errorMsg, setErrorMsg] = useState('');

    // Verify against DB on mount
    useEffect(() => {
        const prev = getStoredEmail();
        if (!prev) return;

        setStatus('checking');

        fetch('/api/waitlist/check?' + new URLSearchParams({ email: prev }))
            .then(res => res.json())
            .then(data => {
                if (data.exists) {
                    setStatus('duplicate');
                } else {
                    clearLocal();
                    setStatus('idle');
                }
            })
            .catch(() => {
                setStatus('idle');
            });
    }, []);

    const handleReset = () => {
        clearLocal();
        setEmail('');
        setStatus('idle');
    };

    // ── Submit ──────────────────────────────────────────────
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrorMsg('');

        if (!email.trim()) {
            setErrorMsg('Please enter your email');
            setStatus('error');
            return;
        }
        if (!EMAIL_RE.test(email)) {
            setErrorMsg('That doesn\u2019t look like a valid email');
            setStatus('error');
            return;
        }

        setStatus('loading');

        try {
            const res = await fetch('/api/waitlist', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: email.trim() }),
            });

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            let data: any = {};
            try {
                const contentType = res.headers.get('content-type');
                if (contentType && contentType.includes('application/json')) {
                    data = await res.json();
                } else {
                    const text = await res.text();
                    console.error('Non-JSON response:', text);
                    if (!res.ok) throw new Error('Server error');
                }
            } catch (e) {
                console.error('Failed to parse response:', e);
            }

            if (res.status === 409) {
                storeLocally(email);
                setStatus('duplicate');
                return;
            }

            if (!res.ok) {
                throw new Error(data.error || 'Something went wrong');
            }

            storeLocally(email);
            setStatus('success');
            setEmail('');
        } catch (err) {
            const message = err instanceof Error ? err.message : 'Something went wrong';
            setErrorMsg(`Oops! ${message}. Please try again or email us at hello@getwaawy.com`);
            setStatus('error');
        }
    };

    const handleShare = (platform: 'twitter' | 'linkedin') => {
        const urls: Record<string, string> = {
            twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(SHARE_TEXT)}&url=${encodeURIComponent(SHARE_URL)}`,
            linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(SHARE_URL)}`,
        };
        window.open(urls[platform], '_blank', 'width=600,height=500');
    };

    // ── Render ──────────────────────────────────────────────
    return (
        <div>
            <AnimatePresence mode="wait">

                {/* ────── CHECKING ────── */}
                {status === 'checking' && (
                    <motion.div
                        key="checking"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex items-center justify-center py-6"
                    >
                        <Loader2 className="w-5 h-5 text-[#a7a7a7] animate-spin" />
                    </motion.div>
                )}

                {/* ────── FORM ────── */}
                {(status === 'idle' || status === 'loading' || status === 'error') && (
                    <motion.div
                        key="form"
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.25 }}
                    >
                        <motion.form
                            variants={variants}
                            onSubmit={handleSubmit}
                            className="relative group mb-3"
                        >
                            <div
                                className="absolute -inset-0.5 rounded-xl blur-sm opacity-0 group-hover:opacity-30 transition duration-500"
                                style={{ background: 'linear-gradient(135deg, #007BFF, #38b0fc)' }}
                            />
                            <div className="relative flex flex-col sm:flex-row items-stretch sm:items-center bg-white border border-[#e2e5ed] rounded-xl p-1.5 focus-within:border-[#007BFF]/50 transition-colors gap-1.5 sm:gap-0 shadow-sm">
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => {
                                        setEmail(e.target.value);
                                        if (status === 'error') setStatus('idle');
                                    }}
                                    placeholder="you@company.com"
                                    disabled={status === 'loading'}
                                    className="flex-1 min-w-0 bg-transparent border-none text-[#101011] focus:ring-0 placeholder:text-[#a7a7a7] px-4 py-3.5 outline-none text-base disabled:opacity-50 min-h-[44px]"
                                />
                                <button
                                    type="submit"
                                    disabled={status === 'loading'}
                                    className="text-white px-5 py-3.5 rounded-lg font-bold transition-all hover:opacity-90 hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 whitespace-nowrap text-sm disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 min-h-[44px] w-full sm:w-auto"
                                    style={{ background: 'linear-gradient(135deg, #007BFF, #0066CC)' }}
                                >
                                    {status === 'loading' ? (
                                        <>
                                            <Loader2 className="w-4 h-4 animate-spin" />
                                            Joining...
                                        </>
                                    ) : (
                                        <>
                                            Join Free Beta <ArrowRight className="w-4 h-4" />
                                        </>
                                    )}
                                </button>
                            </div>
                        </motion.form>

                        <AnimatePresence>
                            {status === 'error' && errorMsg && (
                                <motion.p
                                    initial={{ opacity: 0, y: -6 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0 }}
                                    className="text-sm text-red-500 mb-2"
                                >
                                    {errorMsg}
                                </motion.p>
                            )}
                        </AnimatePresence>

                        <motion.p variants={variants} className="text-xs text-[#a7a7a7]">
                            30 days free. No credit card. Cancel anytime.
                        </motion.p>
                    </motion.div>
                )}

                {/* ────── SUCCESS ────── */}
                {status === 'success' && (
                    <motion.div
                        key="success"
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, ease: 'easeOut' }}
                        className="text-center space-y-4"
                    >
                        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-emerald-50 border border-emerald-200">
                            <CheckCircle2 className="w-7 h-7 text-emerald-500" />
                        </div>

                        <div>
                            <h3 className="text-xl font-black text-[#101011] mb-1.5">You&apos;re on the list!</h3>
                            <p className="text-[#606266] text-sm leading-relaxed">
                                Check your inbox — we just sent you a welcome email.
                                <br />
                                <span className="text-[#a7a7a7]">We&apos;ll be in touch with next steps soon.</span>
                            </p>
                        </div>

                        <div className="pt-2 border-t border-[#e2e5ed]">
                            <p className="text-[#a7a7a7] text-xs mb-3">Spread the word</p>
                            <div className="flex items-center justify-center gap-3">
                                <button
                                    onClick={() => handleShare('twitter')}
                                    className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#f0f2f6] border border-[#e2e5ed] hover:border-[#007BFF]/30 text-[#606266] hover:text-[#007BFF] text-xs font-medium transition-all hover:scale-105 min-h-[44px]"
                                >
                                    <Twitter className="w-4 h-4" />
                                    Tweet
                                </button>
                                <button
                                    onClick={() => handleShare('linkedin')}
                                    className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#f0f2f6] border border-[#e2e5ed] hover:border-[#007BFF]/30 text-[#606266] hover:text-[#007BFF] text-xs font-medium transition-all hover:scale-105 min-h-[44px]"
                                >
                                    <Linkedin className="w-4 h-4" />
                                    Share
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}

                {/* ────── DUPLICATE ────── */}
                {status === 'duplicate' && (
                    <motion.div
                        key="duplicate"
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, ease: 'easeOut' }}
                        className="text-center space-y-4"
                    >
                        <div
                            className="inline-flex items-center justify-center w-14 h-14 rounded-2xl"
                            style={{ background: '#007BFF12', border: '1px solid #007BFF25' }}
                        >
                            <CheckCircle2 className="w-7 h-7" style={{ color: '#007BFF' }} />
                        </div>

                        <div>
                            <h3 className="text-xl font-bold text-[#101011] mb-1.5">You&apos;re already on our list!</h3>
                            <p className="text-[#606266] text-sm leading-relaxed">
                                Check your inbox — your welcome email is already there.
                            </p>
                        </div>

                        <button
                            onClick={handleReset}
                            className="text-xs text-[#a7a7a7] hover:text-[#606266] transition-colors underline underline-offset-2"
                        >
                            Sign up with a different email
                        </button>
                    </motion.div>
                )}

            </AnimatePresence>
        </div>
    );
};
