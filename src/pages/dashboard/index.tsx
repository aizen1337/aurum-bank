import { SignedIn, useUser } from "@clerk/nextjs";
import Sidebar from "~/components/Sidebar/Sidebar";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { type NextPage } from "next";
import Head from "next/head";
import Widget from "~/components/Widget/Widget";
const Dashboard: NextPage = () => {
  const {user} = useUser()
  ChartJS.register(ArcElement, Tooltip, Legend);
  return (
    <>
      <SignedIn>
          <Head>
            <title>Welcome {user?.fullName || 'user'}!</title>
          </Head>
          <div className="flex min-h-screen bg-gradient-to-b from-[#252525] to-[#141414]">
          <Sidebar/>
          <h1 className="text-white font-bold text-4xl fixed top-0 text-center w-full">Welcome <span className="text-[hsl(36,67%,38%)]">{user?.fullName ? user?.fullName : 'user'}</span>!</h1>
          <div className="mx-auto md:mx-48 w-full h-full flex flex-col items-center justify-center text-white p-4 md:p-6 2xl:p-10 mt-5">
              <div className="w-full grid grid-cols-2 gap-4 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
                <Widget title="Account balance">
                  <>
                  <h1 className="font-extrabold text-4xl text-[hsl(36,67%,38%)] p-5">35123 $</h1>
                  <small>1234 12312 3125 412</small>
                  </>
                </Widget>
                  <Widget title="Latest Transactions">
                    <>
                    </>
                  </Widget>
                  <Widget title="Credit card(s)">
                    <h1>You do not have any credit cards</h1>
                  </Widget>
                  <Widget title="Cashflow">
                  <Doughnut 
                    data={{
                      labels: ['Expenses','Incomes'],
                      datasets: [
                        {
                          data: ['15', 20],
                          backgroundColor: ['rgb(39 39 42)','hsl(36,67%,38%)']
                        },
                      ],
                    }}/>
                  </Widget>
              </div>
          </div>
          </div>
      </SignedIn>
    </>
  )
}
export default Dashboard
