import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
export const cardsDetails = createTRPCRouter({
    getCards: publicProcedure.query(({ctx}) => {
        return ctx.prisma.accounts.findMany({
            select: {
                cards: true,
            },
            where: {
                account_holder: ctx.userId,
                cards: {
                    some: {}
                }
            }
        })
    })
})