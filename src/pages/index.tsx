import AdsterraBanner from "@/components/adsterra-banner";
import Carousel from "@/components/carousel";
import LatestUpdate from "@/components/latest-update";
import Recomended from "@/components/recomended";
import StickySocialBar from "@/components/sticky-social-bar";
import DefaultLayout from "@/layouts/default";

export default function index() {
  return (
    <DefaultLayout>
      <StickySocialBar />
      <Carousel />
      <LatestUpdate />
      <Recomended />
      <AdsterraBanner />
    </DefaultLayout>
  );
}
