import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectCoverflow } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/effect-coverflow";
import CarouselCard from "./carousel-card";
import { useEffect, useState } from "react";
import Loading from "./loading";

interface Drama {
  id: string;
  title: string;
  description: string;
  slug: string;
  thumbnail: string;
}

interface ResJson {
  success: boolean;
  data: Drama[];
}

const Carousel = () => {
  const [data, setData] = useState<Drama[]>([]);

  const fetchData = async () => {
    const res = await fetch(`${import.meta.env.VITE_API_BASEURL}/api/v2/drama`);
    const resJson = (await res.json()) as ResJson;

    if (!resJson.success) return alert("something when wrong!");

    setData(resJson.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (data.length < 1) return <Loading />;

  return (
    <Swiper
      modules={[Autoplay, EffectCoverflow]}
      effect="coverflow"
      centeredSlides
      autoplay={{ delay: 3000, disableOnInteraction: false }}
      slidesPerView="auto"
      coverflowEffect={{
        rotate: 0,
        stretch: 0,
        depth: 100,
        modifier: 2.5,
        slideShadows: false,
      }}
      className="py-1 !h-72"
    >
      {data.length > 0
        ? data.map((drama) => (
            <SwiperSlide
              key={drama.id}
              className="!w-[280px] !md:w-[400px] h-60 xl:w-[500px] rounded-xl relative"
            >
              <CarouselCard
                title={drama.title}
                description={drama.description}
                thumbnail={drama.thumbnail}
                slug={drama.slug}
              />
            </SwiperSlide>
          ))
        : "Data not found"}
    </Swiper>
  );
};

export default Carousel;
