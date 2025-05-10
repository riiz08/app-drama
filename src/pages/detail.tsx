import AdsterraBanner from "@/components/adsterra-banner";
import DetailCard from "@/components/detail-card";
import Loading from "@/components/loading";
import Recomended from "@/components/recomended";
import SeoMeta from "@/components/seo-meta";
import StickySocialBar from "@/components/sticky-social-bar";
import DetailLayout from "@/layouts/detail";
import { DramaDetail } from "@/types";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";

const DetailPage = () => {
  const { slug } = useParams();
  const [data, setData] = useState<DramaDetail>();
  const targetRef = useRef<HTMLDivElement | null>(null);

  const fetchingDrama = async () => {
    const res = await fetch(
      `${import.meta.env.VITE_API_BASEURL}/api/v2/drama/${slug}`
    );
    const jsonData = await res.json();

    if (!jsonData.success) return <Loading />;
    setData(jsonData.data);
  };

  useEffect(() => {
    fetchingDrama();
    targetRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [slug]);

  if (!data) return <Loading />;

  return (
    <DetailLayout>
      <SeoMeta
        title={`${data.title} - Mangeakkk`}
        description={data.description}
        image={data.thumbnail}
        url={`https://mangeakkk.my.id/drama/detail/${data.slug}`}
      />
      <div ref={targetRef}></div>
      <AdsterraBanner />
      <StickySocialBar />
      <DetailCard
        title={data.title}
        thumbnail={data.thumbnail}
        description={data.description}
        tarikhTayangan={data.tarikhTayangan}
        waktuSiaran={data.waktuSiaran}
        rangkaian={data.rangkaian}
        pengarah={data.pengarah}
        produksi={data.produksi}
        episodes={data.episodes}
      />
      <Recomended />
    </DetailLayout>
  );
};

export default DetailPage;
