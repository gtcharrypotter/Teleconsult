/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}",
	"./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      		colors: {
				dark: {
					DEFAULT: "#353535",
				},
				primary: {
					DEFAULT: "#42a5f5",
					dark: "#1876d2",
					darker: "#027bff",
					light: "#55a6ff",
				},
				warning: {
					light: "#FF8800",
					DEFAULT: "#FF8800",
					dark: "#EA9828",
				},
				info: {
					light: "#0099CC",
					DEFAULT: "#0099CC",
					dark: "#0099CC",
				},
				information: {
					light: "#0099CC",
					DEFAULT: "#0099CC",
					dark: "#0099CC",
				},
				danger: {
					light: "#CC0000",
					DEFAULT: "#CC0000",
					dark: "#CC0000",
				},
				success: {
					light: "#007E33",
					DEFAULT: "#007E33",
					dark: "#007E33",
				},
				darker: {
					light: "#292B39",
					DEFAULT: "#292B39",
					dark: "#292B39",
				},
				blueDark: {
					DEFAULT: "#005d88",
				}
			},
			fontFamily: {
				pthin: ['Poppins-Thin','sans-serif'],
				pextralight: ['Poppins-Extralight','sans-serif'],
				plight: ['Poppins-Light','sans-serif'],
				pregular: ['Poppins-Regular','sans-serif'],
				pmedium: ['Poppins-Medium','sans-serif'],
				psemibold: ['Poppins-SemiBold','sans-serif'],
				pbold: ['Poppins-Bold','sans-serif'],
				pextrabold: ['Poppins-ExtraBold','sans-serif'],
				pblack: ['Poppins-Black','sans-serif'],
			},
			screens: {
				sm: "360px",
				md: "768px",
				lg: "1024px",
				xl: "1280px",
			},
			animation: {
				slowPing: "ping 3s linear infinite",
				slowPulse: "pulse 3s linear infinite", // Change 3s to your desired duration
			},
		
    },
  },
  plugins: [],
}

