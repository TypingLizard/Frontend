/**
 * Project: Typing_Lizard_Frontend
 * Author : Alexander Friedl
 * Date : 18.06.2024
 * Time : 22:26
 */

import React from 'react';
import GameStatisticsPage from "@/app/game-statistic-page/GameStatisticsPage";
import Information from "@/app/user-information.json";

const Page = () => {

    /**
     * Function to get the profile picture from the required file
     *
     * @returns The profile picture from the file
     */
    const getProfilePic = () => {
        return Information.user.profilePic
    }

    /**
     * Function to get the username from the required file
     *
     * @returns The username from the file
     */
    const getUsername = () => {
        return Information.user.username
    }


    return (
        <div>
            {<GameStatisticsPage username={getUsername()} profilePic={getProfilePic()}/>}

        </div>
    );
};

export default Page;