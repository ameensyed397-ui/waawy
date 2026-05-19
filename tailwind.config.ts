import type { Config } from "tailwindcss";

const config: Config = {
    darkMode: ["class"],
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ["var(--font-inter)", "Inter", "system-ui", "sans-serif"],
                display: ["Satoshi", "system-ui", "sans-serif"],
                heading: ["Satoshi", "system-ui", "sans-serif"],
                hand: ["var(--font-hand)", "Caveat", "cursive"],
            },
            fontSize: {
                // Typescale system based on Satoshi + Inter
                "display-2xl": ["4.5rem", { lineHeight: "1.1", letterSpacing: "-0.02em", fontWeight: "700" }],
                "display-xl": ["3.75rem", { lineHeight: "1.1", letterSpacing: "-0.02em", fontWeight: "700" }],
                "display-lg": ["3rem", { lineHeight: "1.2", letterSpacing: "-0.01em", fontWeight: "700" }],
                "display-md": ["2.25rem", { lineHeight: "1.2", letterSpacing: "-0.01em", fontWeight: "700" }],
                "display-sm": ["1.875rem", { lineHeight: "1.3", letterSpacing: "0", fontWeight: "600" }],

                "heading-xl": ["1.5rem", { lineHeight: "1.4", letterSpacing: "0", fontWeight: "600" }],
                "heading-lg": ["1.25rem", { lineHeight: "1.5", letterSpacing: "0", fontWeight: "600" }],
                "heading-md": ["1.125rem", { lineHeight: "1.5", letterSpacing: "0", fontWeight: "600" }],
                "heading-sm": ["1rem", { lineHeight: "1.5", letterSpacing: "0", fontWeight: "600" }],

                "body-xl": ["1.25rem", { lineHeight: "1.6", letterSpacing: "0", fontWeight: "400" }],
                "body-lg": ["1.125rem", { lineHeight: "1.6", letterSpacing: "0", fontWeight: "400" }],
                "body-md": ["1rem", { lineHeight: "1.6", letterSpacing: "0", fontWeight: "400" }],
                "body-sm": ["0.875rem", { lineHeight: "1.5", letterSpacing: "0", fontWeight: "400" }],
                "body-xs": ["0.75rem", { lineHeight: "1.5", letterSpacing: "0", fontWeight: "400" }],

                "label-lg": ["0.875rem", { lineHeight: "1.4", letterSpacing: "0", fontWeight: "500" }],
                "label-md": ["0.8125rem", { lineHeight: "1.4", letterSpacing: "0", fontWeight: "500" }],
                "label-sm": ["0.75rem", { lineHeight: "1.4", letterSpacing: "0.01em", fontWeight: "500" }],
            },
            colors: {
                background: "hsl(var(--background))",
                foreground: "hsl(var(--foreground))",
                card: {
                    DEFAULT: "hsl(var(--card))",
                    foreground: "hsl(var(--card-foreground))",
                },
                popover: {
                    DEFAULT: "hsl(var(--popover))",
                    foreground: "hsl(var(--popover-foreground))",
                },
                primary: {
                    DEFAULT: "hsl(var(--primary))",
                    foreground: "hsl(var(--primary-foreground))",
                },
                secondary: {
                    DEFAULT: "hsl(var(--secondary))",
                    foreground: "hsl(var(--secondary-foreground))",
                },
                muted: {
                    DEFAULT: "hsl(var(--muted))",
                    foreground: "hsl(var(--muted-foreground))",
                },
                accent: {
                    DEFAULT: "hsl(var(--accent))",
                    foreground: "hsl(var(--accent-foreground))",
                },
                destructive: {
                    DEFAULT: "hsl(var(--destructive))",
                    foreground: "hsl(var(--destructive-foreground))",
                },
                border: "hsl(var(--border))",
                input: "hsl(var(--input))",
                ring: "hsl(var(--ring))",
                chart: {
                    "1": "hsl(var(--chart-1))",
                    "2": "hsl(var(--chart-2))",
                    "3": "hsl(var(--chart-3))",
                    "4": "hsl(var(--chart-4))",
                    "5": "hsl(var(--chart-5))",
                },
                waawy: {
                    blue: "#007BFF",
                },
            },
            borderRadius: {
                lg: "var(--radius)",
                md: "calc(var(--radius) - 2px)",
                sm: "calc(var(--radius) - 4px)",
            },
        },
    },
    plugins: [require("tailwindcss-animate")],
};

export default config;
