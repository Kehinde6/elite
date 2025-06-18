import { PrismaClient } from '@prisma/client';

// PrismaClient is attached to the `global` object in development to prevent
// exhausting your database connection limit.
const globalWithPrisma = global as { prisma?: PrismaClient };

// Prevent multiple instances of Prisma Client in development
export const prisma = globalWithPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production') {
  globalWithPrisma.prisma = prisma;
}

export default prisma; 