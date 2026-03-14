import { QueryClient, useInfiniteQuery, useMutation, useQuery } from '@tanstack/react-query'
import { queryClient } from '../App'
export const todosData = useQuery({
  queryKey: ['todos'],
  queryFn: fecthTodos,
  staleTime: 30_000,
  enabled: true
})

function fecthTodos() {
  return fetch('https://api.github.com/repos/TanStack/query').then((res) =>
    res.json(),
  )
}

export function addTodo() {
  const mutation = useMutation({
    mutationFn: (newTodo: { title: string }) => fetch('https://api.github.com/repos/TanStack/query',
      {
        method: 'POST',
        body: JSON.stringify(newTodo),
        headers: { 'Content-Type': 'application/json' }
      }
    ).then(res => res.json()),

    onError: (error) => {
      console.error(error.message)
    },

    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['todos'] })
      return data
    },

    onSettled: () => {
      //executes after on error and on success

      // Usually used to refresh the data or close a modal

    }
  })
}

function fecthTodosList() {

}


function toDoList() {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ['todos'],
    queryFn: ({ pageParam = 1 }) => fecthTodosList,
    initialPageParam: 1,

    getNextPageParam: (lastPage) => {
      lastPage.getNextCursor()
    },
  })

  return {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage
  }

}