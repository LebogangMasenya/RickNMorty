
// infinite scroll
import CharacterList from "../components/CharacterList";
import SearchBar from "../components/SearchBar";

import useStore from "../store/store";

export function Characters() {
  const totalCharacters = 826;
  const ids = Array.from({ length: totalCharacters }, (_, i) => i + 1);



  const idsToShow = ids;
  return (
    <div className="flex flex-col h-full">

      <div className="p-4 border-b border-slate-800">
        <SearchBar onSearch={useStore((state) => state.setSearchTerm)} />
      </div>

      <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
        <CharacterList ids={idsToShow} />
      </div>

    </div>
  )
}