import type {CurrencyCode} from '@prisma/client'
export default class CurrencyConversion {
    constructor(private amount: number, private source: CurrencyCode, private target: CurrencyCode) {
    }
    async getCurrentRate(code: CurrencyCode) {
        const res = await fetch(`https://api.nbp.pl/api/exchangerates/rates/a/${code}?format=json`)
        const data = await res.json()
        return data.rates[0].mid
    }
    async convert() {
        let sourceCurrencyMid = await this.getCurrentRate(this.source)
        let targetCurrencyMid = await this.getCurrentRate(this.target)
        let multiplier = sourceCurrencyMid / targetCurrencyMid
        return this.amount * multiplier
    }
}