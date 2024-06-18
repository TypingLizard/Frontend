// pages/index.tsx
"use client"

import {useEffect, useState} from 'react';
import TypingArea from "@/components/typing-area/TypingArea";
import Timer from "@/components/timer/Timer";
import Modes from "@/components/modes/Modes";
import {useGameLoopContext} from "@/context/GameLoopContext";
import {useRouter} from "next/navigation";

export default function Home() {
    const [startTimer, setStartTimer] = useState(false);
    const {setIsTypingDisabled, isGameOver} = useGameLoopContext();

    const router = useRouter();

    const handleTypingStart = () => {
        setStartTimer(true);
    };

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

    return (
        <>
            <main>
                <h1>Home</h1>
                <p>Welcome to your Next.js app.</p>
                <div id="header">
                    <div id="info">
                        <Timer onTimeout={handleTimeout}/>
                    </div>
                    {/*<div id="buttons">*/}
                    {/*    <button id="newGame">New Game</button>*/}
                    {/*</div>*/}
                </div>
                <TypingArea
                    onTypingStart={handleTypingStart}
                />
                <Modes/>
            </main>
        </>
    );
}
