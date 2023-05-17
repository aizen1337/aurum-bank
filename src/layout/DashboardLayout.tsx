import type { PropsWithChildren } from "react";
import {RedirectToSignIn, SignedIn, SignedOut, useUser } from "@clerk/nextjs";
import Head from "next/head";
import Sidebar from "~/components/Sidebar/Sidebar";
export const DashboardLayout = (props: PropsWithChildren) => {
    const {user} = useUser()
    return (
        <>
        <SignedIn>
            <Head>
            <title>Welcome {user?.fullName || 'user'}!</title>
            </Head>
            <main className="flex min-h-screen max-w-screen md:items-center justify-center w-screen md:h-full bg-gradient-to-b from-[#252525] to-[#141414]">
                <Sidebar/>
                <div className="md:ml-52 md:w-full md:flex md:items-center md:justify-center">
                {props.children}
                </div>
            </main>
        </SignedIn>
        <SignedOut>
            <RedirectToSignIn afterSignInUrl={'/dashboard'}/>
        </SignedOut>
        </>
    )
}