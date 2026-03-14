import { type CharacterProp } from "./CharacterList"; 

export default function CharacterCard({ data }: { data: CharacterProp }) {
  return (
    <div className="card card-compact w-full bg-base-100 shadow-xl border border-base-200 hover:shadow-2xl transition-shadow">
      <figure>
        <img 
          src={data.image} 
          alt={data.name} 
          className="w-full aspect-square object-cover"
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
          <div className="text-sm truncate">{data.location.name}</div>
        </div>

        <div className="card-actions justify-end mt-4">
          <button className="btn btn-primary btn-sm btn-outline">
            View Episodes
            <div className="badge badge-secondary badge-xs">
              {data.episode.length}
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}