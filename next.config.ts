import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The local preview is opened through 127.0.0.1 in Codex. Explicitly allow
  // that development origin so the client bundle and HMR can hydrate normally.
  allowedDevOrigins: ["127.0.0.1"],

  // GitHub Pages only serves static files. `export` produces the deployable
  // `out/` directory used by the workflow below.
  output: "export",
  trailingSlash: true,
};

export default nextConfig;
