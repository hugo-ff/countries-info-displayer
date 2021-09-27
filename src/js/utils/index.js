/**
 * @name validateArray
 * @description return true or false if arg is a valid array and if arg has elements inside
 * @param {array} array
 * @example validateArray({}) // false
 * @returns bool
 * @module utils
 */
const validateArray = (arr = []) => !!(arr instanceof Array && arr.length);

export default validateArray;
