import BankUser from '@/classes/BankUser'
import React from 'react'
import { currentUser } from '@clerk/nextjs'
import Form from './Form'
const Payment = async () => {
  const user = await currentUser()
  const loggedInUser = new BankUser(user!)
  const accounts = await loggedInUser.getAccounts()
  const receivers = await loggedInUser.getRecentReceivers()
  return (
      <main className='lg:w-6/12 w-screen h-screen flex flex-col justify-evenly'>
          <Form accounts={accounts} recentReceivers={receivers}/>
      </main>
  )
}

export default Payment