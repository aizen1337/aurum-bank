import database from "./prisma"
export default async function compareAccountsDefaultCurrencies(source_account_id?: string, destination_account_id?: string) {
    const sourceCurrency = await database.accounts.findUnique({
        select: {
            defaultCurrency: true
        },
        where: {
            account_id: source_account_id
        }
    })
    const targetCurrency = await database.accounts.findUnique({
        select: {
            defaultCurrency: true
        },
        where: {
            account_id: destination_account_id
        }
    })
    let flag = sourceCurrency?.defaultCurrency == targetCurrency?.defaultCurrency
    return flag
}