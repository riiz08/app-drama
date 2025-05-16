import AdsterraBanner from "@/components/adsterra-banner";
import AdsterraNative from "@/components/adsterra-native";
import Carousel from "@/components/carousel";
import LatestUpdate from "@/components/latest-update";
import Recomended from "@/components/recomended";
import SeoMeta from "@/components/seo-meta";
import StickySocialBar from "@/components/sticky-social-bar";
import DefaultLayout from "@/layouts/default";

export default function index() {
  return (
    <DefaultLayout>
      <SeoMeta
        title="Mangeakkk - Streaming Drama Malaysia Full Episode"
        description="Nonton drama Malaysia terbaru full episode hanya di Mangeakkk. Update setiap hari, tanpa iklan mengganggu. Streaming cepat dan gratis!"
        image="https://mangeakkk.my.id/logo/mangeakkk.png"
        url="https://mangeakkk.my.id"
      />
      <StickySocialBar />
      <Carousel />
      <LatestUpdate />
      <AdsterraBanner />
      <Recomended />
      <AdsterraNative />
    </DefaultLayout>
  );
}
