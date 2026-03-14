
import { fetchCharacters } from "../services/character.api";
import Character from "./Character";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

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

export default function CharacterList({ ids }: { ids: number[] }) {
    const { ref, inView } = useInView()

    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage
    } = fetchCharacters(ids);

    const characterList = data?.pages.flatMap(page => page) ?? [];

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