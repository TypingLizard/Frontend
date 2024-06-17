/**
 * Noémi Feurer
 */

'use client'
import React from 'react';
import "./SingleGameButtons.css"
import {MdNavigateNext, MdOutlineShortText, MdRepeat} from "react-icons/md";
import {HiOutlineExclamationTriangle} from "react-icons/hi2";
import {BsExclamationTriangle} from "react-icons/bs";

/**
 * Component for all the buttons that are gonna be needed after a game ends. Functionality of the buttons is still in
 * development.
 */
const SingleGameButtons = () => {

    /**
     * Function for the next game button -> functionality in the future
     */
    const nextGame = () => {

    }

    /**
     * Function for the repeat current game button -> functionality in the future
     */
    const repeatGame = () => {

    }

    /**
     * Function for the practice words button -> functionality in the future
     */
    const practiceWords = () => {

    }

    /**
     * Function for the toggle word history button -> functionality in the future
     */
    const toggleWordHistory = () => {

    }

    return (
        /**
         * Container with all the buttons.
         */
        <div className="buttonContainer">
            <button className="button" onClick={() => nextGame()}><MdNavigateNext/></button>
            <button className="button" onClick={() => repeatGame()}><MdRepeat/></button>
            <button className="button" onClick={() => practiceWords()}><BsExclamationTriangle/></button>
            <button className="button" onClick={() => toggleWordHistory()}><MdOutlineShortText/></button>
        </div>
    );
};

export default SingleGameButtons;