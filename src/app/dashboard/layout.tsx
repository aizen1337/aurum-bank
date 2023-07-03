import {RedirectToSignIn, SignedIn, SignedOut } from "@clerk/nextjs";
import Sidebar from "@/components/Sidebar/Sidebar";
export default async function DashboardLayout({
    children, // will be a page or nested layout
  }: {
    children: React.ReactNode;
  }) {
    return (
      <>
      <SignedIn>
              <main className="flex min-h-screen max-w-screen lg:items-center justify-center w-screen lg:h-full bg-gradient-to-b from-[#252525] to-[#141414]">
                  <Sidebar/>
                  <section className="lg:ml-52 lg:w-full lg:flex lg:items-center lg:justify-center">
                  {children}
                  </section>
              </main>
      </SignedIn>
      <SignedOut>
        <RedirectToSignIn afterSignInUrl={'/dashboard'} afterSignUpUrl={`/dashboard`}/>
      </SignedOut>
      </>
    );
  }