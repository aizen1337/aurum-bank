import React from 'react'
import {currentUser } from '@clerk/nextjs'
import List from '@/components/List/List'
import Widget from '@/components/Widget/Widget'
import Link from 'next/link'
import AccountBadge from '@/components/AccountBadge/AccountBadge'
import BankUser from '../../classes/BankUser'
import TransactionChart from '@/components/TransactionChart/TransactionChart'
import CreditCard from '@/components/CreditCard/CreditCard'
import Tabs, { TabsHeaderOption } from '@/components/Tabs/Tabs'
import { Cards } from '@prisma/client'
export const metadata = {
  title: 'Welcome to Aurum Bank',
  description: 'Created by Maciej Kalata',
}
export default async function Dashboard() {
    const user = await currentUser()
    const loggedInUser = new BankUser(user!)
    const {accounts, cards, receivedTransfers, sentTransfers} = await loggedInUser.getAllData()
    const chartData = await loggedInUser.getTransactionsAmount()
    const tabOptions: TabsHeaderOption[] = [
      {
        title: 'Latest incomes',
        content: <List data={sentTransfers} type='sent'/>
      },
      { 
        title: 'Latest expenses',
        content: <List data={receivedTransfers} type='received'/>
      }
    ]
    return (
    <section className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#252525] to-[#141414]">
      <div className="h-full w-full grid grid-cols-2 gap-4 text-white p-5 ">
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
          <Tabs tabs={tabOptions}/>
          <Link href={'dashboard/payment/add'}>
              <small className="absolute md:top-5 bottom-[-22] right-0 md:m-5 m-3 hover:text-[hsl(36,67%,38%)] cursor-pointer">
                <div className='md:hidden block'>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" />
                  </svg>
                  Add Transaction
                </div>
                <div className='block xs:hidden'>
                 Click here to create a transaction
                </div>
              </small>
          </Link>
        </Widget>
         <Widget title="Expenses and Incomes">
          {chartData ?
          <TransactionChart transactions={chartData}/>
          :
          <p>No transactions yet</p>
          }
         </Widget>
      </div>
    </section>
  )
}
