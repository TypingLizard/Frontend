"use client"

import React, {createContext, useContext, useState} from 'react';
import {GlobalTimer} from "@/types/types";

type GlobalTimerContextProps = {
    children: React.ReactNode;
};

type GlobalTimerContext = {
    globalTimer: GlobalTimer;
    setGlobalTimer: React.Dispatch<React.SetStateAction<GlobalTimer>>;
    isTimerRunning: boolean;
    setIsTimerRunning: React.Dispatch<React.SetStateAction<boolean>>;
}

export const GlobalTimerContext = createContext<GlobalTimerContext | null>(null);

/**
 * A context provider that provides the global timer and the ability to set the global timer.
 * The global timer is used to keep track of the time left in the game.
 * The timer is in seconds.
 * @param children The children of the context provider.
 * @constructor
 * @return The global timer context provider.
 */
export default function GlobalTimerContextProvider({children}: GlobalTimerContextProps) {
    const [globalTimer, setGlobalTimer] = useState<GlobalTimer>(10);
    const [isTimerRunning, setIsTimerRunning] = useState(false);

    return (
        <GlobalTimerContext.Provider
            value={{
                globalTimer,
                setGlobalTimer,
                isTimerRunning,
                setIsTimerRunning
            }}>
            {children}
        </GlobalTimerContext.Provider>
    );
}

/**
 * A hook that provides the global timer context.
 * @return The global timer context.
 */
export function useGlobalTimerContext() {
    const context = useContext(GlobalTimerContext);
    if (!context) {
        throw new Error('useGlobalTimerContext must be used within a GlobalTimerContextProvider');
    }
    return context;
}