import React from 'react'
import {currentUser } from '@clerk/nextjs'
import List from '@/components/List/List'
import Widget from '@/components/Widget/Widget'
import Link from 'next/link'
import AccountBadge from '@/components/AccountBadge/AccountBadge'
import BankUser from '../../classes/BankUser'
import CreditCard from '@/components/CreditCard/CreditCard'
import Tabs, { TabsHeaderOption } from '@/components/Tabs/Tabs'
import { Cards } from '@prisma/client'
export const metadata = {
  title: 'Welcome to Aurum Bank',
  description: 'Created by Maciej Kalata',
  charset: 'utf-8'
}
export default async function Dashboard() {
    const user = await currentUser();
    const loggedInUser = new BankUser(user!)
    const {accounts, cards, receivedTransfers, sentTransfers, latestTransactions} = await loggedInUser.getAllData()
    const summedTransactionsAmount = await loggedInUser.getTransactionsAmount()
    const tabOptions: TabsHeaderOption[] = [
      {
        title: 'Latest transfers',
        content: <List data={latestTransactions} user={user!}/>
      },
      {
        title: 'Latest incomes',
        content: <List data={receivedTransfers} user={user!} />
      },
      { 
        title: 'Latest expenses',
        content: <List data={sentTransfers} user={user!} />
      }
    ]
    return (
    <section className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#252525] to-[#141414]">
      <div className="h-full w-full grid grid-cols-2 xl:gap-5 gap-5 text-white p-5">
        <Widget title="Accounts">
                {
                 accounts?.map((account) => (
                <AccountBadge key={account.account_id} account={account}/>
                ))
                }
        </Widget>
        <Widget title="Cards">
          {
               cards?.map((account: {cards: Cards[]}) => 
               account.cards.map((card) => (
                  <CreditCard key={card.card_number} card={card}/>
               ))
             )
          }
        </Widget>
        <Widget title="Latest Transactions">
          <div className="xl:block hidden">
            <Tabs tabs={tabOptions}/>
          </div>
          <div className='xl:hidden block'>
            <List data={latestTransactions} user={user!}/>
          </div>
          <Link href={'dashboard/payment/add'}>
              <small className="absolute xl:top-5 bottom-[-22] right-0 xl:m-5 m-3 hover:text-[hsl(36,67%,38%)] cursor-pointer">
                <div className='xl:block hidden'>
                 Click here to create a transaction
                </div>
              </small>
          </Link>
        </Widget>
         <Widget title="Expenses and Incomes">
              <section className='flex items-center justify-between flex-col h-full w-full'>
                <div className="w-full h-full shadow-inner hover:shadow-2xl hover:bg-zinc-900 cursor-pointer p-3 rounded-lg">
                  <h1 className='text-red-500 text-2xl'>Expenses:</h1>
                <p className='text-lg text-red-500'>
                  {summedTransactionsAmount[0]}
                </p>
                </div>
                <div className="w-full h-full shadow-inner hover:shadow-2xl hover:bg-zinc-900 cursor-pointer p-3 rounded-lg">
                  <h1 className='text-green-500 text-2xl'>Incomes:</h1>
                <p className='text-lg text-green-500'>
                  {summedTransactionsAmount[1]} 
                </p>
                </div>
              </section>
         </Widget>
      </div>
    </section>
  )
}
