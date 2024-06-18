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

/**
 * A context provider that provides the game loop state and the ability to set the game loop state.
 * The game loop state is used to determine if the game is over and if typing is disabled.
 * @param children The children of the context provider.
 * @constructor
 * @return The game loop context provider.
 */
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

/**
 * A hook that provides the game loop context.
 * @return The game loop context.
 */
export function useGameLoopContext() {
    const context = useContext(GameLoopContext);
    if (!context) {
        throw new Error('useGameLoopContext must be used within a GameLoopContextProvider');
    }
    return context;
}