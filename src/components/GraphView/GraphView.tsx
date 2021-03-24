import React from 'react';
import getCoinCandles from '../../functions/bitfinexApi/BitfinexApi';
import ICandle from '../../types/candleData';
import Loading from '../Loading';
import { Candle } from './Candle';
import * as styles from './styles';

interface IProps {
    data?: any
}

const GraphView = ({ data }: IProps) => {
    const height = 500
    const [candleList, updateCandleList] = React.useState<ICandle[]>([])
    const [loading, toggleLoading] = React.useState(true)
    const [mouseYpos, setMouseYpos] = React.useState(0)
    const [renderCross, setRenderCross] = React.useState(false)
    const [candleViewData, setCandleViewData] = React.useState({
        max: 0,
        min: 0,
        margin: 10,
    })

    

    const updateDataTable = async () => {
        const candleList: ICandle[] = await getCoinCandles(100, "XRP")
        const offset = 0.05
        const maxList = [...candleList.map((candle: ICandle) => {
            return candle.high
        })]
        const minList = [...candleList.map((candle: ICandle) => {
            return candle.low
        })]
        const min = minList.reduce((prev, next) => {
            if (prev > next) return next
            return prev
        })
        const max = maxList.reduce((prev, next) => {
            if (prev < next) return next
            return prev
        })
        const marginOffset = (max - min) * offset
        const maxWithOffset = max + marginOffset
        const minWithOffset = min - marginOffset
        updateCandleList(candleList)
        // setCandleViewData({max, min, margin: max - min})
        setCandleViewData({max: maxWithOffset, min: (minWithOffset < 0 ? 0 : minWithOffset), margin: maxWithOffset - minWithOffset})
        console.log(candleViewData)
    }

    const generateArray = (n: number) => {
        return Array.from(Array(n).keys())
    }

    const handleMouseEvent = (e:any) => {
        if (e.type === "mouseover") setRenderCross(true)
        else setRenderCross(false)
    }

    const updatePointerValue = (e:any) => {
        const mouseY = e.nativeEvent.offsetY
        setMouseYpos(mouseY)
    }

    // componentDidMount
    React.useEffect(() => { 
        updateDataTable()
    }, [])

    const calculateValueByPixels = () => {
        const { max, margin } = candleViewData
        const value = max - (mouseYpos / height) * margin
        if (value < 1) return value.toFixed(5)
        else if (value < 10) return value.toFixed(4)
        else if (value < 100) return value.toFixed(3)
        else if (value < 1000) return value.toFixed(2)
        return value.toFixed(0)
    }

    const currentValueLineProps = () => {
        const currentValue = candleList[0]?.close
        const { min, margin } = candleViewData
        const pos = (currentValue - min) / margin * 500
        const color = candleList[0]?.close > candleList[0]?.open ? "#0a0" : "#a00"
        return { 
            bottom: pos, 
            borderColor: color,
            // backgroundColor: color,
        }
    }

    const findInt = (n: number, d: number = 1): [number, number] => {
        if (n % 1 === 0) return [n, d]
        return findInt(n * 10, d * 10)
    }

    const gridLines = {
        Xamount: Math.round(height/50),
        Xinterval: findInt(candleViewData.margin),
    }

    const gridLinesValues = generateArray(gridLines.Xamount).map((_, index) => {
        const [interval, divider] = gridLines.Xinterval
        const { min } = candleViewData
        return interval/gridLines.Xamount/divider*(index+1)+min
    })

    const gridLinePositions = generateArray(gridLines.Xamount).map((_, index) => {
        const { min, margin } = candleViewData
        return (gridLinesValues[index] - min) / margin * height
    })

    const constValueProps = currentValueLineProps()

    if (candleList.length === 0) return <div className={styles.cssGraphWrapper}>
        <Loading/>
    </div>

    return (
        <>
            <div className={styles.cssGraphWrapper}>
                <div id="GraphView" className={styles.cssGraphView}>
                    <div className={styles.cssGraphOverlay} onMouseMove={updatePointerValue} onMouseOver={handleMouseEvent} onMouseOut={handleMouseEvent} />
                    <div className={styles.cssGraphGrid}>
                        {generateArray(gridLines.Xamount).map((_, index) => {
                            return <div className={styles.cssGraphGridLineX} style={{bottom: gridLinePositions[index]-1}} />
                        })}
                    </div>
                    {candleList.map((candle, index) => {
                        return <Candle key={`candle${index}`} candleData={candle} candleViewData={candleViewData} />
                    })}
                </div>
                <div className={styles.cssCandleValues}>
                    {/* {generateArray(candleViewData).map((value, index) => {
                        return <div key={`value${index}`}>{value}</div>
                    })} */}
                    {gridLinesValues.map((val, index) => {
                        return <div className={styles.cssVerticalGridValues} style={{bottom: gridLinePositions[index]-9}}>
                            {val}
                        </div>
                    })}
                    <div className={styles.cssGraphValueLabel} style={{
                        bottom: constValueProps.bottom - 10,
                        backgroundColor: constValueProps.borderColor,
                    }} >
                        {candleList[0] && candleList[0]?.close.toFixed(4)}
                    </div>
                    {renderCross && <div className={styles.cssGraphValueLabel} style={{
                        top: mouseYpos - 10,
                    }} >
                        {calculateValueByPixels()}
                    </div>}
                </div>
                {renderCross && <div className={styles.cssGraphCrossLineX} style={{top: mouseYpos}} />}
                <div className={styles.cssGraphCurrentLineX} style={{...currentValueLineProps()}} />
            </div>
            <div className={styles.cssGraphTimelineWrapper}>
                <div className={styles.cssGraphTimeline}>
                    Timeline (W.I.P)
                </div>
                <div className={styles.cssGraphTimelineFiller}>{candleViewData.margin}</div> 
            </div>
        </>
        
    )
}

export default GraphView

