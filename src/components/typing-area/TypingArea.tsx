"use client"

import React, {useEffect, useState} from 'react';
import dynamic from "next/dynamic";
import axios from "axios";
import {Mode} from "@/app/interfaces/modles";

const TypingArea = () => {

    const [words, setWords] = useState<string[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [timer, setTimer] = useState<number | null>(30)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get<Mode>('http://localhost:8080/mode/id/1');
                const wordNames = response.data.wordList.map(word => word.wordName);
                setWords(wordNames);
                setTimer(response.data.modeTime);
                console.log(wordNames)
            } catch (err) {
                setError('Error fetching data');
            }
        };

        fetchData();
    }, [words, error, timer]);


    const gameTimer30 = 30*1000;
   // window.timer = null;

    // get Position of first Character
    useEffect(() => {

    }, []);

    useEffect(() => {
        newGame();

        // add event listener to the game div
        const gameDiv = document.getElementById('game');
        if (gameDiv) {
            // Add keydown event listener
            gameDiv.addEventListener('keydown', (e) => {
                const key = e.key;//.toLowerCase();
                const currentWord = document.querySelector('.word.current') as HTMLElement;
                const currentLetter = document.querySelector('.letter.current') as HTMLElement;
                const expected = currentLetter?.innerHTML || ' ';//.toLowerCase();

                const isLetter = key.length === 1 && key !== ' ';
                const isSpace = key === ' ';
                const isBackspace = key === 'Backspace';
                const isFirstLetter = currentLetter === currentWord.firstChild;

                // DEBUG
                console.log('key:', key);

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
                    if (expected !== ' ') {
                        const nodeList = document.querySelectorAll('.word.current .letter:not(.correct)') as NodeListOf<HTMLElement>;
                        const lettersToInvalidate = Array.from(nodeList) as HTMLElement[];

                        lettersToInvalidate.forEach(letter => {
                            addClass(letter, 'incorrect');
                        });
                    }
                    removeClass(currentWord, 'current');
                    addClass(currentWord.nextSibling as HTMLElement, 'current');

                    if (currentLetter) {
                        removeClass(currentLetter, 'current');
                    }

                    addClass(currentWord.nextSibling!.firstChild as HTMLElement, 'current');
                }

                if (isBackspace) {
                    if (currentLetter && isFirstLetter) {
                        // make previous word current, last letter of previous word current
                        removeClass(currentWord, 'current');
                        addClass(currentWord.previousSibling as HTMLElement, 'current');
                        removeClass(currentLetter, 'current');

                        if (currentWord.previousSibling) {
                            addClass(currentWord.previousSibling.lastChild as HTMLElement, 'current');
                            removeClass(currentWord.previousSibling.lastChild as HTMLElement, 'incorrect');
                            removeClass(currentWord.previousSibling.lastChild as HTMLElement, 'correct');
                        } else {
                            console.log('no previous sibling');
                        }
                    }
                    if (currentLetter && !isFirstLetter) {
                        // move back on letter
                        removeClass(currentLetter, 'current');
                        addClass(currentLetter.previousSibling as HTMLElement, 'current');
                        removeClass(currentLetter.previousSibling as HTMLElement, 'incorrect');
                        removeClass(currentLetter.previousSibling as HTMLElement, 'correct');
                    }
                    if (!currentLetter) {
                        // remove last letter of current word
                        addClass(currentWord.lastChild as HTMLElement, 'current');
                        removeClass(currentWord.lastChild as HTMLElement, 'incorrect');
                        removeClass(currentWord.lastChild as HTMLElement, 'correct');
                    }
                }

                console.log('gameDiv Height:', gameDiv.scrollHeight);
                console.log('CurrentWord GetBoundingClientRect:', currentWord?.getBoundingClientRect());
                // move lines / words
                if (currentWord && currentWord.getBoundingClientRect().top > 200) {
                    const words = document.getElementById('words') as HTMLElement;
                    const margin = parseInt(words.style.marginTop || '0');
                    words.style.marginTop = (margin - 35) + 'px';
                }

                // cursor
                // move cursor
                const nextLetter = document.querySelector('.letter.current');
                const nextWord = document.querySelector('.word.current');
                const cursor = document.getElementById('cursor');
                if (cursor) {
                    cursor.style.top = (nextLetter || nextWord)!.getBoundingClientRect().top + 3 + 'px';
                    cursor.style.left = (nextLetter || nextWord)!.getBoundingClientRect()[nextLetter ? 'left' : 'right'] + 'px';
                }
            });
        }
    }, []);

    function addClass(el: HTMLElement, className: string) {
        el.className += ' ' + className;
    }

    function removeClass(el: HTMLElement, className: string) {
        el.className = el.className.replace(className, '');
    }


    function getRandomWord() {
        return words[Math.floor(Math.random() * words.length)];

        // const randomIndex = Math.ceil(Math.random() * words.length);
        // return words[randomIndex - 1];
    }

    function formatWord(word: string) {
        // return `<div class="word">
        //            <span class="letter">${word.split('').join('</span><span class="letter">')}</span>
        //         </div>`;

        return `<div class="word"><span class="letter">${word.split('').join('</span><span class="letter">')}</span></div>`;
    }

    // this function will start the game and initialize everything
    const newGame = () => {
        // reset the div with id words
        const wordsDiv = document.getElementById('words');
        if (wordsDiv) {
            wordsDiv.innerHTML = '';
        }

        // will 'words' with random words
        for (let i = 0; i < 200; i++) {
            wordsDiv!.innerHTML += formatWord(getRandomWord());
        }

        // set the first word as active
        const activeWord = document.querySelector('.word') as HTMLElement;
        const activeLetter = document.querySelector('.letter') as HTMLElement;
        if (activeWord) addClass(activeWord, 'current');
        if (activeLetter) addClass(activeLetter, 'current');


    }

    return (
        <>
            <div id="game" tabIndex={0}>
                <div id="words"></div>
                <div id="cursor"></div>
                <div id="focus-error">Click here to focus!</div>
            </div>
        </>

    );
};

export default dynamic(() => Promise.resolve(TypingArea), {ssr: false});
