'use server'
import Transaction from "@/classes/Transaction"
import { Accounts, Transactions } from "@prisma/client"
export default async function finalizeTransaction(transaction: Transactions, originAccount: Accounts) {
    const transfer = new Transaction(transaction as Transactions)
    transfer.sendTransaction(originAccount)
    console.log(transfer)
}