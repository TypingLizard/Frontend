"use client"

import React, { useEffect, useState, useRef, useCallback } from 'react';
import dynamic from "next/dynamic";
import axios from "axios";
import {Mode, Word} from "@/interfaces/modles";

type TypingAreaProps = {
    onTypingStart: () => void;
    isTypingDisabled: boolean;
};

const TypingArea = ({ onTypingStart, isTypingDisabled }: TypingAreaProps) => {

    const GLOBAL_TIMER = 30;
    const [timer, setTimer] = useState(GLOBAL_TIMER);
    const [words, setWords] = useState<string[]>([]);
    const [error, setError] = useState<string | null>(null);


        const fetchData = async (): Promise<Mode | undefined> => {
            try {
                const response = await axios.get<Mode>('http://localhost:8080/mode/id/1');
                console.log("fetching Data")
                return response.data;


            } catch (err) {
                setError('Error fetching data');
            }
        };


    const gameDivRef = useRef<HTMLDivElement>(null);
    const wordsDivRef = useRef<HTMLDivElement>(null);
    const cursorRef = useRef<HTMLDivElement>(null);

    const addClass = useCallback((el: HTMLElement, className: string) => {
        el.classList.add(className);
    }, []);

    const removeClass = useCallback((el: HTMLElement, className: string) => {
        el.classList.remove(className);
    }, []);

    const getRandomWord = useCallback((mode:Mode) => {
        const wordName = mode.wordList.map(word => word.wordName);

        setWords(wordName);

        console.log(words)
        return words[Math.floor(Math.random() * words.length)];
    }, [words]);

    const formatWord = useCallback((word: string) => {
        return `<div class="word"><span class="letter">${word.split('').join('</span><span class="letter">')}</span></div>`;
    }, []);


    const newGame = useCallback((mode:Mode) => {

        setTimer(mode.modeTime);


        const wordsDiv = wordsDivRef.current;
        if (wordsDiv) {
            wordsDiv.innerHTML = '';
            for (let i = 0; i < 200; i++) {
                wordsDiv.innerHTML += formatWord(getRandomWord(mode));
            }

            const activeWord = wordsDiv.querySelector('.word') as HTMLElement;
            const activeLetter = wordsDiv.querySelector('.letter') as HTMLElement;
            if (activeWord) addClass(activeWord, 'current');
            if (activeLetter) addClass(activeLetter, 'current');


        }
    }, [addClass, formatWord, getRandomWord]);

    const handleKeyDown = useCallback((e: KeyboardEvent) => {
        if (isTypingDisabled) return;

        onTypingStart();

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
            // Invalidate the current word if there are any incorrect letters
            const lettersToInvalidate = Array.from(currentWord.querySelectorAll('.letter:not(.correct)')) as HTMLElement[];
            if (lettersToInvalidate.length > 0) {
                lettersToInvalidate.forEach(letter => {
                    addClass(letter, 'incorrect');
                });
            }
            removeClass(currentWord, 'current');
            if (currentWord.nextSibling) {
                addClass(currentWord.nextSibling as HTMLElement, 'current');
                if (currentWord.nextSibling.firstChild) {
                    addClass(currentWord.nextSibling.firstChild as HTMLElement, 'current');
                }
            }
        }

        if (isBackspace) {
            if (currentLetter && isFirstLetter) {
                removeClass(currentWord, 'current');
                if (currentWord.previousSibling) {
                    addClass(currentWord.previousSibling as HTMLElement, 'current');
                    const lastChild = currentWord.previousSibling.lastChild as HTMLElement;
                    if (lastChild) {
                        addClass(lastChild, 'current');
                        removeClass(lastChild, 'incorrect');
                        removeClass(lastChild, 'correct');
                    }
                }
            } else if (currentLetter && !isFirstLetter) {
                removeClass(currentLetter, 'current');
                addClass(currentLetter.previousSibling as HTMLElement, 'current');
                removeClass(currentLetter.previousSibling as HTMLElement, 'incorrect');
                removeClass(currentLetter.previousSibling as HTMLElement, 'correct');
            } else {
                const lastChild = currentWord.lastChild as HTMLElement;
                if (lastChild) {
                    addClass(lastChild, 'current');
                    removeClass(lastChild, 'incorrect');
                    removeClass(lastChild, 'correct');
                    const extraLetters = currentWord.querySelectorAll('.letter.extra') as NodeListOf<HTMLElement>;
                    if (extraLetters.length > 0) {
                        extraLetters[extraLetters.length - 1].remove();
                    }
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
    }, [addClass, onTypingStart, removeClass, isTypingDisabled]);

    useEffect(() => {

        const initializeGame = async () => {
            const mode = await fetchData();
            if (!mode) {
                console.log("mode null")

                return;

            }
            console.log("mode not null")

            newGame(mode);
        }
        initializeGame().catch(err => console.error("my error ", err)).then(() => {
            console.log("in use effect!!")
            // add event listener to the game div
            const gameDiv = gameDivRef.current;

            if (gameDiv) {
                gameDiv.addEventListener('keydown', handleKeyDown);
                return () => {
                    gameDiv.removeEventListener('keydown', handleKeyDown);
                };
            }
        })

    }, [handleKeyDown, newGame]);

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

export default dynamic(() => Promise.resolve(TypingArea), { ssr: false });
