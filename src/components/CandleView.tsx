import React from 'react';
import { css } from '@linaria/core';
import getCoinCandles from '../functions/bitfinexApi/BitfinexApi';
import ICandle from '../types/candleData';

interface IProps {
    data?: any
}

const cssGraphWrapper = css`
    width: 100%;
    height: 500px;
    background-color: #30353e;
    display: flex;
    flex-flow: row;
    position: relative;
`
const cssGraphView = css`
    width: 100%;
    // background-color: #30353e;
    display: flex;
    position: relative;
    flex: 1;
    flex-flow: row-reverse;
    align-items: flex-end;
    // padding: 10px;
    overflow-x: scroll;
    overflow: visible;
`
const cssCandleValues = css`
    heigth: 100%;
    width: 80px;
    display: flex;
    padding: 10px 0;
    flex-flow: column-reverse;
    justify-content: space-around;
    border-left: 1px #555 solid;
    overflow-x: hidden;
`

const cssGraphOverlay = css`
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: 10;
`

const cssGraphLine = css`
    width: 100%;
    heigth: 0;
    position: absolute;
    border-top: 1px #aaa dashed;
`

const GraphView = ({ data }: IProps) => {
    const [candleList, updateCandleList] = React.useState<ICandle[]>([])
    const [loading, toggleLoading] = React.useState(true)
    const [lineYpos, setLineYpos] = React.useState(0)
    const [renderCross, setRenderCross] = React.useState(false)
    const [candleViewData, setCandleViewData] = React.useState({
        max: 0,
        min: 0,
        margin: 10,
    })

    const updateDataTable = async () => {
        const candleList: ICandle[] = await getCoinCandles(100, "XRP")
        let [max, min] = [0, 9999999999]
        candleList.forEach((candle: ICandle) => {
            if (candle.high > max) max = candle.high
            if (candle.low < min) min = candle.low
        })
        updateCandleList(candleList)
        setCandleViewData({max, min, margin: max - min})
        console.log("max", max, "min", min)
        console.log("margin:", max - min)
    }

    const generateArray = ({max, min}: {min: number, max:number}) => {
        return [...Array.from(Array(10).keys()).map((_null, index) => {
            return Number((max - min) * index/10 + min).toFixed(4)
        })]
    }

    const handleMouseEvent = (e:any) => {
        console.log(e)
        if (e.type === "mouseover") setRenderCross(true)
        else setRenderCross(false)
    }

    const updatePointerValue = (e:any) => {
        // console.log(e)
        // if (e.target.id !== "CandleView") return
        const mouseY = e.nativeEvent.offsetY
        setLineYpos(mouseY)
    }

    // componentDidMount
    React.useEffect(() => { 
        updateDataTable()
    }, [])

    const calculateValueByPixels = () => {
        const { max, margin } = candleViewData
        const value = max - (lineYpos / 500) * margin
        if (value < 1) return value.toFixed(5)
        else if (value < 10) return value.toFixed(4)
        else if (value < 100) return value.toFixed(3)
        else if (value < 1000) return value.toFixed(2)
        return value.toFixed(0)
    }

    return (
        <>
            <div className={cssGraphWrapper}>
                <div className={cssGraphOverlay} onMouseMove={updatePointerValue} onMouseOver={handleMouseEvent} onMouseOut={handleMouseEvent} />
                <div id="GraphView" className={cssGraphView}>
                    {candleList.map((candle, index) => {
                        return <Candle key={`candle${index}`} candleData={candle} candleViewData={candleViewData} />
                    })}
                </div>
                <div className={cssCandleValues}>
                    {generateArray(candleViewData).map((value, index) => {
                        return <div key={`value${index}`}>{value}</div>
                    })}
                </div>
                {renderCross && <div className={cssGraphLine} style={{top: lineYpos}} />}
            </div>
            <div style={{textAlign: "right"}}>{calculateValueByPixels()}</div>
        </>
        
    )
}

export default GraphView

interface ICandleProps {
    candleData: ICandle
    candleViewData: {max: number, min: number, margin: number}
}

const cssCandle = css`
    display: flex;
    position: relative;
    max-width: 30px;
    min-width: 1xp;
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
    const { open, close, high, low } = candleData
    const { max, min } = candleViewData
    const heigth = 500
    const margin = (max - min)
    const pixelValue = margin / 500

    const candleType = open <= close ? true : false // green or red
    const candleColor = candleType ? "#0c0" : "#c00"

    const candlePos = (low - min) / margin * heigth
    const candleHeight = (high - low) / margin * heigth

    const candleBodyHeight = (open - close) / margin * (candleType ? -heigth : heigth)
    const candleBodyPos = (candleType ? (high - close) : (high - open)) / margin * heigth


    return <div className={cssCandle} style={{
        height: candleHeight,
        bottom: candlePos,
    }}>
        <div className={cssCandleBody} style={{
            height: candleBodyHeight, 
            backgroundColor: candleColor,
            top: candleBodyPos,
        }}/>
        <div className={cssCandleWick} style={{
            backgroundColor: candleColor,
        }}/>
    </div>
}