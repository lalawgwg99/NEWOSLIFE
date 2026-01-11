export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                mono: ['"JetBrains Mono"', '"Courier New"', 'monospace'],
                sans: ['Inter', 'system-ui', '-apple-system', '"Noto Sans TC"', 'sans-serif'],
            },
            colors: {
                // Modern Bauhaus Palette
                cream: '#FAF3E0',
                paper: '#FFFFFF',
                ink: '#1A1A1A',
                muted: '#6B7280',
                accent: '#059669',
                'accent-light': '#D1FAE5',
            },
            boxShadow: {
                'card': '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
                'card-hover': '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
                'elevated': '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
            },
            borderRadius: {
                'xl': '12px',
                '2xl': '16px',
            },
        },
    },
    plugins: [],
}
