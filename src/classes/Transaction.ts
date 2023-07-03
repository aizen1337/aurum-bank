import type { Transactions} from "@prisma/client"
import database from "@/utils/prisma"
import CurrencyConversion from "./CurrencyConversion"
export default class Transaction {
    transaction!: Transactions
    constructor(transaction: Transactions) {
        this.transaction = transaction
        this.sendTransaction()
    }
    async sendTransaction() {
        let amountAfterConvertion = await this.checkDefaultCurrencies()
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
                    increment: amountAfterConvertion
                }
             }
         })
        await database.transactions.create({
            data: this.transaction
        })
    }
    async checkDefaultCurrencies() {
        const sourceCurrency = await database.accounts.findUnique({
            select: {
                defaultCurrency: true
            },
            where: {
                account_id: this.transaction.source_account_id
            }
        })
        const targetCurrency = await database.accounts.findUnique({
            select: {
                defaultCurrency: true
            },
            where: {
                account_id: this.transaction.destination_account_id
            }
        })
        if(sourceCurrency?.defaultCurrency == targetCurrency?.defaultCurrency) {
            return this.transaction.transactionAmount
        }
        else {
            let amount = this.transaction.transactionAmount
            let base = sourceCurrency?.defaultCurrency!
            let target = targetCurrency?.defaultCurrency!
            const newAmount = await new CurrencyConversion(amount, base, target).convert()
            return Number(newAmount);
        }
    }
}