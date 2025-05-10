import { DramaDetail, Episode } from "@/types";
import { Listbox, ListboxItem } from "@heroui/listbox";
import { useEffect, useState } from "react";
import Loading from "./loading";
import type { Selection } from "@react-types/shared";
import ThumbnailEpisode from "./thumbnail-episode";

const ListboxWrapper = ({ children }: { children: React.ReactNode }) => (
  <div className="w-full overflow-y-scroll my-4 h-40 border-small px-1 py-2 rounded-small border-default-200 dark:border-default-100">
    {children}
  </div>
);

interface ListEpisodeProps {
  slug: string;
  epSlug: string | undefined;
}

const ListEpisode: React.FC<ListEpisodeProps> = ({ slug, epSlug }) => {
  const [listEpisode, setListEpisode] = useState<Episode[]>();
  const [drama, setDrama] = useState<DramaDetail>();
  const [selectedKeys, setSelectedKeys] = useState<Selection>(
    new Set([epSlug || ""])
  );

  const fetchEp = async () => {
    const res = await fetch(
      `${import.meta.env.VITE_API_BASEURL}/api/v2/drama/${slug}`
    );
    const jsonData = await res.json();

    setListEpisode(jsonData.data.episodes);
    setDrama(jsonData.data);
  };

  useEffect(() => {
    fetchEp();
  }, [slug]);

  useEffect(() => {
    if (epSlug) {
      setSelectedKeys(new Set([epSlug]));
    }
  }, [epSlug]);

  if (!listEpisode || !drama) return <Loading />;

  return (
    <ListboxWrapper>
      <Listbox
        aria-label={`List episode Drama`}
        variant="shadow"
        color="secondary"
        selectedKeys={selectedKeys}
        selectionMode="single"
        onSelectionChange={setSelectedKeys}
        defaultSelectedKeys={selectedKeys}
        shouldHighlightOnFocus={true}
      >
        {listEpisode.map((episode) => (
          <ListboxItem
            autoFocus
            aria-label={`Drama ${drama.title}`}
            description={`Episode ${episode.episodeNum}`}
            href={`/drama/watch/${episode.slug}`}
            key={episode.slug}
            startContent={<ThumbnailEpisode src={drama.thumbnail} />}
          >
            {drama.title}
          </ListboxItem>
        ))}
      </Listbox>
    </ListboxWrapper>
  );
};

export default ListEpisode;
