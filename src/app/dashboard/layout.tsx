import {SignedIn } from "@clerk/nextjs";
import Sidebar from "@/components/Sidebar/Sidebar";
export default async function DashboardLayout({
    children, // will be a page or nested layout
  }: {
    children: React.ReactNode;
  }) {
    return (
      <SignedIn>
              <main className="flex min-h-screen max-w-screen md:items-center justify-center w-screen md:h-full bg-gradient-to-b from-[#252525] to-[#141414]">
                  <Sidebar/>
                  <section className="md:ml-52 md:w-full md:flex md:items-center md:justify-center">
                  {children}
                  </section>
              </main>
      </SignedIn>
    );
  }