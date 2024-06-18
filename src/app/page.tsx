// pages/index.tsx
"use client"

import TypingArea from "@/components/typing-area/TypingArea";
import Navbar from "@/components/navbar/Navbar";
import Timer from "@/components/timer/Timer";
import Modes from "@/components/modes/Modes";
import {useGameLoopContext} from "@/context/GameLoopContext";
import {useRouter} from "next/navigation";
import MainStatistics from "@/app/main-statistic-page/MainStatisticsPage";
import GameStatisticsPage from "@/app/game-statistic-page/GameStatisticsPage";
import Information from "./user-information.json"


export default function Home() {
    const {setIsTypingDisabled} = useGameLoopContext();

    const router = useRouter();
    const handleTimeout = () => {
        // alert('Time is up!');
        setIsTypingDisabled(true);
        handleRedirect()
    };


    // useEffect(() => {
    //     if (isGameOver) {
    //         handleRedirect();
    //     }
    // }, [isGameOver]);

    const handleRedirect = () => {
        // redirect to game over page
        router.push('/game-over');
    }


    /**
     * Returns one of the statistic pages
     *
     * @returns One of the statistic pages
     */
    return (
        <>
            <Navbar/>
            <main>
                <h1>Home</h1>
                <p>Welcome to your Next.js app.</p>
                <div id="header">
                    <div id="info">
                        <Timer onTimeout={handleTimeout}/>
                    </div>
                </div>

                <TypingArea/>
                <Modes/>
            </main>
        </>
    );
}
