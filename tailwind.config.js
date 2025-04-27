/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './src/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {
                'btn-primary': 'bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded transition-colors'
            }
        },
    },
    plugins: [],
}