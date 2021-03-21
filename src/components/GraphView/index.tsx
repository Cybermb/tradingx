import React from 'react';
import GraphView from './GraphView'
import { css } from '@linaria/core';
import * as styles from './styles';


const Graph = () => {
    return (
        <div>
            <div className={styles.cssGraphHeader}>
                <p>Graph:</p>
                <select className={styles.cssSelect}>
                    <option>Ripple (XRP/USD)</option>
                    <option>Bitcoin (BTX/USD)</option>
                </select>
                <p>with</p>
                <select className={styles.cssSelect}>
                    <option>1 minute</option>
                    <option>5 minutes</option>
                </select>
                <p>interval (W.I.P)</p>
            </div>
            <GraphView/>
        </div>
    )
    
}

export default Graph