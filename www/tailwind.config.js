module.exports = {
  purge: [
    './docs/**/*.{js,ts,tsx,mdx}',
    './src/**/*.{js,ts,tsx}',
    './src/**/*.html',
    '../react-widgets/src/**/*.tsx',
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {},
    flexGrow: {
      0: 0,
      DEFAULT: 1,
      1: 1,
      2: 2,
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
  corePlugins: {
    preflight: false,
    container: false,
    backgroundColor: false,
    borderColor: false,
    divideColor: false,
    gradientColorStops: false,
    placeholderColor: false,
    ringColor: false,
    ringOffsetColor: false,
    textColor: false,
  },
}
