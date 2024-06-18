// src/helpers/typingAreaHelpers.ts

export const formatWord = (word: string) => {
    return `<div class="word"><span class="letter">${word.split('').join('</span><span class="letter">')}</span></div>`;
};

export const addClass = (el: HTMLElement, className: string) => {
    el.classList.add(className);
};

export const removeClass = (el: HTMLElement, className: string) => {
    el.classList.remove(className);
};

export const getRandomWord = (words: string[]) => {
    return words[Math.floor(Math.random() * words.length)];
};

export const generateGibberishWord = () => {
    let word = '';
    const length = Math.floor(Math.random() * 10) + 1; // Random length between 1 and 10
    for (let i = 0; i < length; i++) {
        word += String.fromCharCode(Math.floor(Math.random() * 26) + 97); // Random lowercase letter
    }
    return word;
};