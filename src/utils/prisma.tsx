import {PrismaClient} from '@prisma/client'

const globalForPrisma = global as unknown as { prisma: PrismaClient }

const database =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: ['query'],
  })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = database

export default database