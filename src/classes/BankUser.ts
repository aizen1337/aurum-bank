import { User } from "@clerk/nextjs/dist/server";
import database from "../utils/prisma";
import { Accounts } from "@prisma/client";
import { clerkClient } from "@clerk/nextjs";
import { Receiver } from "@/app/dashboard/payment/add/Form";
import { groupBy } from "@/utils/groupBy";
export default class BankUser {
    user: User 
      constructor(user: User) {
          this.user = user
          Promise.resolve(this.createAccountForTheNewUser())
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
      async getRecentReceivers() {
        const contactList: Receiver[] = []
        const receivers = await database.transactions.findMany({
          select: {
            destination_account_id: true,
            destination_account: {
              select: {
                account_holder: true
              }
            }
          },
          distinct: ['destination_account_id'],
          where: {
            source_account: {
              account_holder: this.user.id
            }
          }
        })
            for(const receiver of receivers) {
              let usersFirstName = (await clerkClient.users.getUser(receiver.destination_account.account_holder)).firstName
              let usersLastName = (await clerkClient.users.getUser(receiver.destination_account.account_holder)).lastName
                if(usersFirstName && usersLastName) {
                  let usersFullName = `${usersFirstName} ${usersLastName}`
                  contactList.push({
                  id: receiver.destination_account_id,
                  full_name: usersFullName
                  })
                }
                else {
                  contactList.push(
                    {
                    id: receiver.destination_account_id,
                    full_name: "Last receiver"
                    }
                  )
              }
            }
        return groupBy(contactList, contact => contact.full_name)
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
  async createAccountForTheNewUser() {
    const accounts = await this.getAccounts() 
    if(accounts.length == 0) {
      await database.accounts.create({
        data: {
          account_name: 'Default',
          balance: 2000,
          defaultCurrency: 'USD',
          account_holder: this.user?.id
        }
      })
    }
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