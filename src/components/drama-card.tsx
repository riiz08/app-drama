import { DramaCardProps } from "@/types";
import { Image } from "@heroui/image";
import { Link } from "@heroui/link";

const DramaCard: React.FC<DramaCardProps> = ({
  title,
  slug,
  thumbnail,
  episodeNum,
  hrefPrefix,
  isRecomended,
}) => {
  return (
    <Link href={`${hrefPrefix}/${slug}`}>
      <div
        className={`group relative flex-shrink-0 rounded-lg overflow-hidden bg-default-100 hover:bg-default-200 cursor-pointer h-60 transition-colors my-2 duration-300 ${isRecomended ? "w-28 md:w-36" : "w-[140px]"}`}
      >
        <Image
          alt={`Drama ${title}`}
          className="w-full h-auto max-h-44 object-cover transition-transform duration-300 group-hover:scale-105"
          src={thumbnail}
          width={200}
          height={300}
        />
        <div className="p-2">
          <h4
            className={`text-sm font-semibold ${!isRecomended ? "overflow-hidden text-ellipsis whitespace-nowrap" : ""}`}
          >
            {title}
          </h4>
          {episodeNum !== undefined && (
            <p className="text-default-500 text-xs mt-1 line-clamp-2">
              Episode {episodeNum}
            </p>
          )}
        </div>
      </div>
    </Link>
  );
};

export default DramaCard;
