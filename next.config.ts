import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // ephemeris is a CommonJS package with optional backend adapters. Loading
  // it through webpack replaces the optional `sweph` require with a stub,
  // which crashes while reading SEFLG_MOSEPH. Keep it as a real Node import.
  serverExternalPackages: ["ephemeris"],
};

export default nextConfig;
