import DefaultLayout from "@/layouts/default";
import { DramaDetail } from "@/types";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DetailCard from "@/components/detail-card";

interface ResJson {
  success: boolean;
  data: DramaDetail;
}

const SearchPage = () => {
  const { slug } = useParams();
  const [drama, setDrama] = useState<DramaDetail>();

  useEffect(() => {
    const fetchingData = async () => {
      const res = await fetch(
        `${import.meta.env.VITE_API_BASEURL}/api/v2/drama/search?q=${slug}`
      );
      const resJson = (await res.json()) as ResJson;
      if (resJson.success) setDrama(resJson.data);
    };

    fetchingData();
  }, [slug]);

  return (
    <DefaultLayout>
      {drama ? (
        <div className="container">
          <DetailCard
            title={drama.title}
            thumbnail={drama.thumbnail}
            description={drama.description}
            tarikhTayangan={drama.tarikhTayangan}
            waktuSiaran={drama.waktuSiaran}
            rangkaian={drama.rangkaian}
            pengarah={drama.pengarah}
            produksi={drama.produksi}
            episodes={drama.episodes}
          />
        </div>
      ) : (
        <div className="flex items-center justify-center h-screen">
          <h1 className="font-bold text-2xl">Drama tidak ditemukan!</h1>
        </div>
      )}
    </DefaultLayout>
  );
};

export default SearchPage;
