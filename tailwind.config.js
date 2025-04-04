/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{astro,html,js,jsx,ts,tsx,vue,svelte,md,mdx}',
    './src/data/blog-posts/**/*.{md,mdx}', // ✅ include your blog content
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
