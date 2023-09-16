import Sidebar from "@/components/Sidebar/Sidebar";
import { currentUser } from "@clerk/nextjs";
export default async function DashboardLayout({
    children, 
  }: {
    children: React.ReactNode;
  }) {
    const user = await currentUser()
    return user && (
      <div>
              <main className="flex min-h-screen max-w-screen xl:items-center justify-center w-screen xl:h-full bg-gradient-to-b from-[#252525] to-[#141414]">
                  <Sidebar/>
                  <section className="xl:ml-48 xl:w-full xl:flex lg:items-center mb-20 xl:mb-0 xl:justify-center">
                  {children}
                  </section>
              </main>
      </div>
    );
  }