
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

export default function EpisodeList({ids}: {ids: number[]}) {
    const episodes = fetchEpisodes(ids);

    if (episodes.isLoading) return <span className="loading loading-spinner"></span>;
         
    const data : EpisodeProp[] = episodes.data
    return (
        <div className="container mx-auto py-8">
  <div className="flex justify-between items-end mb-8 border-b border-base-300 pb-4">
    <div>
      <p className="text-base-content/60 text-sm">
        Browsing {data.length} entries from the multiverse
      </p>
    </div>
  </div>

  <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
    {data.map((ep) => (
      <EpisodeCard key={ep.id} data={ep} />
    ))}
  </div>
</div>
    )
}