export interface LocationProps {
id: number;
name: string;
type: string;
dimension: string;
residents: string[];
url: string;
}

import { fetchLocations } from "../services/locations.api";
import useStore from "../store/store";

export default function Location() {
    const locations: LocationProps[] = [];
    const  selectedLocation = useStore((state) => state.selectedLocation); // This is an array of location IDs or null

    
    const { data, isLoading } = fetchLocations(selectedLocation || []);

    
    if (isLoading) return <span className="loading loading-spinner"></span>;
    
    locations.push(...data?.pages.flat() || []);

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Locations</h2>
            <p className="text-sm opacity-50">Explore the various locations in the Rick and Morty universe.</p>

                {locations?.length === 0 ? (
                    <div className="flex flex-col items-center gap-4 mt-8">
                        <p className="text-gray-500">No locations found. Try searching for something else.</p>
                    </div>
                ) : (
                    <ul className="space-y-4 mt-6">
                        {locations?.map((location) => (
                            <li key={location.id} className="p-4 border rounded-lg shadow-sm hover:shadow-md transition-shadow">
                                <h3 className="text-lg font-semibold">{location.name}</h3>
                                <p className="text-sm text-gray-600">Type: {location.type}</p>
                                <p className="text-sm text-gray-600">Dimension: {location.dimension}</p>
                                <p className="text-sm text-gray-600">Residents: {location.residents?.length}</p>
                            </li>
                        ))}
                    </ul>
                )}

        </div>
    )
}