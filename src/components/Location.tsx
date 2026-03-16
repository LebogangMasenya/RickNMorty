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
    const selectedLocation = useStore((state) => state.selectedLocation); // This is an array of location IDs or null
    const allLocations = useStore((state) => state.allLocations); // This is the array of all location data from the store
    const filteredLocations = allLocations.filter((loc) => selectedLocation?.includes(loc.id)); // Filter the locations based on selectedLocation IDs

    const { data, isLoading } = fetchLocations(selectedLocation || []);


    if (isLoading) return <span className="loading loading-spinner"></span>;

    //locations.push(...data?.pages.flat() || []);
    locations.push(...filteredLocations);
    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Locations</h2>
            <p className="text-sm opacity-50">Explore the various locations in the Rick and Morty universe.</p>

            {locations?.length === 0 ? (
                <div className="flex flex-col items-center gap-4 mt-8">
                    <p className="text-gray-500">No locations found. Try searching for something else.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                    {locations?.map((location) => (
                        <div key={location.id} className="card bg-base-100 shadow-xl border border-base-200">
                            <div className="card-body">
                                <h3 className="card-title">{location.name}</h3>
                                <div className="text-sm text-gray-500 mb-2">Type: {location.type}</div>
                                <div className="text-sm text-gray-500 mb-2">Dimension: {location.dimension}</div>
                                <div className="badge badge-primary badge-outline">Residents: {location.residents?.length}</div>
                                <div className="card-actions justify-end mt-4">
                                    <a href={location.url} target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-accent">View Details</a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>


            )}
        </div>
    )
}