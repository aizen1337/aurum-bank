import React from 'react'
import {currentUser } from '@clerk/nextjs'
import switchCardBackground from '../utils/switch'
import database from '../utils/prisma'
import List from '@/components/List/List'
import Widget from '@/components/Widget/Widget'
import Link from 'next/link'
import AccountBadge from '@/components/AccountBadge/AccountBadge'
export const revalidate = 60
async function getTransactions() {
  const user = await currentUser()
  const transactions = await database.transactions.findMany({
      where: {
          OR: [
              {senderId: user?.id},
              {receiverId: user?.id}
          ]
      }
  })
  return transactions
}
async function getAccounts() {
  const user = await currentUser()
  const accounts = await database.accounts.findMany({
    where: {
      account_holder: user?.id
    }
  })
  return accounts
}
async function getCards() {
  const user = await currentUser()
  const accounts = await database.accounts.findMany({
    select: {
      cards: true,
  },
    where: {
      account_holder: user?.id,
      cards: {
          some: {}
      }
  }
  })
  return accounts
}
export default async function Dashboard() {
    const transactionsList = await getTransactions()
    const accounts = await getAccounts()
    const user = await currentUser()
    const cards = await getCards()
    return (
    <section className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#252525] to-[#141414]">
      <div className="h-full w-full grid grid-cols-2 gap-4 text-white p-5 ">
        <Widget title="Accounts">
          <>
          {
                 accounts?.map((account) => (
                <AccountBadge key={account.account_id} account={account}/>
                ))
          }
          </>
        </Widget>
        <Widget title="Cards">
          <>
          {
               cards?.map((account) => 
               account.cards.map((card) => (
                 <div key={card.card_number} className={`w-full shadow-inner hover:shadow-2xl hover:bg-zinc-900 cursor-pointer p-3 mt-3 rounded-lg ${switchCardBackground(card.card_type)}`}>
                   <div className="md:flex justify-between items-center w-full">
                     <p>{card.card_holder}</p>
                     <small>{card.card_type}</small>
                   </div>
                 </div>
               ))
             )
          }
          <Link href={'dashboard/payment/add'}>
              <small className="absolute bottom-0 right-0 md:m-5 m-3 hover:text-[hsl(36,67%,38%)] cursor-pointer">
                Click here to fill the form
              </small>
          </Link>
          </>
        </Widget>
        <Widget title="Latest Transactions">
          <List data={transactionsList} user={user}/>
        </Widget>
        <Widget title="Latest Transactions">
          <List data={transactionsList} user={user}/>
        </Widget>
      </div>
    </section>
  )
}
