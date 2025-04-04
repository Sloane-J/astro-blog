import { defineConfig } from "tinacms";

// Determine the current Git branch on the client side
const branch =
  import.meta.env.PUBLIC_TINA_BRANCH ||         // Optional manual override
  import.meta.env.PUBLIC_VERCEL_GIT_COMMIT_REF || // Set in Vercel dashboard as a PUBLIC_ var
  "main";                                        // Default fallback

// Load sensitive and public environment variables
const clientId = process.env.PUBLIC_TINA_CLIENT_ID;
const token = process.env.TINA_TOKEN;

if (!clientId || !token) {
  throw new Error("Missing required environment variables: PUBLIC_TINA_CLIENT_ID or TINA_TOKEN");
}

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
      mediaRoot: "/assets/blog/",
    },
  },
  schema: {
    collections: [
      {
        name: "post",
        label: "All Post",
        path: "src/data/blog-posts",
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
              options: ["Samuel D. Jnr", "Enerstina"],
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