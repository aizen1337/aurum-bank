import type {Accounts, Transactions} from "@prisma/client"
import database from "@/utils/prisma"
export default class Transaction {
    transaction!: Transactions
    constructor(transaction: Transactions) {
        this.transaction = transaction
        this.sendTransaction()
    }
    async sendTransaction() { 
        try {       
        await database.accounts.update({
            where: {
                account_id: this.transaction.source_account_id
            },
            data: {
               balance: {
                decrement: this.transaction.transactionAmount
               }
            }
        })
        await database.accounts.update({
            where: {
                account_id: this.transaction.destination_account_id
            },
            data: {
                balance: {
                    increment: this.transaction.transactionAmount
                }
             }
         })
        await database.transactions.create({
            data: this.transaction
        })
            return "success"
        }
        catch(err) {
            console.log(err)
            return err
        }
    }
}