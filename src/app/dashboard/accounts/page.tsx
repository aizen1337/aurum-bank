import BankUser from '@/classes/BankUser'
import Charts from '@/components/Charts/Charts'
import { currentUser } from '@clerk/nextjs'
import React from 'react'
const Page = async () => {
    const user = await currentUser()
    const loggedInUser = new BankUser(user!)
    const transactions = await loggedInUser.recentTransactionsAmountsGroupedByMonth()
  return (
    <main className='w-9/12 h-screen flex flex-col items-center justify-center'>
        <Charts expenses={transactions.expenses} incomes={transactions.incomes}/>
    </main>
  )
}

export default Page