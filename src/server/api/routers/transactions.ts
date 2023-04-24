import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
export const transactionsRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.transactions.findMany();
  }),
});