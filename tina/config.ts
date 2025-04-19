import { defineConfig } from "tinacms";

// Determine the current Git branch (safe for build-time usage)
const branch = "main";
  process.env.NEXT_PUBLIC_TINA_BRANCH || // Optional manual override
  process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_REF || // Vercel's active branch (if exposed)
  process.env.HEAD
  "main"; // Default fallback

// Load sensitive and public environment variables
const clientId = process.env.NEXT_PUBLIC_TINA_CLIENT_ID || process.env.NEXT_PUBLIC_TINA_CLIENT_ID;
const token = process.env.TINA_TOKEN;


export default defineConfig({
  branch,
  clientId,
  token,
  build: {
    publicFolder: "public",
    outputFolder: "admin",
  },
  media: {
    tina: {
      publicFolder: "public",
      mediaRoot: "assets/blog/", // Removed leading slash for better compatibility
    },
  },
  schema: {
    collections: [
      {
        name: "post",
        label: "All Posts", // Fixed plural form
        path: "src/data/blog-posts/", // Changed to reflect common Astro content structure
        format: "md",
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            isTitle: true,
            required: true,
          },
          {
            type: "rich-text",
            name: "body",
            label: "Body",
            isBody: true,
          },
          {
            type: "string",
            name: "description",
            label: "Description",
            ui: {
              component: "textarea",
            },
            required: true,
          },
          {
            type: "datetime",
            name: "date",
            label: "Date",
            required: true,
          },
          {
            type: "string",
            name: "publishDate",
            label: "Publish Date (Display Format)",
            description: "The date format displayed to readers (e.g., March 14, 2025)",
          },
          {
            type: "image",
            name: "featuredImage",
            label: "Featured Image",
            description: "Select a featured image for this post",
          },
          {
            type: "string",
            name: "author",
            label: "Author",
            required: true,
            ui: {
              component: "select",
              options: ["Samuel D. Jnr", "Enerstina Yevugah"],
            },
          },
          {
            type: "string",
            name: "category",
            label: "Category",
            required: true,
            ui: {
              component: "select",
              options: ["News", "Tech and Science", "Trailers", "Deals", "Entertainment"],
            },
          },
          {
            type: "string",
            name: "tags",
            label: "Tags",
            list: true,
            description: "Add tags related to this post",
            ui: {
              component: "tags",
            },
          },
          {
            type: "boolean",
            name: "featured",
            label: "Featured Post",
            description: "Mark this post as featured to highlight it on the homepage",
          },
          {
            type: "string",
            name: "keywords",
            label: "SEO Keywords",
            list: true,
            description: "Add SEO keywords for this post",
            ui: {
              component: "tags",
            },
          },
        ],
      },
    ],
  },
});