/**
 * Noémi Feurer
 */

import React from 'react';
import "../overall-statistic-labels/OverallStatisticLabels.css"

interface Props {
    wpm: number;
    accuracy: number;
    trainingType: string;
    raw: number;
    trainingTime: number;
}

/**
 * The component which displays all the labels for a single game.
 *
 * @param wpm The value for words per minute
 * @param accuracy The value for accuracy
 * @param trainingType The value for the training type
 * @param raw The value of the raw words
 * @param trainingTime The value of the training time
 */
const SingleGameStatisticLabels = ({wpm, accuracy, trainingType, raw, trainingTime} : Props) => {
    return (
        /**
         * Div that contains all the labels
         */
        <div className="labelContainer">
            <div className="statisticLabels">
                <h3 className="greyLabel">Wpm</h3>
                <h3>{wpm}</h3>
            </div>
            <div className="statisticLabels">
                <h3 className="greyLabel">Accuracy</h3>
                <h3>{accuracy}</h3>
            </div>
            <div className="statisticLabels">
                <h3 className="greyLabel">Training Type</h3>
                <h3>{trainingType}</h3>
            </div>
            <div className="statisticLabels">
                <h3 className="greyLabel">Raw</h3>
                <h3>{raw}</h3>
            </div>
            <div className="statisticLabels">
                <h3 className="greyLabel">Training time</h3>
                <h3>{trainingTime + " s"}</h3>
            </div>
        </div>
    );
};

export default SingleGameStatisticLabels;