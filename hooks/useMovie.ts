import useSwr from 'swr'
import fetcher from '@/lib/fetcher'

const useMovie = (id: string) => {
  /**
   * ? Id there is an id to fetch then go to the endpoint and retrieve id
   * ? otherwise do nothing
   */

  const { data, error, isLoading } = useSwr(
    id ? `/api/movies/${id}` : null,
    fetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  )

  return {
    data,
    error,
    isLoading,
  }
}

export default useMovie
