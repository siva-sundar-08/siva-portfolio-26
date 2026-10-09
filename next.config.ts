import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static HTML export for GitHub Pages (no Node server).
  output: "export",
  turbopack: {
    // The repo root holds the old Vite app's lockfile; pin Turbopack to this app.
    root: path.resolve("."),
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  // GitHub Pages has no image optimizer; serve images as-is.
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
