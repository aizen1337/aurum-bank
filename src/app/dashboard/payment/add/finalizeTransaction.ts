'use server'
import Transaction from "@/classes/Transaction"
import { TransactionWithUserID } from "@/components/List/List"
export default async function finalizeTransaction(transaction: TransactionWithUserID) {
   new Transaction(transaction as TransactionWithUserID)
}