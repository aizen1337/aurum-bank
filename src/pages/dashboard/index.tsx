import { useUser } from "@clerk/nextjs";
import { type NextPage } from "next";
import Widget from "~/components/Widget/Widget";
import Link from "next/link";
import List from "~/components/List/List";
import { api } from "~/utils/api";
import { DashboardLayout } from "~/layout/DashboardLayout";
import TransactionsChart from "./TransactionsChart";
const Dashboard: NextPage = () => {
  const {user} = useUser()
  const {data, isLoading} = api.transactionsRouter.getUsersTransactions.useQuery()
  const {data: accounts, isLoading: loadingAccounts} = api.accounts.getAccounts.useQuery()
  return (
      <DashboardLayout>
          <h1 className="text-white font-bold text-4xl fixed top-0 text-center w-full mt-5">Welcome <span className="text-[hsl(36,67%,38%)]">{user?.fullName ? user?.fullName : 'user'}</span>!</h1>
          <div className="mx-auto md:mx-48 w-full h-full flex flex-col items-center justify-center text-white p-4 md:p-6 2xl:p-10 mt-5">
              <div className="w-full mt-16 grid grid-cols-2 gap-4 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
                <Widget title="Account(s) balance">
                  <>
                  {accounts?.map((account) => (
                    <div key={account.account_id} className="w-full shadow-inner hover:shadow-2xl cursor-pointer">
                      <div className="flex justify-between items-center w-full">
                        <div>
                           <h6 className="text-xl">{account.account_name}</h6>
                           <small>{account.account_id}</small>
                        </div>
                        <h1 className="font-extrabold text-2xl text-[hsl(36,67%,38%)] break-keep">{account.balance} $</h1>                    
                      </div>
                    </div>
                  ))}
                  </>
                </Widget>
                  <Widget title="Latest Transactions">
                    <>
                    {isLoading 
                    ?
                    <p>Loading data...</p>
                      :
                    <List data={data}/>
                    }
                    </>
                  </Widget>
                  <Widget title="Credit card(s)">
                    <>
                    <h1>You do not have any credit cards</h1>
                    <Link href={'dashboard/payment/add'}>
                    <small className="absolute bottom-0 right-0 md:m-5 m-3 hover:text-[hsl(36,67%,38%)] cursor-pointer">
                      Click here to fill the form
                    </small>
                    </Link>
                    </>
                  </Widget>
                  <TransactionsChart/>
              </div>
          </div>
      </DashboardLayout>
  )
}
export default Dashboard
