import { useState, useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import postApi from 'src/apis/post.api'
import { PostType } from 'src/types/post.type'

const usePost = (pageNumber: number = 1, pageSize: number = 5) => {
  const [results, setResults] = useState<PostType[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)
  const [error, setError] = useState({})
  const [hasNextPage, setHasNextPage] = useState(false)

  useEffect(() => {
    setIsLoading(true)
    setIsError(false)
    setError({})

    const controller = new AbortController()
    const { signal } = controller
    useQuery({
      queryKey: ['get-all-post'],
      queryFn: () => postApi.getPost(pageNumber, pageSize, signal),
      onSuccess: (data) => {
        setResults((prev) => [...prev, ...data.data.content])
        setHasNextPage(Boolean(data.data.content.length))
        setIsLoading(false)
      },
      onError: (err) => {
        setIsLoading(false)
        if (signal.aborted) return
        setIsError(true)
        setError({ message: err })
      }
    })

    return () => controller.abort()
  }, [pageNumber])

  return { isLoading, isError, error, results, hasNextPage }
}

export default usePost
