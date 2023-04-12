import React from 'react'
import { isEmpty } from 'lodash' // ? Js package to easlity work with arrays, objects, strings and more
import MovieCard from './MovieCard'

interface MovieListProps {
  data: Record<string, any>[]
  title: string
}

const MovieList: React.FC<MovieListProps> = ({ data, title }) => {
  if (isEmpty(data)) {
    return null
  }

  return (
    <div className="mt-[15%] px-4 md:px-12 md:mt-4 space-y-8">
      <div>
        <p className="text-white text-md md:text-xl lg:text-2xl font-semibold mb-4">
          {title}
        </p>
        <div className="flex flex-col mb-4 md:grid grid-cols-2 gap-2 xl:grid-cols-4">
          {data.map((movie) => (
            <MovieCard key={movie.id} data={movie} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default MovieList
