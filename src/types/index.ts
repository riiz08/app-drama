import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export type DramaCardProps = {
  title: string;
  slug: string;
  thumbnail: string;
  episodeNum?: number;
  hrefPrefix?: string; // optional, default to "/watch"
  isRecomended?: boolean;
  classname?: string;
};

export type LatestEpisode = {
  id: string;
  slug: string;
  episodeNum: number;
  drama: {
    title: string;
    thumbnail: string;
  };
};

export type DramaRecomended = {
  id: string;
  slug: string;
  thumbnail: string;
  title: string;
};

export type PaginationType = {
  page: number;
  limit: number;
  totalPages: number;
  length: number;
};

export type Episode = {
  id: string;
  slug: string;
  publishedAt: string;
  videoSrc: string;
  episodeNum: number;
  dramaId: string;
};

export type DramaDetail = {
  id?: string;
  slug?: string;
  title: string;
  description: string;
  thumbnail: string;
  tarikhTayangan: string;
  waktuSiaran: string;
  rangkaian: string;
  pengarah: string;
  produksi: string;
  episodes: Episode[];
};
