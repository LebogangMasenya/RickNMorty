import { type EpisodeProp } from "./EpisodesList"; 

export default function EpisodeCard({ data }: { data: EpisodeProp }) {
  return (
    <div className="card w-full bg-base-200 shadow-md border-l-4 border-secondary hover:bg-base-300 transition-colors">
      <div className="card-body py-4 px-6 flex-row items-center justify-between">
        
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <span className="badge badge-secondary font-mono font-bold">
              {data.episode}
            </span>
            <h2 className="text-lg font-bold truncate max-w-50 md:max-w-md">
              {data.name}
            </h2>
          </div>
          <div className="text-xs opacity-60 flex items-center gap-1">
            Aired: {data.air_date}
          </div>
        </div>

        <div className="flex flex-col items-end">
          <div className="stat-desc font-semibold text-primary">
            {data.characters.length} Characters
          </div>
        </div>
        
      </div>
    </div>
  );
}