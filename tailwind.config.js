const colors = require('tailwindcss/colors');

module.exports = {
  // Uncomment the line below to enable the experimental Just-in-Time ("JIT") mode.
  // https://tailwindcss.com/docs/just-in-time-mode
  // mode: "jit",
  theme: {
    extend: {
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
        black: "#191414",
        white: "#fff",
        soft: colors.coolGray[100],
        gray: colors.coolGray,
        red: colors.red,
        yellow: colors.amber,
        green: colors.green,
        blue: colors.blue,
        indigo: colors.indigo,
        purple: colors.violet,
        pink: colors.pink,
        brand: {
          '50':  '#edf4f1',
          '100': '#cdf0ea',
          '200': '#91e9cd',
          '300': '#54d29e',
          '400': '#1db954',
          '500': '#129d43',
          '600': '#118931',
          '700': '#116a29',
          '800': '#0d4921',
          '900': '#0a2d1b',
        },
      }
    },
  },
  variants: {
    extend: {
      translate: ['group-hover', 'hover'],
      scale: ['group-hover', 'hover'],
      display: ['group-hover'],
      rotate: ['group-hover']
    }
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
  purge: {
    // Filenames to scan for classes
    content: [
      "./src/**/*.html",
      "./src/**/*.js",
      "./src/**/*.jsx",
      "./src/**/*.ts",
      "./src/**/*.tsx",
      "./public/index.html",
    ],
    // Options passed to PurgeCSS
    options: {
      // Whitelist specific selectors by name
      // safelist: [],
    },
  },
};
