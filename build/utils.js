/**
 * @callback objectMapCallback
 * @param {any} value
 * @param {string | number} key
 * @param {Object | Array} obj
 */
/**
 * Map both arrays / objects to an array.
 * @param {Object | Array} obj 
 * @param {objectMapCallback} callback
 * @returns {Array}
 */
exports.map = (obj, callback) => {
    const arr = [];
    for (let key in obj) {
        arr.push(callback(obj[key], key, obj));
    }
    return arr;
}

/**
 * The last `x` characters of a string.
 * @param {string} str 
 * @param {number} lastChsNum 
 * @returns {string}
 */
exports.getLastChs = (str, lastChsNum) => str.substring(str.length-lastChsNum, str.length);

/**
 * The first `x` characters of a string.
 * @param {string} str 
 * @param {number} firstChsNum 
 * @returns {string}
 */
exports.getFirstChs = (str, firstChsNum) => str.substring(0, firstChsNum);

/**
 * Trim string on both sides.
 * @param {string} str 
 * @param {number} trimStart 
 * @param {number} trimEnd 
 * @returns {string}
 */
exports.trimStrSides = (str, trimStart = 0, trimEnd = 0) => str.substring(trimStart, str.length-trimEnd);

/**
 * @param {string[]} keys 
 * @param {any} vals 
 * @returns {Object.<string, any>}
 */
exports.generateDict = (keys, vals) => {
    const obj = {};
    for (let i in keys) {
        obj[keys[i]] = vals[i];
    }
    return obj;
}

const path = require('path');

/**
 * @param {string} p 
 * @returns {string}
 */
exports.relativePath = (p) => path.join(__dirname, p);