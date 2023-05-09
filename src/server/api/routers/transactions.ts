import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
export const transactionsRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.transactions.findMany();
  }),
  getUsersTransactions: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.transactions.findMany({
      where: {
        OR: [
          {
            senderId: ctx.userId
          },
          {
            receiverId: ctx.userId
          }
        ]
      }
    });
  }),
  sentTransactions: publicProcedure.query(({ctx}) => {
    return ctx.prisma.transactions.aggregate({
      where: {
        senderId: ctx.userId
      },
      _sum: {
        transactionAmount: true
      } 
    })
  }),
  receivedTransactions: publicProcedure.query(({ctx}) => {
    return ctx.prisma.transactions.aggregate({
      where: {
        receiverId: ctx.userId
      },
      _sum: {
        transactionAmount: true
      } 
    })
  })
})