import { type NextPage } from "next";
import {UserProfile, SignedIn } from '@clerk/nextjs'
import Sidebar from "@/components/Sidebar/Sidebar";
const UserPage: NextPage = () => {
  return (
    <>
      <SignedIn>
      <Sidebar/>
        <section className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#252525] to-[#141414]">
          <UserProfile/>
        </section>
      </SignedIn>
    </>
  )
}
export default UserPage
