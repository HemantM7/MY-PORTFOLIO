/** @type {import('tailwindcss').Config} */
export default {
	content: [
		"./index.html",
		"./src/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		extend: {
			colors: {
				accent: {
					cyan: "#00e5ff",
					blue: "#6366f1",
				},
			},
			boxShadow: {
				card: "0 10px 25px rgba(0,0,0,0.08)",
			},
		},
	},
	plugins: [],
};


