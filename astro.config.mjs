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
//import { getHighlighter } from 'shiki';

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
    inlineStylesheets: 'auto',
    format: 'file',
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
          // Updated to prevent empty chunks
          manualChunks: undefined
        },
      },
    },
    optimizeDeps: {
      enabled: true,
    },
    plugins: [],
    ssr: {
      noExternal: [],
    },
  },
  
  // Enable built-in prefetching
  prefetch: true,
  
  // Add key integrations
  integrations: [
    mdx(), 
    svelte(), 
    tailwind({
      config: { applyBaseStyles: false },
    }),
    compress({
      CSS: true,
      HTML: true,
      Image: true,
      JavaScript: true,
      SVG: true,
    }),
    sitemap(),
    pagefind({
      // Configuration options for Pagefind
      exclude: ["**/admin/**/*"],
      indexing: {
        // Specify which extensions to index
        extensions: [".md", ".astro", ".html"],
        // Adjust what HTML elements should be used for search results
        selectors: {
          article: "article", // The main content area
          header: "header h1", // The title of the page
          body: "main", // The main content
          image: "img", // Images
          meta: "meta", // Meta tags
        },
      },
      // Customize output
      customIcons: false,
      customSvg: {
        // Customize icons if needed
        // search: "<svg>...</svg>",
        // close: "<svg>...</svg>",
      }
    })
  ],

  /* markdown: {
    shikiConfig: {
      theme: 'dracula',
    },
  }, */
  
  // Markdown configuration
  markdown: {
    syntaxHighlight: 'shiki',
    shikiConfig: {
      // Use a more direct approach for customizing the theme
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