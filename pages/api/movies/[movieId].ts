import { NextApiRequest, NextApiResponse } from 'next'
import prismadb from '@/lib/prismadb'
import serverAuth from '@/lib/serverAuth'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'GET') {
    return res.status(405).end()
  }

  try {
    await serverAuth(req)

    /**
     * ? In next as we define routes / files with [] in this case [movieId]
     * ? that is something we can get inside the req as exactly that name
     * ? so we can destructure ists content from the query like this
     */
    const { movieId } = req.query

    if (typeof movieId !== 'string') {
      // ? If we do not get a string as movieId meaning is a number or whatever
      throw new Error('Invalid ID')
    }

    if (!movieId) {
      // ? Same if it is undefined. Not sure what it needs to be in a separate if statement
      throw new Error('Invalid ID')
    }

    // ? Try find the movie in db
    const movie = await prismadb.movie.findUnique({
      where: {
        id: movieId,
      },
    })

    if (!movieId) {
      //? If there are no matches in db.
      throw new Error('Invalid ID')
    }
    // ? If success
    return res.status(200).json(movie)
  } catch (err) {
    console.log(err)
    return res.status(400).end()
  }
}

export default handler
