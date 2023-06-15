import type {Accounts, Transactions} from "@prisma/client"
import database from "@/utils/prisma"
export default class Transaction {
    transaction!: Transactions
    constructor(transaction: Transactions, source_account: Accounts) {
        this.transaction = transaction
        this.sendTransaction(source_account)
    }
    async sendTransaction(source_account: Accounts) {        
        await database.accounts.update({
            where: {
                account_id: source_account.account_id
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