/** @type {import('tailwindcss').Config} */
export default {
	content: [
		"./index.html",
		"/src/components/Header.tsx",
		"./src/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		colors: {
			primary: {
				white: "#FFFFFF",
				black: "#363738",
			},
			secondary: {
				"white-smoke": "#F5F5F5",
				"white-desert": "#FEFAF1",
				"cute-crab": "#DB4444",
			},
			"dr-white": "#D37643",
			"battle-grey": "#7D8184",
			black: "#000000",
			"buster-green": "#00FF66",
			"candy-pink": "#E07575",
			blair: "#A0BCE0",
			"border-grey": "#0000004d",
			transparent: "transparent",
		},
		extend: {
			fontFamily: {
				poppins: ["Poppins", "sans-serif"],
				inter: ["Inter", "sans-serif"],
			},
		},
	},
	plugins: [
		require("tailwindcss/plugin")(({ addVariant }) => {
			addVariant("search-cancel", "&::-webkit-search-cancel-button");
		}),
	],
};
