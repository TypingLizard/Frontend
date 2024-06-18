"use client"

import React, {useEffect, useState, useRef, useCallback} from 'react';
import dynamic from "next/dynamic";
import {useGameModeContext} from "@/context/GameModeContext";
import {useGlobalTimerContext} from "@/context/GlobalTimerContext";
import {useGameLoopContext} from "@/context/GameLoopContext";
import {addClass, formatWord, generateGibberishWord, getRandomWord, removeClass} from "@/helpers/typingAreaHelpers";
import {router} from "next/client";

type TypingAreaProps = {
    onTypingStart: () => void;
};

const TypingArea = ({onTypingStart}: TypingAreaProps) => {

    const [words] = useState([
        "time", "year", "people", "way", "day", "man", "thing", "woman", "life", "child",
        "world", "school", "state", "family", "student", "group", "country", "problem", "hand",
        "part", "place", "case", "week", "company", "system", "program", "question", "work",
        "government", "number", "night", "point", "home", "water", "room", "mother", "area",
        "money", "story", "fact", "month", "lot", "right", "study", "book", "eye", "job", "word",
        "business", "issue", "side", "kind", "head", "house", "service", "friend", "father",
        "power", "hour", "game", "line", "end", "member", "law", "car", "city", "community",
        "name", "president", "team", "minute", "idea", "kid", "body", "information", "back",
        "parent", "face", "others", "level", "office", "door", "health", "person", "art", "war",
        "history", "party", "result", "change", "morning", "reason", "research", "girl", "guy",
        "moment", "air", "teacher", "force", "education"
    ]);

    // useContext hooks ----------------------------------------------------------------------------------------------------------------------------------------
    const {gameMode} = useGameModeContext();
    const {globalTimer, setGlobalTimer, isTimerRunning, setIsTimerRunning} = useGlobalTimerContext();
    const {isGameOver, setIsGameOver, isTypingDisabled, setIsTypingDisabled} = useGameLoopContext();

    const gameDivRef = useRef<HTMLDivElement>(null);
    const wordsDivRef = useRef<HTMLDivElement>(null);
    const cursorRef = useRef<HTMLDivElement>(null);

    const handleGameOver = useCallback(() => {
        setIsGameOver(true);
        setIsTypingDisabled(true);

    }, [setIsGameOver, setIsTypingDisabled]);

    // GAME MODES ----------------------------------------------------------------------------------------------------------------------------------------------
    const gameModeStandard = useCallback(() => {
        setGlobalTimer(25);
        for (let i = 0; i < 25; i++) {
            wordsDivRef.current!.innerHTML += formatWord(getRandomWord(words));
        }
    }, [setGlobalTimer, words]);

    const gameModeGibberish = useCallback(() => {
        setGlobalTimer(25);
        for (let i = 0; i < 25; i++) {
            wordsDivRef.current!.innerHTML += formatWord(generateGibberishWord());
        }
    }, [setGlobalTimer]);

    // EVENT HANDLERS ------------------------------------------------------------------------------------------------------------------------------------------
    const handleKeyDown = useCallback((e: KeyboardEvent) => {
        // check is game is over
        if (!isGameOver) {
            setIsTimerRunning(true);
            setIsTypingDisabled(false);

            const key = e.key;
            const currentWord = document.querySelector('.word.current') as HTMLElement;
            const currentLetter = document.querySelector('.letter.current') as HTMLElement;
            const expected = currentLetter?.innerHTML || ' ';

            if (!currentWord) return;

            const isLetter = key.length === 1 && key !== ' ';
            const isSpace = key === ' ';
            const isBackspace = key === 'Backspace';
            const isFirstLetter = currentLetter === currentWord.firstChild;

            if (isLetter) {
                if (currentLetter) {
                    addClass(currentLetter, key === expected ? 'correct' : 'incorrect');
                    removeClass(currentLetter, 'current');
                    if (currentLetter.nextSibling) {
                        addClass(currentLetter.nextSibling as HTMLElement, 'current');
                    }
                } else {
                    const incorrectLetters = document.createElement('span');
                    incorrectLetters.innerHTML = key;
                    incorrectLetters.className = 'letter incorrect extra';
                    currentWord.appendChild(incorrectLetters);
                }
            }

            if (isSpace) {
                // check if 'space' is expected
                if (expected === ' ') {
                    // 'space' is expected, move to the next word
                    removeClass(currentWord, 'current');

                    if (currentWord.nextSibling) {
                        addClass(currentWord.nextSibling as HTMLElement, 'current');

                        const firstChild = currentWord.nextSibling.firstChild as HTMLElement;
                        if (firstChild) {
                            addClass(firstChild, 'current');
                        }
                    }
                } else {
                    // 'space' is not expected (i.e. in the middle of a word)
                    // invalidate rest of the letters
                    const lettersToInvalidate = Array.from(currentWord.querySelectorAll('.letter:not(.correct)')) as HTMLElement[];
                    if (lettersToInvalidate.length > 0) {
                        lettersToInvalidate.forEach(letter => {
                            addClass(letter, 'incorrect');
                        });
                    }

                    // remove current class from the current letter & word
                    removeClass(currentLetter, 'current');
                    removeClass(currentWord, 'current');

                    // add current class to the next word & first letter
                    if (currentWord.nextSibling) {
                        addClass(currentWord
                            .nextSibling as HTMLElement, 'current');
                        if (currentWord.nextSibling.firstChild) {
                            addClass(currentWord
                                .nextSibling.firstChild as HTMLElement, 'current');
                        }
                    }
                }
            }

            // check for backspace
            if (isBackspace) {
                // check if not 'backspace' is expected
                const isFirstWord = currentWord === wordsDivRef.current?.firstChild;
                if (isFirstWord && isFirstLetter) return;

                // if 'backspace' is pressed on the first letter of the word, remove 'current' from word and letter, move to the previous word
                if (currentLetter && isFirstLetter) {
                    removeClass(currentWord, 'current');
                    removeClass(currentLetter, 'current');

                    // move to previous word
                    if (currentWord.previousSibling) {
                        // add 'current' to the previous word
                        addClass(currentWord.previousSibling as HTMLElement, 'current');

                        // add 'current' to the last letter of the previous word
                        const lastChild = currentWord.previousSibling.lastChild as HTMLElement;
                        if (lastChild) {
                            addClass(lastChild, 'current');

                            // remove 'correct' and 'incorrect' classes
                            removeClass(lastChild, 'incorrect');
                            removeClass(lastChild, 'correct');
                        }
                    }
                }


                // if 'backspace' is pressed on a letter other than the first letter of the word, move to the previous letter
                if (currentLetter && !isFirstLetter) {
                    // remove 'current' class from the current letter
                    removeClass(currentLetter, 'current');

                    // add 'current' to the previous letter
                    addClass(currentLetter.previousSibling as HTMLElement, 'current');

                    // remove 'correct' and 'incorrect' classes
                    removeClass(currentLetter.previousSibling as HTMLElement, 'incorrect');
                    removeClass(currentLetter.previousSibling as HTMLElement, 'correct');
                }

                // if 'backspace' is pressed on the last character of the word
                if (!currentLetter) {
                    // add 'current' to the last letter of the previous word
                    const lastChild = currentWord.lastChild as HTMLElement;
                    if (lastChild) {
                        addClass(lastChild, 'current');

                        // remove 'correct' and 'incorrect' classes
                        removeClass(lastChild, 'incorrect');
                        removeClass(lastChild, 'correct');
                    }
                }

                if (currentWord) {
                    // remove extra letters
                    const extraLetters = currentWord.querySelectorAll('.letter.extra') as NodeListOf<HTMLElement>;
                    if (extraLetters.length > 0) {
                        extraLetters[extraLetters.length - 1].remove();
                    }
                }
            }


            if (currentWord.getBoundingClientRect().top > 200) {
                const wordsDiv = wordsDivRef.current;
                if (wordsDiv) {
                    const margin = parseInt(wordsDiv.style.marginTop || '0');
                    wordsDiv.style.marginTop = (margin - 35) + 'px';
                }
            }

            const nextLetter = document.querySelector('.letter.current');
            const nextWord = document.querySelector('.word.current');
            const cursor = cursorRef.current;
            if (cursor) {
                cursor.style.top = (nextLetter || nextWord)!.getBoundingClientRect().top + 3 + 'px';
                cursor.style.left = (nextLetter || nextWord)!.getBoundingClientRect()[nextLetter ? 'left' : 'right'] + 'px';
            }
        } else {
            // setIsTimerRunning(false);

            // handel game over
            handleGameOver();
        }
    }, [handleGameOver, isGameOver, setIsTimerRunning, setIsTypingDisabled]);

    const newGame = useCallback(() => {
        // reset game state
        setIsGameOver(false);
        setIsTimerRunning(false);

        const wordsDiv = wordsDivRef.current;
        if (wordsDiv) {
            wordsDiv.innerHTML = '';
            switch (gameMode) {
                case 'Standard':
                    gameModeStandard();
                    break;
                case "Gibberish":
                    gameModeGibberish();
                    break;
                case "Hardcore":
                    gameModeStandard();
                    break;
                case "Words10":
                    gameModeStandard();
                    break;
                case "Words1000":
                default:
                    gameModeStandard();
                    break;
            }

            const activeWord = wordsDiv.querySelector('.word') as HTMLElement;
            const activeLetter = wordsDiv.querySelector('.letter') as HTMLElement;
            if (activeWord) addClass(activeWord, 'current');
            if (activeLetter) addClass(activeLetter, 'current');
        }
    }, [setIsGameOver, setIsTimerRunning, gameMode, gameModeStandard, gameModeGibberish]);

    // main game loop ------------------------------------------------------------------------------------------------------------------------------------------
    useEffect(() => {
        newGame();

        const gameDiv = gameDivRef.current;
        if (gameDiv) {
            if (gameDiv) {
                if (!isTypingDisabled) {
                    gameDiv.addEventListener('keydown', handleKeyDown);
                } else {
                    gameDiv.removeEventListener('keydown', handleKeyDown);
                }
            }
            return () => {
                if (gameDiv) {
                    gameDiv.removeEventListener('keydown', handleKeyDown);
                }
            };
        }


    }, [handleKeyDown, isTypingDisabled, newGame, setIsGameOver]);

    // handle game over ----------------------------------------------------------------------------------------------------------------------------------------

    return (
        <>
            <div id="game" ref={gameDivRef} tabIndex={0}>
                <div id="words" ref={wordsDivRef}></div>
                <div id="cursor" ref={cursorRef}></div>
                <div id="focus-error">Click here to focus!</div>
            </div>
        </>
    );
};

export default dynamic(() => Promise.resolve(TypingArea), {ssr: false});
