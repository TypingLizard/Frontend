/**
 * Noémi Feurer
 */

import React from 'react';
import "./MainStatistics.css"
import StatisticChartMain from "@/app/components/overall-statistics-chart/StatisticChartMain";
import OverallStatisticLabels from "@/app/components/overall-statistic-labels/OverallStatisticLabels";
import UserLabel from "@/app/components/user-label/UserLabel";
import GameLog from "@/app/components/game-log/GameLog";

interface Props {
    username: string;
    profilePic: string;
}

/**
 * The main statistics page with the overall statistics of all of the games
 *
 * @param username The username of the user who is logged in
 * @param profilePic The profile picture of the user who is logged in
 */
const MainStatistics = ({username, profilePic} : Props) => {

    return (
        <div>
            {/* The import from UserLabel component including the username and profile picture. */}
            <UserLabel username={username} profilePic={profilePic}/>

            {/* The import from OverallStatisticLabels with the required attributes with already set values. */}
            <OverallStatisticLabels overallTrainings={23} completedTrainings={45} typingTime={"00:12:20"}/>

            {/* The import from StatisticChartMain the chart which depicts the statistics. */}
            <div className="gameChart">
                <StatisticChartMain/>
            </div>

            {/* The import from GameLog. */}
            <div>
                <GameLog/>
            </div>
        </div>
    );
};

export default MainStatistics;