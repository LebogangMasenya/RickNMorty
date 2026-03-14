import type { ReactEventHandler } from "react";
interface SearchBarProps {
  onSearch: (value: string) => void;
}

export default function SearchBar({ onSearch }: SearchBarProps) {    
    return (
<div className="sticky top-0 z-10 bg-slate-900 pb-4">
  <input 
    type="text"
    onChange={(e) => onSearch(e.target.value)}
    placeholder="Search characters..."
    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
  />
</div>
    )
}