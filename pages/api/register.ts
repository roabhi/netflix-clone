import bcrypt from 'bcrypt'
import { NextApiRequest, NextApiResponse } from 'next'
import prismadb from '@/lib/prismadb'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    return res.status(405).end()
  }

  try {
    const { email, name, password } = req.body

    const existingUser = await prismadb.user.findUnique({
      where: {
        email: email,
      },
    })

    if (existingUser) {
      return res.status(422).json({ error: 'Email taken' })
    }

    const hashedPassword = await bcrypt.hash(password, 12)

    const user = await prismadb.user.create({
      data: {
        email: email,
        name: name,
        hashedPassword: hashedPassword,
        image: '',
        emailVerified: new Date(),
      },
    })

    return res.status(200).json(user)
  } catch (err) {
    console.log(err)
  }
}

export default handler
