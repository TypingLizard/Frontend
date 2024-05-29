// pages/index.tsx
"use client"

import {useState} from 'react';
import TypingArea from "@/components/typing-area/TypingArea";
import Timer from "@/components/timer/Timer";

export default function Home() {
    const [startTimer, setStartTimer] = useState(false);
    const [isTypingDisabled, setIsTypingDisabled] = useState(false);

    const handleTypingStart = () => {
        setStartTimer(true);
    };

    const handleTimeout = () => {
        alert('Time is up!');
        setIsTypingDisabled(true);
    };

    return (
        <>
            <main>
                <h1>Home</h1>
                <p>Welcome to your Next.js app.</p>
                <div id="header">
                    <div id="info">
                        <Timer initialTime={30} onTimeout={handleTimeout} start={startTimer}/>
                    </div>
                    <div id="buttons">
                        <button id="newGame">New Game</button>
                    </div>
                </div>
                <TypingArea onTypingStart={handleTypingStart} isTypingDisabled={isTypingDisabled}/>
            </main>
        </>
    );
}
