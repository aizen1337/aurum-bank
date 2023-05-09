import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
export const accountDetails = createTRPCRouter({
    getAccounts: publicProcedure.query(({ctx}) => {
        return ctx.prisma.accounts.findMany({
            where: {
                account_holder: ctx.userId
            }
        })
    })
})