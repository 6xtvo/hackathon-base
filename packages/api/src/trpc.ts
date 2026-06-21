import { initTRPC, TRPCError } from "@trpc/server"
import type { Session } from "next-auth"
import { prisma } from "@repo/db"

interface Context {
  session: Session | null
  prisma: typeof prisma
}

interface AuthenticatedContext {
  session: Session & { user: NonNullable<Session["user"]> }
  prisma: typeof prisma
}

const t = initTRPC.context<Context>().create()

export const router = t.router
export const publicProcedure = t.procedure
export const protectedProcedure = t.procedure.use(({ ctx, next }) => {
  if (!ctx.session?.user) throw new TRPCError({ code: "UNAUTHORIZED" })
  return next<AuthenticatedContext>({
    ctx: {
      prisma: ctx.prisma,
      session: ctx.session as Session & { user: NonNullable<Session["user"]> },
    },
  })
})