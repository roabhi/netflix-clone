import axios from 'axios'
import React, { useCallback, useMemo } from 'react'

import useCurrentUser from '@/hooks/useCurrentUser'
import useFavorites from '@/hooks/useFavorites'

import { AiOutlinePlus, AiOutlineCheck } from 'react-icons/ai'

interface FavoriteButtonProps {
  movieId: string
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({ movieId }) => {
  const { mutate: mutateFavorites } = useFavorites()

  const { data: currentUser, mutate } = useCurrentUser()

  const isFavorite = useMemo(() => {
    const list = currentUser?.favoriteIds || []

    return list.includes(movieId)
  }, [currentUser, movieId])

  const toggleFavorites = useCallback(async () => {
    let response

    // ? get if a movie is already favorited by user calling isFavorite avobe
    if (isFavorite) {
      response = await axios.delete('/api/favorite', { data: { movieId } })
    } else {
      // ? for POST request we can just pass movieId as an object for data and NOT as config as in DELETE
      response = await axios.post('/api/favorite', { movieId })
    }

    const updatedFavoriteIds = response?.data?.favoriteIds

    mutate({
      ...currentUser,
      favoriteIds: updatedFavoriteIds,
    })

    // ? This is for actually getting into the db and
    mutateFavorites()
  }, [movieId, isFavorite, currentUser, mutate, mutateFavorites])

  const Icon = isFavorite ? AiOutlineCheck : AiOutlinePlus

  return (
    <div
      className="
      cursor-pointer
      group/item
      w-6
      h-6
      lg:w-10
      lg:h-10
      border-2
      rounded-full
      flex
      justify-center
      items-center
      transition
      hover:border-neutral-300
      "
      onClick={toggleFavorites}
    >
      <Icon
        className="text-white group-hover/item:text-neutral-300 w-4 lg:w-6"
        size={25}
      />
    </div>
  )
}

export default FavoriteButton
