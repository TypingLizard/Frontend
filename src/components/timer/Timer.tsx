// components/timer/Timer.tsx
"use client"

import React, { useEffect, useState } from 'react';

type TimerProps = {
    initialTime: number;
    onTimeout: () => void;
    start: boolean;
};

const Timer = ({ initialTime, onTimeout, start }: TimerProps) => {
    const [timeLeft, setTimeLeft] = useState(initialTime);

    useEffect(() => {
        if (!start) return;

        if (timeLeft <= 0) {
            onTimeout();
            return;
        }

        const timerId = setInterval(() => {
            setTimeLeft((prevTime) => prevTime - 1);
        }, 1000);

        return () => clearInterval(timerId);
    }, [timeLeft, start, onTimeout]);

    return (
        <div>
            <p>Time Left: {timeLeft}</p>
            {timeLeft === 0 && <p>Time is up!</p>}
        </div>
    );
};

export default Timer;
