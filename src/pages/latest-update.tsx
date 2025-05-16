import DramaCard from "@/components/drama-card";
import LatestUpdateLayout from "@/layouts/latest-update";
import { LatestEpisode, PaginationType } from "@/types";
import { useEffect, useState } from "react";
import { Pagination } from "@heroui/pagination";
import Loading from "@/components/loading";
import Recomended from "@/components/recomended";
import StickySocialBar from "@/components/sticky-social-bar";
import AdsterraBanner from "@/components/adsterra-banner";

interface JsonData {
  success: boolean;
  data: LatestEpisode[];
  pagination: PaginationType;
}

const LatestUpdate = () => {
  const [data, setData] = useState<LatestEpisode[]>([]);
  const [pagination, setPagination] = useState<PaginationType>();
  const [currentPage, setCurrentPage] = useState(1);

  const fetchingDramas = async (page = 1) => {
    const res = await fetch(
      `${import.meta.env.VITE_API_BASEURL}/api/v2/drama/latest-update?page=${page}`
    );
    const jsonData = (await res.json()) as JsonData;

    if (!jsonData.success) return <Loading />;

    setData(jsonData.data);
    setPagination(jsonData.pagination);
  };

  useEffect(() => {
    fetchingDramas(currentPage);
  }, [currentPage]);

  return (
    <LatestUpdateLayout>
      <h3 className="text-xl font-medium">Terbaru</h3>
      <div className="flex justify-start items-center w-full gap-1 flex-wrap">
        {data.length > 0 ? (
          data.map((drama) => (
            <DramaCard
              key={drama.id}
              slug={drama.slug}
              title={drama.drama.title}
              thumbnail={drama.drama.thumbnail}
              episodeNum={drama.episodeNum}
              hrefPrefix="/watch"
              classname="w-32"
            />
          ))
        ) : (
          <Loading />
        )}
      </div>
      {pagination ? (
        <Pagination
          isCompact
          showControls
          initialPage={pagination.page}
          total={pagination.totalPages}
          onChange={(page) => setCurrentPage(page)}
          className="mx-auto py-4"
        />
      ) : (
        ""
      )}
      <AdsterraBanner />
      <Recomended />
      <StickySocialBar />
    </LatestUpdateLayout>
  );
};

export default LatestUpdate;
