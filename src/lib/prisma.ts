import { PrismaClient } from "@prisma/client";

// Avoid creating multiple instances in development (Next.js hot reload)
declare global {
  var prisma: PrismaClient | undefined;
}

export const prisma =
  global.prisma ||
  new PrismaClient({
    log: ["query", "warn", "error"], // optional: useful for debugging
  });

if (process.env.NODE_ENV !== "production") global.prisma = prisma;
