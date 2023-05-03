import { type NextPage } from "next";
import {SignIn, SignOutButton, SignedIn, SignedOut} from '@clerk/nextjs'
import Head  from "next/head";
const Home: NextPage = () => {
  return (
    <>      
      <Head>
        <title>Welcome to Aurum Bank!</title>
      </Head>
      <section className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#252525] to-[#141414]">
        <div className="container flex flex-col items-center justify-center gap-12 px-10">
          <h1 className="text-[2rem] md:text-5xl font-extrabold tracking-tight text-white">
           Welcome to <span className="text-[hsl(36,67%,38%)]">Aurum</span> Bank
          </h1>
          <SignedIn>
            <SignOutButton/> 
          </SignedIn>
          <SignedOut>
            <SignIn afterSignInUrl={"/dashboard"}/>
          </SignedOut>
        </div>
      </section>
    </>
  )
}
export default Home
