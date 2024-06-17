/**
 * Noémi Feurer
 */

'use client';
import React, {useState} from "react";
import {Chart, registerables} from "chart.js";
import {useRouter} from "next/navigation";
import {Line} from "react-chartjs-2";
import "./StatisticChartMain.css"
import ChartInfo from "../../chart-information.json"

/**
 * Component for the chart on the overall main page. Data is from a .json file, database functionality coming later.
 */
export default function StatisticChartMain() {

    /**
     * Function for getting all played game ids
     *
     * @returns A number array with the number of played games from 1 to n
     */
    const getAllPlayedGames = () => {
        return ChartInfo.overAllPlayed.map(x => x.id)
    }

    /**
     * Function for getting all word per minute data per game
     *
     * @returns A number array with all the wpms from all games
     */
    const getAllGameData = () => {
        return ChartInfo.overAllPlayed.map(x => x.gameData)
    }

    // Played games which will serve in the chart as the labels
    const [playedGames, setPlayedGames] = useState(getAllPlayedGames)
    // WPM data that is going to go into the dataset under the data option
    const [gameData, setGameData] = useState(getAllGameData)

    // Router creation + chart registration
    const router = useRouter()
    Chart.register(...registerables)

    /**
     * The chart data is created. Played games array is used for the labels and the WPM game data is used in the dataset.
     */
    const data = {
        labels: playedGames,
        datasets: [
            {
                label: 'Typed words',
                data: gameData,
                fill: true,
                backgroundColor: 'rgba(75,192,192,0.5)',
                borderColor: 'rgba(75,192,192,1)',
            }
        ],
        options: {
            // responsive + maintainAspectRatio should solve resizing issue, but it does not -> fixing in the future
            responsive: true,
            maintainAspectRatio: false,
            legend: {
                labels: {
                    fontColor: 'rgba(255,255,255,0)'
                }
            }
        }
    }

    /**
     * @returns The line chart
     */
    return (
        <div className="chart">
            <Line data={data} style={{}}/>
        </div>
    );
};