import {RedirectToSignIn, SignedIn, SignedOut } from "@clerk/nextjs";
import Sidebar from "@/components/Sidebar/Sidebar";
export default async function DashboardLayout({
    children, // will be a page or nested layout
  }: {
    children: React.ReactNode;
  }) {
    return (
      <div>
      <SignedIn>
              <main className="flex min-h-screen max-w-screen xl:items-center justify-center w-screen xl:h-full bg-gradient-to-b from-[#252525] to-[#141414]">
                  <Sidebar/>
                  <section className="xl:ml-48 xl:w-full xl:flex lg:items-center xl:justify-center">
                  {children}
                  </section>
              </main>
      </SignedIn>
      <SignedOut>
        <RedirectToSignIn afterSignInUrl={'/dashboard'} afterSignUpUrl={`/dashboard`}/>
      </SignedOut>
      </div>
    );
  }