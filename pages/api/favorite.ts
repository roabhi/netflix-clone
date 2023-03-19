import { NextApiRequest, NextApiResponse } from 'next'

import { without } from 'lodash'

import prismadb from '@/lib/prismadb'
import serverAuth from '@/lib/serverAuth'

/**
 * ? Route to create / delete ONE favorite
 */

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method === 'POST') {
      const { currentUser } = await serverAuth(req)

      const { movieId } = req.body

      const existingMovie = await prismadb.movie.findUnique({
        where: {
          id: movieId,
        },
      })

      if (!existingMovie) {
        throw new Error('Invalid Id')
      }

      //? Favorite Ids is defined in the prisma schema for the User model

      const user = await prismadb.user.update({
        where: {
          email: currentUser.email || '',
        },
        data: {
          favoriteIds: {
            push: movieId,
          },
        },
      })

      return res.status(200).json(user)
    }

    if (req.method === 'DELETE') {
      const { currentUser } = await serverAuth(req)

      const { movieId } = req.body

      const existingMovie = await prismadb.movie.findUnique({
        where: {
          id: movieId,
        },
      })

      if (!existingMovie) {
        throw new Error('Invalid Id')
      }

      const updatedFavoriteIds = without(currentUser.favoriteIds, movieId)

      const updatedUser = await prismadb.user.update({
        where: {
          email: currentUser.email || '',
        },
        data: {
          favoriteIds: updatedFavoriteIds,
        },
      })

      return res.status(200).json(updatedUser)
    }

    //? If nothig of the above matches -> No POST or DELETE methods

    return res.status(405).end()
  } catch (err) {
    console.log(err)
    return res.status(500).end()
  }
}

export default handler
