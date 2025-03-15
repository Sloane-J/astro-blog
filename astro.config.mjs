import { defineConfig } from 'astro/config';
import svelte from '@astrojs/svelte';
import mdx from '@astrojs/mdx';
import remarkGfm from 'remark-gfm';
import remarkSmartypants from 'remark-smartypants';
import rehypeExternalLinks from 'rehype-external-links';
import tailwind from "@astrojs/tailwind";
import compress from "astro-compress";
import sitemap from "@astrojs/sitemap";
import prefetch from "@astrojs/prefetch";

// https://astro.build/config
export default defineConfig({
  // Set output to static for better performance
  output: 'static',
  
  // Standard directories
  outDir: './dist',
  publicDir: './public',
  
  // Your site URL
  site: 'https://myastro-blogg.netlify.app',
  
  // Build options for performance
  build: {
    // Enable inlining of smaller assets
    inlineStylesheets: 'auto',
    // Use browser-compatible JS for wider support
    format: 'file',
    // Add cache busting for assets
    assets: '_assets',
  },
  
  // Enable image optimization
  image: {
    service: {
      entrypoint: 'astro/assets/services/sharp',
    },
    // Disable remote images caching in dev for faster builds
    remotePatterns: [{ protocol: "https" }],
  },
  
  vite: {
    // Enable build optimizations
    build: {
      // Optimize CSS
      cssMinify: 'lightningcss',
      // Split chunks for better caching
      cssCodeSplit: true,
      // Reduce bundle size
      minify: 'terser',
      // Optimize Svelte components
      rollupOptions: {
        output: {
          manualChunks: {
            svelte: ['svelte'],
          },
        },
      },
    },
    // Enable caching in development
    optimizeDeps: {
      enabled: true,
    },
    // Add compression for assets
    plugins: [],
    ssr: {
      // Avoid bundling external dependencies in SSR
      noExternal: [],
    },
  },
  
  // Add key integrations
  integrations: [
    mdx(), 
    svelte(), 
    tailwind({
      // Add Just-in-Time mode for smaller CSS bundles
      config: { applyBaseStyles: false },
    }),
    // Add compression for HTML, CSS, JS, images
    compress({
      CSS: true,
      HTML: true,
      Image: true,
      JavaScript: true,
      SVG: true,
    }),
    // Generate sitemap for better SEO
    sitemap(),
    // Add prefetching for faster page loads
    prefetch(),
  ],
  
  // Markdown configuration
  markdown: {
    shikiConfig: {
      theme: 'nord',
      // Wrap code blocks with divs for better mobile experience
      wrap: true,
    },
    remarkPlugins: [remarkGfm, remarkSmartypants],
    rehypePlugins: [
      [rehypeExternalLinks, {
        target: '_blank',
        rel: ['noopener', 'noreferrer'],
      }]
    ],
  }
});