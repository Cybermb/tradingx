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
        const offset = 0.0005
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
        const maxWithOffset = max * offset + max
        const minWithOffset = min - (min * offset < 0 ? 0 : min * offset) 
        updateCandleList(candleList)
        setCandleViewData({max, min, margin: max - min})
        // setCandleViewData({max: maxWithOffset, min: minWithOffset, margin: max - min})
        // console.log("max", maxWithOffset, "min", minWithOffset)
        console.log(candleViewData)
    }

    const generateArray = ({max, min}: {min: number, max:number}) => {
        return [...Array.from(Array(10).keys()).map((_null, index) => {
            return Number((max - min) * index/10 + min).toFixed(4)
        })]
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
        const value = max - (mouseYpos / 500) * margin
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

    const constValueProps = currentValueLineProps()

    if (candleList.length === 0) return <div className={styles.cssGraphWrapper}>
        <Loading/>
    </div>

    return (
        <>
            <div className={styles.cssGraphWrapper}>
                <div className={styles.cssGraphOverlay} onMouseMove={updatePointerValue} onMouseOver={handleMouseEvent} onMouseOut={handleMouseEvent} />
                <div id="GraphView" className={styles.cssGraphView}>
                    {candleList.map((candle, index) => {
                        return <Candle key={`candle${index}`} candleData={candle} candleViewData={candleViewData} />
                    })}
                </div>
                <div className={styles.cssCandleValues}>
                    {generateArray(candleViewData).map((value, index) => {
                        return <div key={`value${index}`}>{value}</div>
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
                <div className={styles.cssGraphTimelineFiller} />
            </div>
        </>
        
    )
}

export default GraphView

