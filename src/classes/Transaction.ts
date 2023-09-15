import type { TransactionWithUserID } from "@/components/List/List"
import { RateLimit } from "@/lib/Ratelimit"
import database from "@/utils/prisma"
import CurrencyConversion from "./CurrencyConversion"
export default class Transaction {
    transaction!: TransactionWithUserID
    success = true
    constructor(transaction: TransactionWithUserID) {
        this.transaction = transaction
        this.sendTransaction()
       
    }
    async sendTransaction() {
        await this.isLimited()
        if(!this.success /*if user is rate limited*/) {
            throw Error('Too many requests');
        }
        let amountAfterConvertion = await this.beginConversion()
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
            data: {
                transactionTitle: this.transaction.transactionTitle,
                currency: this.transaction.currency,
                source_account_id: this.transaction.source_account_id,
                destination_account_id: this.transaction.destination_account_id,
                transactionAmount: this.transaction.transactionAmount,
            }
        })
    }
    async beginConversion() {
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
    async isLimited() {
        const {success} = await RateLimit.limit(this.transaction.source_account.account_holder)
        this.success = success
    }
}