import { type NextPage } from "next";
import Head from "next/head";
import {UserProfile, useUser, SignedIn, SignedOut, RedirectToSignIn} from '@clerk/nextjs'
const UserPage: NextPage = () => {
  const {user} = useUser()
  return (
    <>
      <SignedIn>
      <Head>
        <title>Welcome {user?.id}</title>
      </Head>
        <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#252525] to-[#141414]">
            <UserProfile/>
        </main>
      </SignedIn>
      <SignedOut>
        <RedirectToSignIn redirectUrl={"/"}/>
      </SignedOut>
    </>
  )
}
export default UserPage
