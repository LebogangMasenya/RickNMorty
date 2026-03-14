
// infinite scroll
import CharacterList from "../components/CharacterList";
import SearchBar from "../components/SearchBar";
import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import { fetchCharacter } from "../services/character.api";
import { useQuery } from "@tanstack/react-query";
export function Characters() {
  const totalCharacters = 826;
  const ids = Array.from({ length: totalCharacters }, (_, i) => i + 1);

  const [text, setText] = useState("");
  // This will only update 'query' 500ms after the user stops typing
  const [query] = useDebounce(text, 500);

  const { data: char_id } = useQuery({
    queryKey: ['character-ids', query],
    queryFn: async () => {
      if (!query) return null;


      fetchCharacter(query)
    }
  });

  const idsToShow = query ? (char_id ?? []) : ids;
  return (
    <div className="flex flex-col h-full">

      <div className="p-4 border-b border-slate-800">
        <SearchBar onSearch={setText} />
      </div>

      <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
        <CharacterList ids={idsToShow} />
      </div>

    </div>
  )
}