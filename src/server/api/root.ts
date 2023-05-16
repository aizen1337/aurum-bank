import { createTRPCRouter } from "~/server/api/trpc";
import { transactionsRouter } from "./routers/transactions";
import { accountDetails } from "./routers/accountDetails";
import { cardsDetails } from "./routers/cards";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  transactionsRouter: transactionsRouter,
  accounts: accountDetails,
  cards: cardsDetails
});

// export type definition of API
export type AppRouter = typeof appRouter;
