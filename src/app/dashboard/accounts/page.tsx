import BankUser from '@/classes/BankUser'
import FloatingPanel from '@/components/BottomNavigation/FloatingPanel'
import { currentUser } from '@clerk/nextjs'
import React from 'react'
const Page = async () => {
    const user = await currentUser()
    const loggedInUser = new BankUser(user!)
    const {accounts} = await loggedInUser.getAllData()
  return (
    <main>
        <FloatingPanel/>
    </main>
  )
}

export default Page