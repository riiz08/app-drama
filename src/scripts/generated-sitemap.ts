import * as fs from "fs-extra";
import fetch from "node-fetch";
import path from "path";

interface JsonDrama {
  success: boolean;
  data: DramaDetail[];
}

interface Episode {
  slug: string;
}

interface DramaDetail {
  slug: string;
  episodes: Episode[];
}

const BASE_URL = "https://mangeakkk.my.id";
const API_BASE = "https://api.mangeakkk.my.id";

async function main() {
  try {
    // Ambil data drama
    const dramaListRes = await fetch(`${API_BASE}/api/v2/drama`);
    const jsonData = (await dramaListRes.json()) as JsonDrama;

    // Pastikan response sukses dan data valid
    if (!jsonData.success || !Array.isArray(jsonData.data)) {
      console.error("Failed to fetch or invalid data structure");
      return;
    }

    const dramaList = jsonData.data;

    const urls: string[] = [];

    for (const drama of dramaList) {
      // Tambahkan URL drama detail
      urls.push(`${BASE_URL}/drama/detail/${drama.slug}`);

      // Ambil detail episode untuk setiap drama
      const detailRes = await fetch(`${API_BASE}/api/v2/drama/${drama.slug}`);
      const detail = await detailRes.json(); // TypeScript menganggap ini unknown

      // Asserting bahwa response detail pasti memiliki properti episodes dengan array
      const typedDetail = detail as { episodes: Episode[] };

      // Pastikan episodes adalah array
      if (Array.isArray(typedDetail.episodes)) {
        for (const episode of typedDetail.episodes) {
          // Tambahkan URL episode
          urls.push(`${BASE_URL}/drama/watch/${episode.slug}`);
        }
      }
    }

    // Generate sitemap.xml
    const sitemap =
      `<?xml version="1.0" encoding="UTF-8"?>\n` +
      `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
      urls.map((url) => `  <url><loc>${url}</loc></url>`).join("\n") +
      `\n</urlset>`;

    // Write to sitemap.xml file
    const outputPath = path.join(process.cwd(), "dist", "sitemap.xml");
    fs.ensureDirSync(path.dirname(outputPath));
    fs.writeFileSync(outputPath, sitemap);
    console.log(`✅ sitemap.xml generated with ${urls.length} routes`);
  } catch (error) {
    console.error("Error:", error);
  }
}

main().catch(console.error);
