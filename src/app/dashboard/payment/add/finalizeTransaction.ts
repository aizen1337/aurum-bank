'use server'
import Transaction from "@/classes/Transaction"
import { Transactions } from "@prisma/client"
export default async function finalizeTransaction(transaction: Transactions) {
   new Transaction(transaction as Transactions)
}