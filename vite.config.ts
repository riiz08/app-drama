import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import Sitemap from "vite-plugin-sitemap";

// Fungsi fetch data dengan struktur response umum: { data: ... }
async function getJson<T>(url: string): Promise<T> {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to fetch ${url}`);
  return await res.json(); // return seluruh response agar fleksibel
}

// Konfigurasi async agar bisa fetch data sebelum build
export default defineConfig(async () => {
  // Fetch daftar drama
  const dramaResponse = await getJson<{ data: Array<{ slug: string }> }>(
    "https://api.mangeakkk.my.id/api/v2/drama"
  );
  const dramaList = dramaResponse.data;

  const detailRoutes: string[] = [];
  const watchRoutes: string[] = [];

  for (const drama of dramaList) {
    detailRoutes.push(`/drama/detail/${drama.slug}`);

    try {
      // Fetch detail drama (per slug)
      const detailResponse = await getJson<{
        data: { episodes?: Array<{ slug: string }> };
      }>(`https://api.mangeakkk.my.id/api/v2/drama/${drama.slug}`);

      const episodes = detailResponse.data.episodes;

      console.log({ detailResponse });

      if (Array.isArray(episodes)) {
        for (const ep of episodes) {
          watchRoutes.push(`/drama/watch/${ep.slug}`);
        }
      } else {
        console.warn(
          `Drama ${drama.slug} tidak memiliki episodes atau format salah.`
        );
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
        hostname: "https://mangeakkk.my.id",
        dynamicRoutes: allRoutes,
      }),
    ],
  };
});
