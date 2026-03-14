import { QueryClient, useInfiniteQuery, useMutation, useQuery , keepPreviousData} from '@tanstack/react-query'
import { queryClient } from '../main'

import { getEpisode, getEpisodes } from './api'

export function fetchEpisodes(ids: number[]) {
    const episodeData = useQuery({
        queryKey: ['episodes', ids],
        queryFn:() => getEpisodes(ids),
        staleTime: 30_000,
        enabled: true,
        placeholderData: keepPreviousData
    })

    return episodeData;
}
