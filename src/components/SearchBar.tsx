import type { ReactEventHandler } from "react";
interface SearchBarProps {
  // We name it 'onSearch' to follow standard naming conventions
  onSearch: (value: string) => void;
}

export default function SearchBar({ onSearch }: SearchBarProps) {    
    return (
        <label className="input">
   
            <input type="search" onChange={(e) => onSearch(e.target.value)} required placeholder="Search" />
        </label>
    )
}