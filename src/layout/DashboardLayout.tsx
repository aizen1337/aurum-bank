import type { PropsWithChildren } from "react";
import { SignedIn, useUser } from "@clerk/nextjs";
import Head from "next/head";
import Sidebar from "~/components/Sidebar/Sidebar";
export const DashboardLayout = (props: PropsWithChildren) => {
    const {user} = useUser()
    return (
        <SignedIn>
            <Head>
            <title>Welcome {user?.fullName || 'user'}!</title>
            </Head>
            <main className="flex min-h-screen max-w-screen md:items-center justify-center w-screen md:h-full bg-gradient-to-b from-[#252525] to-[#141414]">
                <Sidebar/>
                <div className="md:ml-24">
                {props.children}
                </div>
            </main>
        </SignedIn>
    )
}