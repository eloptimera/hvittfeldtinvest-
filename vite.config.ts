// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - TanStack devtools (dev-only, first), tanstackStart, viteReact, tailwindcss, tsConfigPaths,
//     nitro (build-only using cloudflare as a default target), VITE_* env injection, @ path alias,
//     React/TanStack dedupe, error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

// Sajtens publika adress, används i canonical-länkar, sitemap, delningsbilder och strukturerad
// data. På Vercel används projektets produktionsdomän (VERCEL_PROJECT_PRODUCTION_URL) – även i
// förhandsversioner – så att Google bara indexerar en adress. Kopplas en egen domän i Vercel
// följer den med automatiskt. SAJT_URL överstyr vid behov (t.ex. https://www.hvittfeldtinvest.se).
const produktion = process.env["VERCEL_PROJECT_PRODUCTION_URL"];
const sajtUrl =
  process.env["SAJT_URL"] ?? (produktion ? `https://${produktion}` : "http://localhost:3000");

export default defineConfig({
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
  },
  vite: {
    define: {
      __SAJT_URL__: JSON.stringify(sajtUrl.replace(/\/$/, "")),
      // Verifieringskoder för Google Search Console och Bing Webmaster Tools.
      // Sätts som miljövariabler i Vercel – se README.
      __VERIFIERING__: JSON.stringify({
        google: process.env["GOOGLE_SITE_VERIFICATION"] ?? "",
        bing: process.env["BING_SITE_VERIFICATION"] ?? "",
      }),
      // Spårverktyg som kräver samtycke. Tomt = avstängt och ingen cookiebanner. Se README.
      __SPARVERKTYG__: JSON.stringify({
        metaPixel: process.env["META_PIXEL_ID"] ?? "",
        clarity: process.env["CLARITY_ID"] ?? "",
      }),
    },
  },
});
