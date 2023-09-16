import CurrencyConversion from "@/classes/CurrencyConversion";
import { TransactionWithUserID } from "@/components/List/List";
import database from "@/utils/prisma";
export async function POST(request: Request) {
    const body: TransactionWithUserID = await request.json();
    const sourceAccountDefaultCurrency = await database.accounts.findFirst({
        select: {
            defaultCurrency: true
        },
        where: {
            account_id: body.source_account_id
        }
    })
    const destinationAccountDefaultCurrency = await database.accounts.findFirst({
        select: {
            defaultCurrency: true
        },
        where: {
            account_id: body.destination_account_id
        }
    })
    if(!destinationAccountDefaultCurrency) {
        return new Response(JSON.stringify({
            message: 'It appears such account does not exist'
        }));
    }
    const result = new CurrencyConversion(body.transactionAmount, sourceAccountDefaultCurrency?.defaultCurrency!, destinationAccountDefaultCurrency?.defaultCurrency!).compare()
    return new Response(JSON.stringify(await result))
}