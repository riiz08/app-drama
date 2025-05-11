import SeoMeta from "@/components/seo-meta";
import VideoPlayer from "@/components/video-player";
import WatchLayout from "@/layouts/watch";
import { Card, CardBody } from "@heroui/card";
import { Button } from "@heroui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loading from "@/components/loading";
import Recomended from "@/components/recomended";
import { Episode } from "@/types";
import ListEpisode from "@/components/list-episode";
import { useNavigate } from "react-router-dom";
import StickySocialBar from "@/components/sticky-social-bar";
import AdsterraBanner from "@/components/adsterra-banner";
import useAdsterraAds from "@/hooks/useAdstera";

interface DramaDetail {
  slug: string;
  title: string;
  description: string;
  thumbnail: string;
  tarikhTayangan: string;
  waktuSiaran: string;
  rangkaian: string;
  pengarah: string;
  produksi: string;
  episodes: Episode[];
}

interface EpJson {
  success: true;
  data: Episode;
}

interface DramaJson {
  success: boolean;
  data: DramaDetail;
}

const WatchPage = () => {
  const { slug } = useParams();
  const [episode, setEpisode] = useState<Episode>();
  const [drama, setDrama] = useState<DramaDetail>();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const [hasPlayed, setHasPlayed] = useState(false);

  useAdsterraAds({
    socialBarScriptUrl:
      "//comelysouthbuilds.com/6b/61/56/6b61565cfcca3a10ad6fb576bb075de5.js",
    popunderScriptUrl:
      "//comelysouthbuilds.com/b2/5a/35/b25a352547c63a8a406bc8114678a2e3.js",
    intervalMinutes: 5,
    shouldStartPopunder: hasPlayed,
  });

  useEffect(() => {
    const fetchAll = async () => {
      if (!slug) return;

      setLoading(true);
      setDrama(undefined);
      setEpisode(undefined);

      try {
        // fetch episode dulu
        const epRes = await fetch(
          `${import.meta.env.VITE_API_BASEURL}/api/v2/episode/detail/${slug}`
        );
        const epJson = (await epRes.json()) as EpJson;

        if (!epJson.success) throw new Error("Episode not found");
        setEpisode(epJson.data);

        // fetch drama berdasarkan episode.dramaId
        const dramaRes = await fetch(
          `${import.meta.env.VITE_API_BASEURL}/api/v2/drama/by/${epJson.data.dramaId}`
        );
        const dramaJson = (await dramaRes.json()) as DramaJson;

        if (!dramaJson.success) throw new Error("Drama not found");
        setDrama(dramaJson.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchAll();
  }, [slug]);

  if (loading || !episode || !drama) return <Loading />;

  const sortedEpisodes = [...(drama?.episodes || [])].sort(
    (a, b) => a.episodeNum - b.episodeNum
  );
  const currentIndex = sortedEpisodes.findIndex(
    (ep) => ep.slug === episode?.slug
  );

  const prevEpisode =
    currentIndex > 0 ? sortedEpisodes[currentIndex - 1] : null;
  const nextEpisode =
    currentIndex < sortedEpisodes.length - 1
      ? sortedEpisodes[currentIndex + 1]
      : null;

  const goToEpisode = (slug: string) => {
    navigate(`/drama/watch/${slug}`);
  };

  return (
    <WatchLayout>
      <SeoMeta
        title={`${drama.title} - Episode ${episode.episodeNum}`}
        description={`Tonton ${drama.title} episode ${episode.episodeNum} secara online hanya di Mangeakkk. Streaming lancar tanpa gangguan!`}
        image={drama.thumbnail}
        url={`https://mangeakkk.my.id/drama/watch/${episode.slug}`}
      />
      <StickySocialBar />
      <AdsterraBanner />
      <div className="mb-2">
        <h1 className="text-foreground-900 font-medium text-xl">
          {drama.title} - Episode {episode.episodeNum}
        </h1>
      </div>
      <Card>
        <CardBody>
          <VideoPlayer
            src={episode.videoSrc}
            onPlay={() => setHasPlayed(true)}
          />
        </CardBody>
      </Card>
      <div className="flex w-full justify-center items-center gap-1 my-2">
        <Button
          className="w-1/2"
          onPress={() => prevEpisode && goToEpisode(prevEpisode.slug)}
          disabled={!prevEpisode}
        >
          <ChevronLeft strokeWidth={2.5} />
        </Button>
        <Button
          className="w-1/2"
          onPress={() => nextEpisode && goToEpisode(nextEpisode.slug)}
          disabled={!nextEpisode}
        >
          <ChevronRight strokeWidth={2.5} />
        </Button>
      </div>
      <Card>
        <CardBody>
          <p className="text-xs text-default-500">{drama.description}</p>
          <div className="my-2">
            <p className="font-semibold text-sm">
              Tarikh Tayangan:{" "}
              <span className="font-normal">{drama.tarikhTayangan}</span>
            </p>
            <p className="font-semibold text-sm">
              Waktu Siaran:{" "}
              <span className="font-normal">{drama.waktuSiaran}</span>
            </p>
            <p className="font-semibold text-sm">
              Rangkaian: <span className="font-normal">{drama.rangkaian}</span>
            </p>
            <p className="font-semibold text-sm">
              Pengarah: <span className="font-normal">{drama.pengarah}</span>
            </p>
            <p className="font-semibold text-sm">
              Produksi: <span className="font-normal">{drama.produksi}</span>
            </p>
          </div>
          <div>
            <ListEpisode slug={drama.slug} epSlug={slug} />
          </div>
        </CardBody>
      </Card>
      <Recomended />
    </WatchLayout>
  );
};

export default WatchPage;
