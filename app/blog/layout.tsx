import { Header } from "@/components/waawy-landing/dark-mode/Header";
import Link from "next/link";

export default function BlogLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen bg-[#f0f2f6] text-[#101011] font-sans">
            <Header />
            {children}
            <footer className="border-t border-[#e2e5ed] py-12 mt-16 bg-white">
                <div className="max-w-3xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-[#a7a7a7]">
                    <span>© 2026 Waawy Inc.</span>
                    <div className="flex items-center gap-6">
                        <Link href="/" className="hover:text-[#101011] transition-colors">Home</Link>
                        <Link href="/blog" className="hover:text-[#101011] transition-colors">Blog</Link>
                        <Link href="/#waitlist" className="hover:text-[#101011] transition-colors">Join Free Beta</Link>
                    </div>
                </div>
            </footer>
        </div>
    );
}
