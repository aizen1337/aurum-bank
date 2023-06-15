'use server'
import Transaction from "@/classes/Transaction"
import { Accounts, Transactions } from "@prisma/client"
export default async function finalizeTransaction(transaction: Transactions, source_account: Accounts) {
    const transfer = new Transaction(transaction as Transactions, source_account)
    console.log(transfer)
}