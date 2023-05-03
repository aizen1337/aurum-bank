import { type NextPage } from "next";
import Head from "next/head";
import {UserProfile, useUser, SignedIn, SignedOut, RedirectToSignIn} from '@clerk/nextjs'
import Sidebar from "~/components/Sidebar/Sidebar";
const UserPage: NextPage = () => {
  const {user} = useUser()
  return (
    <>
      <SignedIn>
      <Head>
        <title>Welcome {user?.fullName || 'user'}!</title>
      </Head>
      <Sidebar/>
      <section className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#252525] to-[#141414]">
        <UserProfile/>
      </section>
      </SignedIn>
      <SignedOut>
        <RedirectToSignIn redirectUrl={"/"}/>
      </SignedOut>
    </>
  )
}
export default UserPage
