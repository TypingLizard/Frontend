/**
 * Formats a word into a series of span elements
 * @example
 * formatWord('hello'); // '<div class="word"><span class="letter">h</span><span class="letter">e</span><span class="letter">l</span><span class="letter">l</span><span class="letter">o</span></div>'
 * @param word
 */
export const formatWord = (word: string) => {
    return `<div class="word"><span class="letter">${word.split('').join('</span><span class="letter">')}</span></div>`;
};

/**
 * Adds a class to an element
 * @example
 * addClass(document.querySelector('.element'), 'classToAdd');
 * @param el
 * @param className
 */
export const addClass = (el: HTMLElement, className: string) => {
    el.classList.add(className);
};

/**
 * Removes a class from an element
 * @example
 * removeClass(document.querySelector('.element'), 'classToRemove');
 * @param el
 * @param className
 */
export const removeClass = (el: HTMLElement, className: string) => {
    el.classList.remove(className);
};

/**
 * Checks if an element has a class
 * @example
 * hasClass(document.querySelector('.element'), 'classToCheck');
 * @param words
 */
export const getRandomWord = (words: string[]) => {
    return words[Math.floor(Math.random() * words.length)];
};

/**
 * Generates a random gibberish word
 * @example
 * generateGibberishWord(); // 'alajsdlkf'
 */
export const generateGibberishWord = () => {
    let word = '';
    const length = Math.floor(Math.random() * 10) + 1; // Random length between 1 and 10
    for (let i = 0; i < length; i++) {
        word += String.fromCharCode(Math.floor(Math.random() * 26) + 97); // Random lowercase letter
    }
    return word;
};