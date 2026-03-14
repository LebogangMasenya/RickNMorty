
import { create } from "zustand";
interface StateStore {
    searchTerm: string,
    currentPage: number,
    setSearchTerm: (term: string) => void,
    getSearchTerm: () => string,
    setCurrentPage: (page: number) => void,
    getCurrentPage: () => number,
}
const useStore = create<StateStore>((set, get) => ({
    searchTerm: " ",
    currentPage: 1,
    setSearchTerm: (term: string) => set({ searchTerm: term }),
    getSearchTerm: () : string => {const {searchTerm} = get(); return searchTerm},
    setCurrentPage: (page: number) => set({ currentPage: page }),
    getCurrentPage: () : number => {const {currentPage} = get(); return currentPage},
}));

export default useStore;