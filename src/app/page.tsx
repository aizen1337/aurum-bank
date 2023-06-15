import React from 'react'
import { currentUser } from '@clerk/nextjs'
import { redirect } from 'next/navigation'
type Props = {}

const page = async (props: Props) => {
   const user = await currentUser()
   if(user) {
    redirect('/dashboard')
   }
   redirect('/sign-in');
}

export default page