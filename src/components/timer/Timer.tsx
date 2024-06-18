"use client"

import React, { useEffect, useState } from 'react';
import {useGlobalTimerContext} from "@/context/GlobalTimerContext";

type TimerProps = {
    onTimeout: () => void;
};

const Timer = ({ onTimeout }: TimerProps) => {
    const { globalTimer, setGlobalTimer } = useGlobalTimerContext();
    const { isTimerRunning, setIsTimerRunning } = useGlobalTimerContext();

    useEffect(() => {
        if (!isTimerRunning) return;

        if (globalTimer <= 0) {
            onTimeout();
            return;
        }

        const timerId = setInterval(() => {
            setGlobalTimer((prevTime) => prevTime - 1);
        }, 1000);

        return () => clearInterval(timerId);
    }, [globalTimer, isTimerRunning, onTimeout, setGlobalTimer]);

    return (
        <div>
            <p>Time Left: {globalTimer}</p>
        </div>
    );
};

export default Timer;
