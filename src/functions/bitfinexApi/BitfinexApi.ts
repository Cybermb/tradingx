import ICandle from "../../types/candleData"

const url = 'https://try.readme.io/https://api-pub.bitfinex.com/v2/'

const pathParams = 'candles/trade:1m:tXRPUSD/hist' // Change these based on relevant path params. /last for last candle

/**
 * returns a list with candle data { timestamp, open, close, high, low, volume }
 */
async function request(limit:number = 100): Promise<ICandle[]> {
    const queryParams = `limit=${limit}&sort=-1`
    try {
        const req = await fetch(`${url}/${pathParams}?${queryParams}`)
        const response = await req.json()
        const result: ICandle[] = [...response.map((candle: number[]) => {
            const [timestamp, open, close, high, low, volume] = candle
            return {timestamp, open, close, high, low, volume}
        })]
        return result
    }
    catch (err) {
        console.log(err)
    }
    return []
}

export default request


