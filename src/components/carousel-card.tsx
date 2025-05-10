import { Image } from "@heroui/image";
import { Link } from "@heroui/link";

interface CarouselCardProps {
  title: string;
  description: string;
  thumbnail: string;
  slug: string;
}

const CarouselCard: React.FC<CarouselCardProps> = ({
  title,
  description,
  thumbnail,
  slug,
}) => {
  return (
    <Link href={`/drama/detail/${slug}`}>
      <Image
        src={thumbnail}
        alt={`Drama ${title}`}
        className="!w-72 !md:w-96 !h-60 !md:h-72"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10 p-4 flex flex-col justify-end">
        <span className="text-xs bg-red-600 text-white px-2 py-1 rounded-full w-fit mb-2">
          Trending
        </span>
        <h3 className="text-white font-bold text-lg">{title}</h3>
        <p className="text-white/80 text-sm line-clamp-2">{description}</p>
      </div>
    </Link>
  );
};

export default CarouselCard;
