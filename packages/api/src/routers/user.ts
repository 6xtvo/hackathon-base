import { router, protectedProcedure } from "../trpc"

export const userRouter = router({
  me: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.user.findUnique({
      where: { email: ctx.session.user.email! }
    })
  })
})