import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import Sitemap from "vite-plugin-sitemap";

async function getJson<T>(url: string): Promise<T> {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to fetch ${url}`);
  const jsonData = await res.json();
  return jsonData.data;
}

// Konfigurasi async agar bisa fetch data sebelum build
export default defineConfig(async () => {
  const dramaList = await getJson<Array<{ slug: string }>>(
    "https://api.mangeakkk.my.id/api/v2/drama"
  );

  const detailRoutes: string[] = [];
  const watchRoutes: string[] = [];

  for (const drama of dramaList) {
    detailRoutes.push(`/drama/detail/${drama.slug}`);

    try {
      const detail = await getJson<{ episodes: Array<{ slug: string }> }>(
        `https://api.mangeakkk.my.id/api/v2/drama/${drama.slug}`
      );

      for (const ep of detail.episodes) {
        watchRoutes.push(`/drama/watch/${ep.slug}`);
      }
    } catch (err) {
      console.warn(`Gagal ambil detail dari ${drama.slug}:`, err);
    }
  }

  const staticRoutes = ["/", "/drama/latest-update"];
  const allRoutes = [...staticRoutes, ...detailRoutes, ...watchRoutes];

  return {
    plugins: [
      react(),
      tsconfigPaths(),
      Sitemap({
        hostname: "https://mangeakkk.my.id", // ← perbaiki typo: htpps → https
        dynamicRoutes: allRoutes,
      }),
    ],
  };
});
