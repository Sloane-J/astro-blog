import { defineConfig } from 'astro/config';
import svelte from '@astrojs/svelte';
import mdx from '@astrojs/mdx';
import remarkGfm from 'remark-gfm';
import remarkSmartypants from 'remark-smartypants';
import rehypeExternalLinks from 'rehype-external-links';
import tailwind from "@astrojs/tailwind";
import compress from "astro-compress";
import sitemap from "@astrojs/sitemap";
import pagefind from "astro-pagefind";
import robotsTxt from 'astro-robots-txt';

export default defineConfig({
  // Set output to static for better performance
  output: 'static',
  
  // Standard directories
  outDir: './dist',
  publicDir: './public',
  
  // Your site URL
  site: 'https://nextframe-digest.vercel.app',  // Removed trailing slash
  
  // Build options for performance
  build: {
    manifest: true,
    inlineStylesheets: 'auto',
    // format: 'file', // This is causing routing issues - removed
    assets: '_assets',
  },
  
  // Enable image optimization
  image: {
    service: {
      entrypoint: 'astro/assets/services/sharp',
    },
    remotePatterns: [{ protocol: "https" }],
  },
  
  vite: {
    build: {
      cssMinify: 'lightningcss',
      cssCodeSplit: true,
      minify: 'terser',
      rollupOptions: {
        output: {
          // Allow for better code splitting
          manualChunks(id) {
            if (id.includes('node_modules')) {
              return 'vendor';
            }
          }
        },
      },
    },
    optimizeDeps: {
      enabled: true,
    },
    ssr: {
      noExternal: ['@pagefind/default-ui'],
    },
  },
  
  // Enable built-in prefetching
  prefetch: true,
  
  // Add key integrations
  integrations: [
    mdx(),
    svelte(),
    tailwind({
      applyBaseStyles: true,
    }),
    compress({
      CSS: true,
      HTML: true,
      Image: true,
      JavaScript: true,
      SVG: true,
    }),
    sitemap({
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date('2025-03-26'),
    }),
    pagefind({
      exclude: ["**/admin/**/*"],
      indexing: {
        extensions: [".md", ".astro", ".html"],
        selectors: {
          article: "article",
          header: "header h1",
          body: "main",
          image: "img",
          meta: "meta",
        },
      },
      customIcons: false,
    }),
    robotsTxt()
  ],
  
  // Markdown configuration
  markdown: {
    syntaxHighlight: 'shiki',
    shikiConfig: {
      theme: 'dracula',
      wrap: true,
      langs: [
        'js', 'ts', 'html', 'css', 'jsx', 'tsx', 'json', 'md',
        'yaml', 'scss', 'python', 'php', 'ruby', 'java', 'csharp',
        'go', 'rust', 'sql', 'bash', 'dockerfile', 'graphql',
        'vue', 'svelte', 'astro'
      ],
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