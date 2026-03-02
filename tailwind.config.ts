import type { Config } from "tailwindcss";

const config: Config = {
    darkMode: ["class"],
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                border: "hsl(var(--border))",
                input: "hsl(var(--input))",
                ring: "hsl(var(--ring))",
                background: "hsl(var(--background))",
                foreground: "hsl(var(--foreground))",
                primary: {
                    DEFAULT: "hsl(var(--primary))",
                    foreground: "hsl(var(--primary-foreground))",
                },
                secondary: {
                    DEFAULT: "hsl(var(--secondary))",
                    foreground: "hsl(var(--secondary-foreground))",
                },
                destructive: {
                    DEFAULT: "hsl(var(--destructive))",
                    foreground: "hsl(var(--destructive-foreground))",
                },
                muted: {
                    DEFAULT: "hsl(var(--muted))",
                    foreground: "hsl(var(--muted-foreground))",
                },
                accent: {
                    DEFAULT: "hsl(var(--accent))",
                    foreground: "hsl(var(--accent-foreground))",
                },
                popover: {
                    DEFAULT: "hsl(var(--popover))",
                    foreground: "hsl(var(--popover-foreground))",
                },
                card: {
                    DEFAULT: "hsl(var(--card))",
                    foreground: "hsl(var(--card-foreground))",
                },
                // Campus Nexus role colors
                student: {
                    DEFAULT: "hsl(221, 89%, 52%)",
                    light: "hsl(221, 89%, 96%)",
                    dark: "hsl(221, 89%, 38%)",
                },
                organizer: {
                    DEFAULT: "hsl(270, 75%, 52%)",
                    light: "hsl(270, 75%, 96%)",
                    dark: "hsl(270, 75%, 38%)",
                },
                faculty: {
                    DEFAULT: "hsl(158, 64%, 42%)",
                    light: "hsl(158, 64%, 96%)",
                    dark: "hsl(158, 64%, 28%)",
                },
                admin: {
                    DEFAULT: "hsl(28, 90%, 50%)",
                    light: "hsl(28, 90%, 96%)",
                    dark: "hsl(28, 90%, 36%)",
                },
                nexus: {
                    50: "#f0f4ff",
                    100: "#dce8ff",
                    200: "#bad4ff",
                    300: "#85b3ff",
                    400: "#4d87ff",
                    500: "#2563eb",
                    600: "#1d4ed8",
                    700: "#1e40af",
                    800: "#1e3a8a",
                    900: "#1e3066",
                },
            },
            borderRadius: {
                lg: "var(--radius)",
                md: "calc(var(--radius) - 2px)",
                sm: "calc(var(--radius) - 4px)",
            },
            fontFamily: {
                sans: ["Inter", "system-ui", "sans-serif"],
                display: ["Plus Jakarta Sans", "sans-serif"],
            },
            keyframes: {
                "accordion-down": {
                    from: { height: "0" },
                    to: { height: "var(--radix-accordion-content-height)" },
                },
                "accordion-up": {
                    from: { height: "var(--radix-accordion-content-height)" },
                    to: { height: "0" },
                },
                shimmer: {
                    "0%": { backgroundPosition: "-200% 0" },
                    "100%": { backgroundPosition: "200% 0" },
                },
                "fade-in": {
                    from: { opacity: "0", transform: "translateY(10px)" },
                    to: { opacity: "1", transform: "translateY(0)" },
                },
                "slide-in": {
                    from: { transform: "translateX(-100%)" },
                    to: { transform: "translateX(0)" },
                },
                pulse: {
                    "0%, 100%": { opacity: "1" },
                    "50%": { opacity: "0.5" },
                },
                float: {
                    "0%, 100%": { transform: "translateY(0px)" },
                    "50%": { transform: "translateY(-8px)" },
                },
            },
            animation: {
                "accordion-down": "accordion-down 0.2s ease-out",
                "accordion-up": "accordion-up 0.2s ease-out",
                shimmer: "shimmer 2s linear infinite",
                "fade-in": "fade-in 0.4s ease-out",
                "slide-in": "slide-in 0.3s ease-out",
                float: "float 3s ease-in-out infinite",
            },
            backgroundImage: {
                "student-gradient": "linear-gradient(135deg, hsl(221,89%,52%) 0%, hsl(195,100%,50%) 100%)",
                "organizer-gradient": "linear-gradient(135deg, hsl(270,75%,52%) 0%, hsl(300,80%,60%) 100%)",
                "faculty-gradient": "linear-gradient(135deg, hsl(158,64%,42%) 0%, hsl(180,60%,50%) 100%)",
                "admin-gradient": "linear-gradient(135deg, hsl(28,90%,50%) 0%, hsl(45,95%,60%) 100%)",
                "nexus-gradient": "linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #0f172a 100%)",
                shimmer: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.08) 50%, transparent 100%)",
            },
        },
    },
    plugins: [],
};

export default config;
