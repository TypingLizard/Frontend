"use client"

import React, {createContext, useContext, useState} from 'react';
import {GameMode} from "@/types/types";

type GameModeContextProps = {
    children: React.ReactNode;
};

type GameModeContext = {
    gameMode: GameMode;
    setGameMode: React.Dispatch<React.SetStateAction<GameMode>>;
}

export const GameModeContext = createContext<GameModeContext | null>(null);

export default function GameModeContextProvider({children}: GameModeContextProps) {
    const [gameMode, setGameMode] = useState<GameMode>('Standard');

    return (
        <GameModeContext.Provider
            value={{
                gameMode,
                setGameMode,
            }}>
            {children}
        </GameModeContext.Provider>
    );
}

export function useGameModeContext() {
    const context = useContext(GameModeContext);
    if (!context) {
        throw new Error('useGameModeContext must be used within a GameModeContextProvider');
    }
    return context;
}