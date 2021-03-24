import React from 'react';
import { css } from '@linaria/core';
import ICandle from '../../types/candleData';

interface ICandleProps {
    candleData: ICandle;
    candleViewData: { max: number; min: number; margin: number; };
}
const cssCandle = css`
    display: flex;
    position: relative;
    max-width: 30px;
    min-width: 1xp;
    flex: 1;
    margin: 0 1px;
`;
const cssCandleBody = css`
    min-height: 1px;
    width: 100%;
    background-color: #0f0;
    position: relative;
`;
const cssCandleWick = css`
    height: 100%;
    width: 1px;
    background-color: #0f0;
    position: relative;
    right: 50%;
`;
export const Candle = ({ candleData, candleViewData }: ICandleProps) => {
    const { open, close, high, low } = candleData;
    const { max, min } = candleViewData;
    const height = 500;
    const margin = (max - min);
    const pixelValue = margin / 500;

    const candleType = open <= close ? true : false; // green or red
    const candleColor = candleType ? "#0c0" : "#c00";

    const candlePos = (low - min) / margin * height;
    const candleHeight = (high - low) / margin * height;

    const candleBodyHeight = (open - close) / margin * height * (candleType ? -1 : 1);
    const candleBodyPos = (candleType ? (high - close) : (high - open)) / margin * height;


    return <div className={cssCandle} style={{
        height: candleHeight,
        bottom: candlePos,
    }}>
        <div className={cssCandleBody} style={{
            height: candleBodyHeight,
            backgroundColor: candleColor,
            top: candleBodyPos,
        }} />
        <div className={cssCandleWick} style={{
            backgroundColor: candleColor,
        }} />
    </div>;
};
