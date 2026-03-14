import {useQuery} from '@tanstack/react-query'

interface User {
  name: string
}

export function fetchUsers(isValidUser: boolean = false, query : () => void) {
  const usersData = useQuery({
    queryKey: ['users'],
    queryFn: () =>
      fetch('https://api.github.com/repos/TanStack/query').then((res) =>
        res.json(),
      ),
    staleTime: 30_000,
    enabled: isValidUser,
    select: (data: User[]) => query
  })

  if(usersData.isPending) return 'Loading'

  if(usersData.error) return `Error on ${usersData.error.message}`

  return usersData.data;
}
