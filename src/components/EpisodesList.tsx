
export interface EpisodeProp {
  id: number;
  name: string;
  air_date: string;
  episode: string;
  characters: string[]; // Array of character URLs
  url: string;
  created: string;
}

import { fetchEpisodes } from "../services/episode.api";
import EpisodeCard from "./Episode";
import useStore from "../store/store";
import { useMemo } from "react";


export default function EpisodeList({ ids }: { ids: number[] }) {
  const episodes = fetchEpisodes(ids);
  const episodeStore = useStore((state) => state.allEpisodes);
  const selectedEpisode = useStore((state) => state.selectedEpisode);

  const data: EpisodeProp[] = episodes.data;
  const allEpisodes = episodeStore.flat();

  const displayEpisodes = useMemo(() => {
    if (selectedEpisode) {
      // 2. Filter the list to include ONLY episodes whose IDs are in your selectedEpisode array
      const filteredEpisodes = allEpisodes.filter((ep: EpisodeProp) =>
        selectedEpisode.includes(ep.id)
      );
      return filteredEpisodes;
    } else {
      return data;
    }
  }, [episodeStore, selectedEpisode]);

  if (episodes.isLoading) return <span className="loading loading-spinner"></span>;



  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-end mb-8 border-b border-base-300 pb-4">
        <div>
          <p className="text-base-content/60 text-sm">
            Browsing {displayEpisodes?.length} entries from the multiverse
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {displayEpisodes?.map((ep) => (
          <EpisodeCard key={ep.id} data={ep} />
        ))}
      </div>
    </div>
  )
}