import { type CharacterProp } from "./CharacterList"; 
import useStore from "../store/store";

export default function CharacterCard({ data }: { data: CharacterProp }) {
  const episodeIds = data.episode.map((url) => {
    const parts = url.split("/");
    return parseInt(parts[parts.length - 1], 10);
  });

      const locationId = parseInt(data.location.url.split("/").pop() || "0", 10);

  function handleClick() {
    useStore.setState({ selectedEpisode: episodeIds || [] });
    useStore.setState({ selectedLocation: locationId ? [locationId] : [] });
  }
  return (
    <div className="card card-compact w-full bg-base-100 shadow-xl border border-base-200 hover:shadow-2xl transition-shadow">
      <figure className="relative">
        <div className="absolute inset-0 flex items-center justify-center bg-base-200 animate-pulse">
          <span className="loading loading-spinner loading-lg text-primary"></span>
        </div>

        <img
          src={data.image}
          alt={data.name}
          className="w-full aspect-square object-cover opacity-0 transition-opacity duration-300"
          onLoad={(e) => {
        e.currentTarget.classList.remove("opacity-0");
        e.currentTarget.previousElementSibling?.classList.add("hidden");
          }}
        />
      </figure>

      <div className="card-body">
        <div className="flex justify-between items-start">
          <h2 className="card-title text-primary">{data.name}</h2>
          <div className={`badge ${data.status === 'Alive' ? 'badge-success' : data.status === 'Dead' ? 'badge-error' : 'badge-ghost'}`}>
            {data.status}
          </div>
        </div>

        <p className="text-sm opacity-70">
          {data.species} — {data.gender}
        </p>

        <div className="mt-2 space-y-1">
          <div className="text-xs font-bold uppercase opacity-50">Last known location:</div>
          <div className="text-sm truncate">{data.location?.name}</div>
        </div>

        <div className="card-actions justify-end mt-4">          
          <button className="btn btn-primary btn-sm btn-outline" onClick={handleClick}>
            View Episodes and Location
            <div className="badge badge-secondary badge-xs">
              {data.episode?.length}
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}