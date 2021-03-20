import React from 'react';
import { css } from '@linaria/core';
import getCoinCandles from '../functions/bitfinexApi/BitfinexApi';
import ICandle from '../types/candleData';

interface IProps {
    data?: any
}

const cssCandleWrapper = css`
    width: 100%;
    height: 500px;
    background-color: #30353e;
    display: flex;
    flex-flow: row;
`
const cssCandleView = css`
    width: 100%;
    // background-color: #30353e;
    display: flex;
    position: relative;
    flex: 1;
    flex-flow: row-reverse;
    padding: 10px;
`
const cssCandleValues = css`
    heigth: 100%;
    width: 80px;
    display: flex;
    padding: 10px 0;
    flex-flow: column-reverse;
    justify-content: space-around;
    border-left: 1px #555 solid;
`

const CandleView = ({ data }: IProps) => {
    const [candleList, updateCandleList] = React.useState<ICandle[]>([])
    const [loading, toggleLoading] = React.useState(true)
    const [candleViewData, setCandleViewData] = React.useState({
        max: 0,
        min: 0,
        margin: 10,
    })

    const updateDataTable = async () => {
        const candleList: ICandle[] = await getCoinCandles()
        let [max, min] = [0, 0]
        candleList.forEach((candle: ICandle) => {
            if (candle.high > max) max = candle.high
            if (candle.low > min) min = candle.low
        })
        updateCandleList(candleList)
        setCandleViewData({max, min, margin: max - min})
        console.log("margin:", max - min)

    }

    const generateArray = ({max, min}: {min: number, max:number}) => {
        return [...Array.from(Array(10).keys()).map((_null, index) => {
            return Number((max - min) * index/10 + min).toFixed(4)
        })]
    }

    // componentDidMount
    React.useEffect(() => { 
        updateDataTable()
    }, [])

    return <div className={cssCandleWrapper}>
        <div className={cssCandleView}>
            {candleList.map((candle, index) => {
                return <Candle key={`candle${index}`} candleData={candle} candleViewData={candleViewData} />
            })}
        </div>
        <div className={cssCandleValues}>
            {generateArray(candleViewData).map((value, index) => {
                return <div key={`value${index}`}>{value}</div>
            })}
        </div>
    </div>
}

export default CandleView

interface ICandleProps {
    candleData: ICandle
    candleViewData: {max: number, min: number, margin: number}
}

const cssCandle = css`
    display: flex;
    position: relative;
    max-width: 30px;
    flex: 1;
    margin: 0 1px;
`

const cssCandleBody = css`
    width: 100%;
    background-color: #0f0;
    position: relative;
`

const cssCandleWick = css`
    height: 100%;
    width: 1px;
    background-color: #0f0;
    position: relative;
    right: 50%;
`

const Candle = ({ candleData, candleViewData }: ICandleProps) => {
    const { high, low, open, close } = candleData
    const { max, min, margin } = candleViewData
    const candleHeight = (high - low) / margin * 100
    const candleType = open <= close ? true : false // green or red
    const candleColor = candleType ? "#0f0" : "#f00"

    const candlePos = (max - high) / margin * 100

    const candleBodyHeight = (open - close) / margin * (candleType ? -100 : 100)
    // const candleBodyPos = (candleType ? (high - close) : (close - low)) / margin * 100 // ?
    const candleBodyPos = (candleType ? (high - close) : (high - open)) / margin * 100 // ?


    return <div className={cssCandle} style={{
        height: candleHeight,
        top: candlePos,
    }}>
        <div className={cssCandleBody} style={{
            height: candleBodyHeight, 
            backgroundColor: candleColor,
            top: candleBodyPos
        }}/>
        <div className={cssCandleWick} style={{
            backgroundColor: candleColor,
        }}/>
    </div>
}