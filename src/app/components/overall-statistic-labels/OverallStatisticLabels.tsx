/**
 * Noémi Feurer
 */

import React from 'react';
import "./OverallStatisticLabels.css"

interface Props {
    overallTrainings: number;
    completedTrainings: number;
    typingTime: string;
}

/**
 * The component which displays all the labels on the overall statistic page.
 *
 * @param overallTrainings The value for the number of overall trainings
 * @param completedTrainings THe value for the number of completed trainings
 * @param typingTime The value for the typing time
 */
const OverallStatisticLabels = ({overallTrainings, completedTrainings, typingTime} : Props) => {

    /**
     * @returns The labels for the overall trainings
     */
    return (
        <div className="labelContainer">
            <div className="statisticLabels">
                <h3 className="greyLabel">Overall trainings</h3>
                <h3>{overallTrainings}</h3>
            </div>
            <div className="statisticLabels">
                <h3 className="greyLabel">Completed trainings</h3>
                <h3>{completedTrainings}</h3>
            </div>
            <div className="statisticLabels">
                <h3 className="greyLabel">Typing time</h3>
                <h3>{typingTime}</h3>
            </div>
        </div>
    );
};

export default OverallStatisticLabels;