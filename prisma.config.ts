import type { PrismaConfig } from "prisma/config";

export default {
  schema: "./prisma/",
  datasource: {
    url: process.env.DATABASE_URL,
  },
} satisfies PrismaConfig;
