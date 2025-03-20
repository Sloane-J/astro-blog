import { defineConfig } from "tinacms";

export default defineConfig({
  branch: process.env.TINA_BRANCH || process.env.HEAD || "main",
  clientId: process.env.TINA_CLIENT_ID || "",
  token: process.env.TINA_TOKEN || "",
  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  media: {
    tina: {
      mediaRoot: "blog",
      publicFolder: "public/assets/",
    },
  },
  schema: {
    collections: [
      {
        name: "post",
        label: "Posts",
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
              options: ["News", "Tech and Science", "Trailers", "Deals"],
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