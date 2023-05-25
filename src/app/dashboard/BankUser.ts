import { User } from "@clerk/nextjs/dist/server";
import database from "../utils/prisma";
import { Accounts, Transactions } from "@prisma/client";
export default class BankUser {
    user: User
    constructor(user: User) {
        this.user = user
    }
    async getTransactions(): Promise<Transactions[]> {
        const transactions = await database.transactions.findMany({
            where: {
                OR: [
                    {senderId: this.user?.id},
                    {receiverId: this.user?.id}
                ]
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
    const accounts = await database.accounts.findMany({
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
    return accounts
  }
  async getTransactionsAmount() {
    const sentTransactions = await database.transactions.aggregate({
      where: {
        senderId: this.user?.id
      },
      _sum: {
        transactionAmount: true
      } 
    })
    const receivedTransactions = await database.transactions.aggregate({
      where: {
        receiverId: this.user?.id
      },
      _sum: {
        transactionAmount: true
      } 
    })
    return [Object.values(sentTransactions._sum),Object.values(receivedTransactions._sum)]
  }
  async getAllData() {
    const accounts = await this.getAccounts()
    const cards = await this.getCards()
    const transactions = await this.getTransactions()
    return {accounts, cards, transactions}
  }
}