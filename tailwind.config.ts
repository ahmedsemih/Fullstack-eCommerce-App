import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      screens: {
        xs: '320px',
        sm: '425px',
        md: '768px',
        lg: '1024px',
        xl: '1440px'
      }
    },
    colors: {
      mainRed:'#EE1B24',
      lightRed: '#FFEDED',
      mainGreen: '#00A652',
      lightGreen: '#CCEDDC',
      white: '#fff',
      black: '#000' 
    }
  },
  plugins: [],
}
export default config
