'use client';

export const BlobBackground = () => {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
            {/* Main Blue Blob - Optimized with CSS animations */}
            <div
                className="absolute top-[-20%] left-[-10%] w-[800px] h-[800px] bg-waawy-blue/20 rounded-full blur-[80px] mix-blend-screen animate-blob"
            />

            {/* Cyan Accent Blob - Optimized */}
            <div
                className="absolute top-[20%] right-[-20%] w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[60px] mix-blend-screen animate-blob-delayed"
            />

            {/* Bottom Glow */}
            <div className="absolute bottom-0 left-0 right-0 h-[500px] bg-gradient-to-t from-waawy-blue/5 to-transparent" />

            <style jsx>{`
                @keyframes blob {
                    0%, 100% {
                        transform: translate(0, 0) scale(1) rotate(0deg);
                    }
                    33% {
                        transform: translate(100px, -50px) scale(1.2) rotate(90deg);
                    }
                    66% {
                        transform: translate(50px, 50px) scale(1.1) rotate(180deg);
                    }
                }
                
                @keyframes blob-delayed {
                    0%, 100% {
                        transform: translate(0, 0) scale(1) rotate(0deg);
                    }
                    33% {
                        transform: translate(-50px, 100px) scale(1.1) rotate(-60deg);
                    }
                    66% {
                        transform: translate(-25px, -50px) scale(1.05) rotate(-120deg);
                    }
                }
                
                .animate-blob {
                    animation: blob 20s ease-in-out infinite;
                    will-change: transform;
                }
                
                .animate-blob-delayed {
                    animation: blob-delayed 15s ease-in-out infinite 2s;
                    will-change: transform;
                }
            `}</style>
        </div>
    );
};
