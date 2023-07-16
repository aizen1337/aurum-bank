import BankUser from '@/classes/BankUser'
import FloatingPanel from '@/components/BottomNavigation/FloatingPanel'
import TransactionsHistoryChart from '@/components/TransactionHistoryChart/TransactionsHistoryChart'
import { currentUser } from '@clerk/nextjs'
import React from 'react'
const Page = async () => {
    const user = await currentUser()
    const loggedInUser = new BankUser(user!)
    const transactions = await loggedInUser.recentTransactionsAmounts()
    console.log(transactions) 
  return (
    <main className='w-9/12 h-screen flex flex-col justify-center'>
        <TransactionsHistoryChart incomes={transactions.incomes} expenses={transactions.expenses}/>
        <FloatingPanel/>
    </main>
  )
}

export default Page