import { useEffect, useState } from "react";
import DramaCard from "./drama-card";
import { Link } from "@heroui/link";
import { LatestEpisode } from "@/types";
import useIsMobile from "@/hooks/useIsMobile";

interface JsonData {
  success: boolean;
  data: LatestEpisode[];
}

const LatestUpdate = () => {
  const [data, setData] = useState<LatestEpisode[]>([]);
  const isMobile = useIsMobile();

  const fetchLatestUpdate = async () => {
    const res = await fetch(
      `${import.meta.env.VITE_API_BASEURL}/api/v2/drama/latest-update?limit=${isMobile ? 6 : 8}`
    );
    const jsonData = (await res.json()) as JsonData;
    setData(jsonData.data);
  };

  useEffect(() => {
    fetchLatestUpdate();
  }, []);

  return (
    <div className="container">
      <div className="flex justify-between mb-3 items-center">
        <h3 className="text-xl font-medium">Terbaru</h3>
        <Link href="/drama/latest-update" color="secondary">
          Lihat semua
        </Link>
      </div>
      <div className="w-full overflow-x-auto">
        <div className="flex gap-2 w-max px-4 pb-2">
          {data.map((el) => (
            <DramaCard
              key={el.id}
              title={el.drama.title}
              slug={el.slug}
              episodeNum={el.episodeNum}
              thumbnail={el.drama.thumbnail}
              hrefPrefix="/drama/watch"
              classname="w-36"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default LatestUpdate;
