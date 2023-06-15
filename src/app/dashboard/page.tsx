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
export const revalidate = 60
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
                  <CreditCard key={card.card_number} card={card}/>
               ))
             )
          }
          </>
        </Widget>
        <Widget title="Latest Transactions">
          <>
          <Tabs tabs={tabOptions}/>
          <Link href={'dashboard/payment/add'}>
              <small className="absolute bottom-0 right-0 md:m-5 m-3 hover:text-[hsl(36,67%,38%)] cursor-pointer">
                Click here to create a transaction
              </small>
          </Link>
          </>
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
