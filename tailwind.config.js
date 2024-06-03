/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./web/components/*.templ"],
  theme: {
    extend: {
      colors: {}
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography')
  ],
}
