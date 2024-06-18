"use client"

import React, {createContext, useContext, useState} from 'react';

type GameLoopContextProps = {
    children: React.ReactNode;
};

type GameLoopContext = {
    isGameOver: boolean;
    setIsGameOver: React.Dispatch<React.SetStateAction<boolean>>;
    isTypingDisabled: boolean;
    setIsTypingDisabled: React.Dispatch<React.SetStateAction<boolean>>;
}

export const GameLoopContext = createContext<GameLoopContext | null>(null);

export default function GameLoopContextProvider({children}: GameLoopContextProps) {
    const [isGameOver, setIsGameOver] = useState<boolean>(false);
    const [isTypingDisabled, setIsTypingDisabled] = useState<boolean>(false);

    return (
        <GameLoopContext.Provider
            value={{
                isGameOver,
                setIsGameOver,
                isTypingDisabled,
                setIsTypingDisabled
            }}>
            {children}
        </GameLoopContext.Provider>
    );
}

export function useGameLoopContext() {
    const context = useContext(GameLoopContext);
    if (!context) {
        throw new Error('useGameLoopContext must be used within a GameLoopContextProvider');
    }
    return context;
}