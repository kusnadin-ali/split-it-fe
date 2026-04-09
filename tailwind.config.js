/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,jsx,ts,tsx}",
    "./src/components/**/*.{js,jsx,ts,tsx}",
    "./src/hooks/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        olive: {
          DEFAULT: "#8AA624",
          dark: "#6B8A1A",
          deeper: "#4E6612",
        },
        sage: {
          DEFAULT: "#DBE4C9",
          dark: "#C5D5A8",
        },
        amber: {
          DEFAULT: "#FEA405",
          dark: "#D98C00",
        },
      },
      fontFamily: {
        fraunces: ["Fraunces_600SemiBold"],
        frauncesItalic: ["Fraunces_600SemiBold_Italic"],
        instrument: ["InstrumentSans_400Regular"],
        instrumentMd: ["InstrumentSans_500Medium"],
        instrumentSb: ["InstrumentSans_600SemiBold"],
        instrumentBold: ["InstrumentSans_700Bold"],
      },
    },
  },
  plugins: [],
};
