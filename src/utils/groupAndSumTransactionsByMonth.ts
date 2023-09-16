import { Transactions } from "@prisma/client";
export default function groupAndSumTransactionsByMonth(transactions: Transactions[]): Map<string, number> {
    const groupedSummaries = transactions.reduce((map, transaction) => {
        const transactionMonthYear = transaction.createdAt.toLocaleString('en-US', {
            year: 'numeric',
            month: 'long',
        });

        if (!map.has(transactionMonthYear)) {
            map.set(transactionMonthYear, 0);
        }

        map.set(transactionMonthYear, map.get(transactionMonthYear)! + transaction.transactionAmount);

        return map;
    }, new Map<string, number>());
    return groupedSummaries;
}