import { currentUser } from '@clerk/nextjs'
import { redirect } from 'next/navigation'
const page = async () => {
   const user = await currentUser()
   user ? redirect('/dashboard') : redirect('/sign-in');
}

export default page