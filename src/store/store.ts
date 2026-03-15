
import { create } from "zustand";

import {useAllCharacters, fetchCharacters} from "../services/character.api";
import { useAllEpisodes, fetchEpisodes } from "../services/episode.api";
import { type CharacterProp } from "../components/CharacterList";
import { type EpisodeProp } from "../components/EpisodesList";
import { type LocationProps } from "../components/Location";
import { useAllLocations } from "../services/locations.api";
interface StateStore {
    allCharacters: CharacterProp[];
    allEpisodes: EpisodeProp[];
    allLocations: LocationProps[];
    searchTerm: string,
    currentPage: number,
    selectedCharacter: CharacterProp | null;
    selectedEpisode: number[] | null;
    selectedLocation: number[] | null;
    setSearchTerm: (term: string) => void,
    getSearchTerm: () => string,
    setCurrentPage: (page: number) => void,
    getCurrentPage: () => number,
    getAllCharacters: () => Promise<void>,
    getAllEpisodes: () => Promise<void>,
    getAllLocations: () => Promise<void>,
    setSelectedCharacter: (character: CharacterProp | null) => void;
    setSelectedEpisode: (episode: number[] | null) => void;
    setSelectedLocation: (location: number[] | null) => void;
}
const useStore = create<StateStore>((set, get) => ({
    allCharacters: [],
    allEpisodes: [],
    allLocations: [],
    selectedCharacter: null,
    selectedEpisode: null,
    selectedLocation: null,
    searchTerm: "",    
    currentPage: 1,
    setSearchTerm: (term: string) => set({ searchTerm: term, selectedCharacter: null, selectedEpisode: null, selectedLocation: null }),
    getSearchTerm: () : string => {const {searchTerm} = get(); return searchTerm},
    setCurrentPage: (page: number) => set({ currentPage: page }),
    getCurrentPage: () : number => {const {currentPage} = get(); return currentPage},

    getAllCharacters: async () => {
       const data =   useAllCharacters();
 
        set({ allCharacters: data.data.results });
    },
    getAllEpisodes: async () => {
        const data = useAllEpisodes();
        set({ allEpisodes: data.data.results });
    },
    getAllLocations: async () => {
        const data =  useAllLocations();
        set({ allLocations: data.data.results });    
    },

    setSelectedCharacter: (character: CharacterProp | null) => set({ selectedCharacter: character }),
    setSelectedEpisode: (episode: number[] | null) => set({ selectedEpisode: episode }),
    setSelectedLocation: (location: number[] | null) => set({ selectedLocation: location }),
}));

export default useStore;