'use server'
import Transaction from "@/classes/Transaction"
import { Accounts, Transactions } from "@prisma/client"
export default async function finalizeTransaction(transaction: Transactions) {
   new Transaction(transaction as Transactions)
}