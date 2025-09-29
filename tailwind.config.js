/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        extend: {
            keyframes: {
                marquee: {
                    '0%': { transform: 'translateX(0)' },
                    '100%': { transform: 'translateX(-50%)' },
                },
            },
            animation: {
                'marquee-ltr': 'marquee 20s linear infinite',
                'marquee-pause': 'marquee 20s linear infinite paused',
            },
        },
    },
    plugins: [],
} 