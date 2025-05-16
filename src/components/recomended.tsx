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
      <div className="flex items-center justify-start overflow-auto gap-3 px-2">
        {data.map((drama) => (
          <DramaCard
            key={drama.id}
            thumbnail={drama.thumbnail}
            title={drama.title}
            slug={drama.slug}
            hrefPrefix="/drama/detail"
            isRecomended={true}
            classname="md:w-36 w-36"
          />
        ))}
      </div>
    </div>
  );
};

export default Recomended;
