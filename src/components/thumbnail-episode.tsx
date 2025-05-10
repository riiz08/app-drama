import { Image } from "@heroui/image";

interface ThumbnailEpisodeProps {
  src: string;
}

const ThumbnailEpisode: React.FC<ThumbnailEpisodeProps> = ({ src }) => {
  return <Image src={src} className="w-24" />;
};

export default ThumbnailEpisode;
