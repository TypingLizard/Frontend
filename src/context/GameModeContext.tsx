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

/**
 * A context provider that provides the game mode and the ability to set the game mode.
 * The game mode is used to determine the difficulty of the game.
 * @param children The children of the context provider.
 * @constructor
 * @return The game mode context provider.
 * @see GameMode
 * @see GameModeContext
 * @see GameModeContextProps
 * @see GameModeContextProvider
 * @see useGameModeContext
 */
export const GameModeContext = createContext<GameModeContext | null>(null);

/**
 * A context provider that provides the game mode and the ability to set the game mode.
 * The game mode is used to determine the difficulty of the game.
 * @param children
 * @constructor
 * @return The game mode context provider.
 */
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

/**
 * A hook that provides the game mode context.
 * @return The game mode context.
 * @see GameModeContext
 * @see GameModeContextProvider
 * @see useGameModeContext
 */
export function useGameModeContext() {
    const context = useContext(GameModeContext);
    if (!context) {
        throw new Error('useGameModeContext must be used within a GameModeContextProvider');
    }
    return context;
}