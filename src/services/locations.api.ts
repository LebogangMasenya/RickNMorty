import { useInfiniteQuery, useQuery } from '@tanstack/react-query'
import { getLocations } from './api'

export function fetchLocations(ids: number[]) {
    const PAGE_SIZE = 5;

    return useInfiniteQuery({
        queryKey: ['locations', ids],
        queryFn: async ({ pageParam }) => {
            const start = pageParam * PAGE_SIZE;
            const end = start + PAGE_SIZE;
            const arrSlice = ids.slice(start, end);

            return await getLocations(arrSlice)
        },
        initialPageParam: 0,
        getNextPageParam: (lastPage, allPages, lastPageParam) => {
            const totalLoadedSoFar = (lastPageParam + 1) * PAGE_SIZE;

            if (!lastPage || lastPage.length === 0 || totalLoadedSoFar >= ids.length) {
                return undefined;
            }
            return lastPageParam + 1;
        },
        getPreviousPageParam: (firstPage, allPages, firstPageParam) => {
            if (firstPageParam <= 1) {
                return undefined
            }
            return firstPageParam - 1
        },
    })
}

export function fetchLocation(id: string) {
    return useQuery({
        queryKey: ['location', id],
        queryFn: () => getLocations([parseInt(id)]),
        enabled: !!id,
        select: (data) => data[0]
    })
}  

