import { PrismaClient } from '@prisma/client'

const globalWithDb = global as { db?: PrismaClient }

const db = globalWithDb.db || new PrismaClient()

if (process.env.NODE_ENV !== 'production') {
  globalWithDb.db = db
}

export default db