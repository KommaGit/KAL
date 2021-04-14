/**
 * Deep clone a value
 * This could either be an array as an object.
 *
 * @param value
 * @returns cloneValue
 */
export function deepClone(value) {
    return JSON.parse(JSON.stringify(value));
}

/**
 * Simple ucfirst method
 *
 * @param string
 * @returns string
 */
export function ucfirst(string) {
    if(string === undefined) return string;
    return string.charAt(0).toUpperCase() + string.slice(1);
}

/**
 * Map a given value from withing a range to another, so called interpolation.
 * So for example: 40 in range from 0 - 100, to range of 0 - 1, will give 0.4
 *
 * @param value
 * @param low1
 * @param high1
 * @param low2
 * @param high2
 * @returns {*}
 */
export function interpolation(value, low1, high1, low2, high2) {
    return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
}

/**
 * Sleep for an amount of micro seconds
 *
 * @param ms
 * @returns {Promise<unknown>}
 */
export function sleep(ms) {
    return new Promise(
        resolve => setTimeout(resolve, ms)
    );
}

/**
 * Shuffle an array
 *
 * @param array
 */
export function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

/**
 * Logging function
 *
 * @param data
 */
export function log(data) {
    console.log(data);
}

/**
 * Simple isset method for this does not exist in javascript
 *
 * @param obj
 * @returns {boolean}
 */
export function isset(obj) {
    return typeof obj !== 'undefined' && obj !== null;
}

/**
 * Simple empty method for this does not exist in javascript
 *
 * @param value
 * @returns {boolean}
 */
export function empty(value) {
    return typeof value === 'undefined' || value === null || value === '';
}

/**
 * Simple in_array method for this does not exist in javascript
 *
 * @param needle
 * @param haystack
 * @returns {boolean}
 */
export function in_array(needle, haystack) {
    return haystack.indexOf(needle) !== -1;
}