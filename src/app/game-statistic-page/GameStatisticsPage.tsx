/**
 * Noémi Feurer
 */

import React from 'react';
import './GameStatistics.css'
import UserLabel from "@/app/components/user-label/UserLabel";
import SingleGameStatisticLabels from "@/app/components/single-game-statistic-labels/SingleGameStatisticLabels";
import SingleGameButtons from "@/app/components/single-game-buttons/SingleGameButtons";

interface Props {
    username: string;
    profilePic: string;
}

/**
 * Page for the statistics of a single game. It should display the statistics of the currently finished game
 *
 * @param username The username of the user who played
 * @param profilePic The profile picture of the user who played
 */
const GameStatisticsPage = ({username, profilePic} : Props) => {



    return (
        <div>
            {/* The import from UserLabel component including the username and profile picture. */}
            <UserLabel username={username} profilePic={profilePic}/>

            {/* The import from SingleGameStatisticLabels with the required attributes with already set values. */}
            <SingleGameStatisticLabels wpm={45} accuracy={74} trainingType={"Medium English"} raw={72} trainingTime={45}/>

            {/* The import from SingleGameButtons which will later have functionality. */}
            <SingleGameButtons />
        </div>
    );
};

export default GameStatisticsPage;