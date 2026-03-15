import { useInfiniteQuery, useMutation, useQuery } from '@tanstack/react-query'
import { getCharacters, getCharacter, getAllCharacters } from './api'


export function fetchCharacters(ids: number[]) {
    const PAGE_SIZE = 5;

    return useInfiniteQuery({
        queryKey: ['characters', ids],
        queryFn: async ({ pageParam }) => {
            const start = pageParam * PAGE_SIZE;
            const end = start + PAGE_SIZE;
            const arrSlice = ids.slice(start, end);

            return await getCharacters(arrSlice)
        },
        staleTime: 1000 * 60 * 5, // 5 minutes (Don't refetch often!)
        retry: (failureCount, error) => {
            if (error.cause === 429) return false; // Don't retry if rate limited
            return failureCount < 3;
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

export function fetchCharacter(name: string) {
    return useQuery({
        queryKey: ['character', name],
        queryFn: () => getCharacter(name),
        enabled: !!name,
        select: (data) => data.map((char: any) => char.id)
    })
}
export function useAllCharacters() {
    return useQuery({
        queryKey: ['allCharacters'],
        queryFn: () => getAllCharacters(),
        staleTime: 1000 * 60 * 60,
        select: (data) => data.results
    })
}