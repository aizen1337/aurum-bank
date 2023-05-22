'use client'
import { SignedIn, useUser } from "@clerk/nextjs";
import Sidebar from "@/components/Sidebar/Sidebar";
import database from "../utils/prisma";
export default async function DashboardLayout({
    children, // will be a page or nested layout
  }: {
    children: React.ReactNode;
  }) {
    const {user} = useUser()
    const usersTransactions = await database.transactions.findMany({ 
      where: {
        OR: [
          {
            receiverId: user?.id
          },
          {
            senderId: user?.id
          }
        ]
      }
    })
    console.log(usersTransactions)
    return (
    <SignedIn>
            <main className="flex min-h-screen max-w-screen md:items-center justify-center w-screen md:h-full bg-gradient-to-b from-[#252525] to-[#141414]">
                <Sidebar/>
                <main className="md:ml-52 md:w-full md:flex md:items-center md:justify-center">
                {children}
                </main>
            </main>
    </SignedIn>
    );
  }