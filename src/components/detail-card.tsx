import { Card, CardBody, CardHeader } from "@heroui/card";
import { Image } from "@heroui/image";
import { DramaDetail } from "@/types";
import { Button } from "@heroui/button";
import { Link } from "@heroui/link";

const DetailCard: React.FC<DramaDetail> = ({
  description,
  episodes,
  pengarah,
  produksi,
  rangkaian,
  tarikhTayangan,
  thumbnail,
  title,
  waktuSiaran,
}) => {
  return (
    <Card className="w-full p-3">
      <CardHeader className="absolute z-10 top-0 flex-col bg-foreground-50/15 backdrop-blur-sm items-start">
        <p className="text-tiny text-foreground-800 uppercase font-bold">
          Drama
        </p>
        <h4 className="text-foreground-900 font-medium text-xl">{title}</h4>
      </CardHeader>
      <Image
        removeWrapper
        alt="Relaxing app background"
        className="z-0 w-full h-full object-cover"
        src={thumbnail}
      />
      <p className="text-tiny text-foreground-600 my-4">{description}</p>
      <p className="font-semibold text-sm">
        Tarikh Tayangan: <span className="font-normal">{tarikhTayangan}</span>
      </p>
      <p className="font-semibold text-sm">
        Waktu Siaran: <span className="font-normal">{waktuSiaran}</span>
      </p>
      <p className="font-semibold text-sm">
        Rangkaian: <span className="font-normal">{rangkaian}</span>
      </p>
      <p className="font-semibold text-sm">
        Pengarah: <span className="font-normal">{pengarah}</span>
      </p>
      <p className="font-semibold text-sm">
        Produksi: <span className="font-normal">{produksi}</span>
      </p>

      <Card
        isBlurred
        className="border-none bg-background/60 my-4 p-1"
        shadow="sm"
      >
        <CardBody className="flex justify-start flex-row flex-wrap gap-2 items-center">
          {episodes.length > 0
            ? episodes.map((episode) => (
                <Button
                  as={Link}
                  href={`/drama/watch/${episode.slug}`}
                  variant="bordered"
                  color="primary"
                  isIconOnly
                  key={episode.id}
                >
                  {episode.episodeNum}
                </Button>
              ))
            : ""}
        </CardBody>
      </Card>
    </Card>
  );
};

export default DetailCard;
