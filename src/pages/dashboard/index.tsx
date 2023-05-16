import { type NextPage } from "next";
import Widget from "~/components/Widget/Widget";
import Link from "next/link";
import List from "~/components/List/List";
import { api } from "~/utils/api";
import { DashboardLayout } from "~/layout/DashboardLayout";
import TransactionsChart from "./TransactionsChart";
import { type CARD_TYPE } from "@prisma/client";
const Dashboard: NextPage = () => {
  const {data, isLoading} = api.transactionsRouter.getUsersTransactions.useQuery()
  const {data: accounts, isLoading: accountsLoading} = api.accounts.getAccounts.useQuery()
  const {data: cards, isLoading: cardsLoading} = api.cards.getCards.useQuery()
  console.log(cards)
  function switchCardBackground(parameter: CARD_TYPE) {
    switch(parameter) {
      case 'PLATINUM': 
        return 'bg-gradient-to-r from-stone-200 via-neutral-300 to-neutral-400 text-black';
      case 'GOLD':
        return 'bg-gradient-to-r from-amber-200 via-amber-500 to-yellow-600 text-white';
      case 'EXECUTIVE':
        return 'bg-gradient-to-r from-sky-200 via-indigo-500 to-blue-700 text-white';
      default:
      return ''
    }
  }
  return (
      <DashboardLayout>
              <div className="h-full w-full grid grid-cols-2 gap-4 text-white p-5 ">
                <Widget title="Account(s) balance">
                  <>
                  {accountsLoading ? 
                  <p>Loading accounts...</p>
                  :
                  accounts?.map((account) => (
                    <div key={account.account_id} className="w-full shadow-inner hover:shadow-2xl hover:bg-zinc-900 cursor-pointer p-3 rounded-lg">
                      <div>
                        <div>
                           <h6 className="text-xl">{account.account_name}</h6>
                        </div>
                        <h1 className="font-extrabold text-2xl text-[hsl(36,67%,38%)] break-keep">{account.balance} {account.defaultCurrency}</h1>                    
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
                    {
                      cardsLoading 
                      ?
                      <p>Loading cards...</p>
                      :
                      cards?.map((account) => 
                        account.cards.map((card) => (
                          <div key={card.card_number} className={`w-full shadow-inner hover:shadow-2xl hover:bg-zinc-900 cursor-pointer p-3 mt-3 rounded-lg ${switchCardBackground(card.card_type)}`}>
                            <div className="md:flex justify-between items-center w-full">
                              <p>{card.card_holder}</p>
                              <small>{card.card_type}</small>
                            </div>
                          </div>
                        ))
                      )
                    }
                    <Link href={'dashboard/payment/add'}>
                    <small className="absolute bottom-0 right-0 md:m-5 m-3 hover:text-[hsl(36,67%,38%)] cursor-pointer">
                      Click here to fill the form
                    </small>
                    </Link>
                    </>
                  </Widget>
                  <TransactionsChart/>
              </div>
      </DashboardLayout>
  )
}
export default Dashboard
