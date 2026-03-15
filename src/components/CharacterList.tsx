
import { fetchCharacters } from "../services/character.api";
import Character from "./Character";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import useStore from "../store/store";
import { useDebounce } from "use-debounce";
import { useMemo } from "react";
export interface LocationInfo {
    name: string;
    url: string;
}

export interface CharacterProp {
    id: number;
    name: string;
    status: 'Alive' | 'Dead' | 'unknown';
    species: string;
    type: string;
    gender: 'Female' | 'Male' | 'Genderless' | 'unknown';
    origin: LocationInfo;
    location: LocationInfo;
    image: string;
    episode: string[];
    url: string;
    created: string;
}

/*
"episode": [
        "https://rickandmortyapi.com/api/episode/1",
        "https://rickandmortyapi.com/api/episode/2",
]


origin": {
        "name": "Earth",
        "url": "https://rickandmortyapi.com/api/location/1"
      },
      "location": {
        "name": "Earth",
        "url": "https://rickandmortyapi.com/api/location/20"
      },
*/
export default function CharacterList({ ids }: { ids: number[] }) {
    const { ref, inView } = useInView()
    const searchTerm = useStore((state) => state.searchTerm);
    const charaterStore = useStore((state) => state.allCharacters);
    // This will only update 'query' 500ms after the user stops typing
    const [query] = useDebounce(useStore((state) => state.searchTerm), 500);

    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage
    } = fetchCharacters(ids);

    const characterList = useMemo(() => {
        if (query.trim() !== "" && searchTerm && charaterStore.length > 0) {
            return charaterStore.filter((char: CharacterProp) =>
                char.name.toLowerCase().includes(query.toLowerCase()) // fuzzy search on source of truth
            );
        }
        return data?.pages.flatMap(page => page) ?? [];
    }, [query, searchTerm, charaterStore, data]);

    useEffect(() => {
        if (characterList.length === 1) {
            useStore.setState({ selectedCharacter: characterList[0] });
            const selected = characterList[0];
            const episodeIds = selected?.episode.map((ep: string) => {
                const parts = ep.split('/');
                return parseInt(parts[parts.length - 1], 10);
            }) ?? [];
            const locationIds = [selected?.origin.url, selected?.location.url].map((loc: string | null) => {
                if (!loc) return null;
                const parts = loc.split('/');
                return parseInt(parts[parts.length - 1], 10);
            }).filter(id => id !== null) as number[];
            useStore.setState({
                selectedCharacter: selected,
                selectedEpisode: episodeIds,
                selectedLocation: locationIds
            });
        }
    }, [characterList])


    useEffect(() => {
        if (inView && hasNextPage && !isFetchingNextPage) {
            fetchNextPage()
        }
    }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage])

    return (
        <div className="max-w-7xl mx-auto px-4 py-10">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
                <div className="space-y-2">
                    <h1 className="text-5xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary uppercase">
                        Characters
                    </h1>
                </div>

                <div className="flex flex-col gap-8">
                    <div className="grid grid-cols-3 md:grid-cols-3 gap-6">
                        {characterList.map(character => (
                            <Character key={character.id} data={character} />
                        ))}
                    </div>

                    <div ref={ref} className="py-10 flex justify-center">
                        {isFetchingNextPage ? (
                            <span className="loading loading-dots loading-lg text-primary"></span>
                        ) : hasNextPage ? (
                            <span className="text-xs opacity-20 uppercase tracking-widest">Scroll for more</span>
                        ) : (
                            <div className="badge badge-outline opacity-30">End of the Multiverse</div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}