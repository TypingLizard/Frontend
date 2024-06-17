import React from "react";
import MainStatistics from "@/app/main-statistic-page/MainStatisticsPage";
import GameStatisticsPage from "@/app/game-statistic-page/GameStatisticsPage";
import Information from "./user-information.json"

/**
 * Home component which displays the wanted files
 */
export default function Home() {
    /**
     * Function to get the username from the required file
     *
     * @returns The username from the file
     */
    const getUsername = () => {
        return Information.user.username
    }

    /**
     * Function to get the profile picture from the required file
     *
     * @returns The profile picture from the file
     */
    const getProfilePic = () => {
        return Information.user.profilePic
    }

    /**
     * Returns one of the statistic pages
     *
     * @returns One of the statistic pages
     */
    return (
        <main>
            {<GameStatisticsPage username={getUsername()} profilePic={getProfilePic()}/>}
            {/*<MainStatistics username={getUsername()} profilePic={getProfilePic()}/>*/}
        </main>
    );
}
