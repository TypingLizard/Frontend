import React from 'react';
import './Modes.css';
import {GameMode} from "@/types/types";
import {useGameModeContext} from "@/context/GameModeContext";
import {FiRefreshCw} from "react-icons/fi"; // Import the CSS file for styling

const Modes = () => {
    const gameModes: GameMode[] = ['Standard', 'Hardcore', 'Words10', 'Words1000', 'Gibberish']; // Add your game modes here
    const {setGameMode, gameMode} = useGameModeContext();

    const handleOnClick = (mode: GameMode) => {
        setGameMode(mode);
        console.log(
            `Game mode set to ${gameMode}`
        );
    }

    const handleReload = () => {
        window.location.reload();
    }

    return (
        <div className="modes-container">
            {gameModes.map((mode, index) => (
                <button
                    key={index}
                    className="mode-button"
                    onClick={() => handleOnClick(mode)}
                >
                    {mode}
                </button>
            ))}
            <button
                className="mode-button"
                onClick={() => handleReload()}
            >
                <FiRefreshCw />
            </button>
        </div>
    );
};

export default Modes;