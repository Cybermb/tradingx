import React from 'react';
import { css } from '@linaria/core';
import loadingElement from './loading.png'

const cssLoadingWrapper = css`
    width: 100%;
    height: 100%;
    background-color: transparent;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px;
`
const cssLoadingElement = css`
    max-width: 200px;
    max-height: 200px;

    @keyframes rotating {
        from {
            transform: rotate(0deg);
        }
        to {
            transform: rotate(360deg);
        }
    }
    animation: rotating 2s linear infinite;
`

const Loading = () => {
    return <div className={cssLoadingWrapper}>
        <img className={cssLoadingElement} src={loadingElement} alt={"Loading indicator"} />
    </div>
}

export default Loading