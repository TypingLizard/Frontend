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

export default function GlobalTimerContextProvider({children}: GlobalTimerContextProps) {
    const [globalTimer, setGlobalTimer] = useState<GlobalTimer>(25);
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

export function useGlobalTimerContext() {
    const context = useContext(GlobalTimerContext);
    if (!context) {
        throw new Error('useGlobalTimerContext must be used within a GlobalTimerContextProvider');
    }
    return context;
}