import { useEffect, useState } from "react";
import DramaCard from "./drama-card";
import { DramaRecomended } from "@/types";

interface JsonData {
  success: boolean;
  data: DramaRecomended[];
}

const Recomended = () => {
  const [data, setData] = useState<DramaRecomended[]>([]);

  const fetchTrending = async () => {
    const res = await fetch(
      `${import.meta.env.VITE_API_BASEURL}/api/v2/drama/trending`
    );
    const jsonData = (await res.json()) as JsonData;

    if (!jsonData.success) return alert("fetching failed");

    setData(jsonData.data);
  };

  useEffect(() => {
    fetchTrending();
  }, []);

  return (
    <div className="my-3">
      <h3 className="text-xl font-medium mb-2">Recomended</h3>
      <div className="grid grid-cols-5 gap-36 overflow-auto md:grid-cols-9 md:gap-16">
        {data.map((drama) => (
          <DramaCard
            key={drama.id}
            thumbnail={drama.thumbnail}
            title={drama.title}
            slug={drama.slug}
            hrefPrefix="/drama/detail"
            isRecomended={true}
          />
        ))}
      </div>
    </div>
  );
};

export default Recomended;
