import { PrismaClient } from '@prisma/client'

// ? Declare typescipt global

declare global {
  namespace NodeJS {
    interface Global {}
  }
}

// ? add prisma to the NodeJS global type
interface CustomNodeJsGlobal extends NodeJS.Global {
  prisma: PrismaClient
}

// ? asign global to const
declare const global: CustomNodeJsGlobal

// ? Instantiate actual client
const client = global.prisma || new PrismaClient()

// ? If we are not in production reuse same client
if (process.env.NODE_ENV !== 'production') global.prisma = client

export default client
