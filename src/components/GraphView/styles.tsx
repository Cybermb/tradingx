import { css } from '@linaria/core';

export const cssGraphWrapper = css`
    width: 100%;
    height: 500px;
    background-color: #30353e;
    display: flex;
    flex-flow: row;
    position: relative;
`;
export const cssGraphView = css`
    width: 100%;
    display: flex;
    position: relative;
    flex: 1;
    flex-flow: row-reverse;
    align-items: flex-end;
    overflow-x: scroll;
    overflow: visible;
`;
export const cssCandleValues = css`
    position: relative;
    heigth: 100%;
    width: 80px;
    display: flex;
    padding: 10px 0;
    flex-flow: column-reverse;
    justify-content: space-around;
    border-left: 1px #555 solid;
    overflow: hidden;
    color: #eee;
    font-size: 14px;
`;
export const cssGraphOverlay = css`
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: 10;
    cursor: crosshair;
`;
export const cssGraphCrossLineX = css`
    width: 100%;
    // height: 0;
    position: absolute;
    border-top: 1px #aaa dashed;
`;
export const cssGraphCurrentLineX = css`
    width: 100%;
    // height: 0;
    position: absolute;
    border-top: 1px #aaa dotted;
`;

export const cssGraphValueLabel = css`
    line-height: 20px;
    width: 100%;
    height: 20px;
    position: absolute;
    text-align: center;
    z-index: 9;
    background-color: #555;
    opacity: 0.95;
`

export const cssGraphHeader = css`
    display: flex;
    color: #eee;
    padding: 10px;
    font-size: 15px;
    align-items: baseline;
`

export const cssGraphTimelineWrapper = css`
    width: 100%;
    display: flex;
    flex-flow: row;
    border-top: 1px #555 solid;
    background-color: #30353e;
    color: #eee;
`

export const cssGraphTimeline = css`
    flex: 1;
`

export const cssGraphGrid = css`
    position: absolute;
    z-index: 0;
    width: 100%;
    height: 100%;
`

export const cssGraphGridLineX = css`
    width: 100%;
    position: absolute;
    border-bottom: 1px solid #fff;
    opacity: 0.05;
`

export const cssVerticalGridValues = css`
    position: absolute;
`

export const cssGraphTimelineFiller = css`
    width: 80px;
    border-left: 1px #555 solid;
    overflow: hidden;
`

export const cssSelect = css`
    margin: 0 5px;
    background-color: transparent;
    color: #eee;
    font-size: inherit;
    font-family: inherit;
    border: none;
    text-decoration: underline;
    & option {
        background-color: #333;
        border: none;
        font-family: inherit;
    }
`

