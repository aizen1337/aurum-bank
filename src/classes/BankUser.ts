import { User } from "@clerk/nextjs/dist/server";
import database from "../app/utils/prisma";
import { Accounts, Transactions } from "@prisma/client";
export default class BankUser {
    user: User 
    constructor(user: User) {
        this.user = user
    }
    async getTransactions()
      {
        return Promise.all([this.getSentTransfers(),this.getReceivedTransfers()])
    }
      async getSentTransfers() {
        const transactions = await database.transactions.findMany({
          where: {
            destination_account: {
              account_holder: this.user.id
            }
          }
        })
        return transactions;
      }
      async getReceivedTransfers() {
        const transactions = await database.transactions.findMany({
          where: {
            source_account: {
              account_holder: this.user.id
            }
          }
        })
        return transactions
      }
    async getAccounts(): Promise<Accounts[]> {
    const accounts = await database.accounts.findMany({
      where: {
        account_holder: this.user?.id
      }
    })
    return accounts
  }
    async getCards() {
    const cards = await database.accounts.findMany({
      select: {
        cards: true,
    },
      where: {
        account_holder: this.user?.id,
        cards: {
            some: {}
        }
    }
    })
    return cards
  }
  async getTransactionsAmount() {
    const sentTransactionsSum = await database.transactions.aggregate({
      where: {
        source_account: {
          account_holder: this?.user.id
        }
      },
      _sum: {
        transactionAmount: true
      } 
    })
    const receivedTransactionsSum = await database.transactions.aggregate({
      where: {
        destination_account: {
          account_holder: this?.user.id
        }
      },
      _sum: {
        transactionAmount: true
      } 
    })
    return [Object.values(sentTransactionsSum._sum),Object.values(receivedTransactionsSum._sum)]
  }
  async getAllData() {
    const accounts = await this.getAccounts()
    const cards = await this.getCards()
    const transactions = await this.getTransactions()
    const sentTransfers = await this.getSentTransfers()
    const receivedTransfers = await this.getReceivedTransfers()
    return {accounts, cards, transactions, sentTransfers, receivedTransfers}
  }
}