import { QueryClient, useInfiniteQuery, useMutation, useQuery, keepPreviousData } from '@tanstack/react-query'
import { queryClient } from '../main'

import { getEpisode, getEpisodes, getAllEpisodes } from './api'

export function fetchEpisodes(ids: number[]) {
    const episodeData = useQuery({
        queryKey: ['episodes', ids],
        queryFn: () => getEpisodes(ids),
        staleTime: 1000 * 60 * 5, // 5 minutes (Don't refetch often!)
        retry: (failureCount, error) => {
            if (error.cause === 429) return false; // Don't retry if rate limited
            return failureCount < 3;
        },
        enabled: true,
        placeholderData: keepPreviousData
    })

    return episodeData;
}

export function useAllEpisodes() {
    const episodeData = useQuery({
        queryKey: ['allEpisodes'],
        queryFn: () => getAllEpisodes(),
        staleTime: 1000 * 60 * 60,
        
    })

    return episodeData;
}
