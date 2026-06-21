import type { NextAuthConfig } from "next-auth"
import Google from "next-auth/providers/google"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "@repo/db"

export const authConfig = {
  adapter: PrismaAdapter(prisma),
  providers: [Google],
} satisfies NextAuthConfig