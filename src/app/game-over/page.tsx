import React from 'react';
import Information from "@/app/user-information.json";
import GameStatisticsPage from "@/app/game-statistic-page/GameStatisticsPage";
import {gridIds} from "@react-aria/table/src/utils";

const GameOverPage = () => {

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



            <div style={styles.center}>

                <h1>Game Over!</h1>
                <button style={styles.button}>
                    <a href="/">New Game</a>
                </button>
            </div>

            {<GameStatisticsPage username={getUsername()} profilePic={getProfilePic()}/>}


        </div>
    );
};


const styles = {

    center: {
        marginTop: 50,
        display: 'grid',
        placeItems: 'center'
    },

    button: {

        marginBottom: 10,
        padding: '10px 20px',
        fontSize: '0.9em',
            color: '#333',
            backgroundColor: '#FFD700',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            marginRight: 5
    }
}

export default GameOverPage;