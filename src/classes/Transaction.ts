import type {Accounts, Transactions} from "@prisma/client"
import database from "@/app/utils/prisma"
export default class Transaction {
    transaction!: Transactions
    constructor(transaction: Transactions) {
        this.transaction = transaction
    }
    async sendTransaction(accountOrigin: Accounts) {        
        await database.accounts.update({
            where: {
                account_id: accountOrigin.account_id
            },
            data: {
               balance: {
                decrement: this.transaction.transactionAmount
               }
            }
        })
        await database.transactions.create({
            data: this.transaction
        })
    }
}