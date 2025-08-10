"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEnumValue = getEnumValue;
exports.getAmount = getAmount;
exports.getEnumValueSafe = getEnumValueSafe;
exports.getEnumValueByString = getEnumValueByString;
exports.isValidEnumKey = isValidEnumKey;
exports.normalize = normalize;
exports.formatCurrency = formatCurrency;
exports.parseAmountFromKobo = parseAmountFromKobo;
exports.isValidPaymentChannels = isValidPaymentChannels;
/**
 * Generic function to get enum value by key
 * @param enumObj - The enum object to search in
 * @param key - The key to search for
 * @returns The value if found, undefined otherwise
 */
function getEnumValue(enumObj, key) {
    return enumObj[key];
}
function getAmount(amount) {
    return Math.round(amount * 100);
}
/**
 * Type-safe version that ensures the key exists in the enum
 * @param enumObj - The enum object to search in
 * @param key - The key to search for (must be a valid key of the enum)
 * @returns The value for the given key
 */
function getEnumValueSafe(enumObj, key) {
    return enumObj[key];
}
/**
 * Flexible enum value getter that accepts string and returns the value if valid
 * @param enumObj - The enum object to search in
 * @param key - The string key to search for
 * @returns The value if the key exists in the enum, undefined otherwise
 */
function getEnumValueByString(enumObj, key) {
    if (key in enumObj) {
        return enumObj[key];
    }
    return undefined;
}
/**
 * Type guard to check if a string is a valid key for an enum
 * @param enumObj - The enum object to check against
 * @param key - The string to check
 * @returns True if the key exists in the enum
 */
function isValidEnumKey(enumObj, key) {
    return key in enumObj;
}
function normalize(text) {
    return text.trim().toLowerCase();
}
/* eslint-disable */
/**
* Generates formatted currency string
* @param {number} amount to be formatted
* @param {string} currency value currency
* @return {string} value
*/
function formatCurrency(amount, currency = "NGN") {
    return new Intl.NumberFormat("en-US", { style: "currency", currency: currency.toUpperCase() }).format(amount);
}
/**
 * Converts amount in kobo (minor currency unit) to naira (major unit)
 *
 * @param {number} amountInKobo - Amount received from payment processor (e.g., 1000000000)
 * @return {number} Parsed amount in naira (e.g., 10000000)
 */
function parseAmountFromKobo(amountInKobo) {
    return amountInKobo / 100;
}
function isValidPaymentChannels(channels, validChannels) {
    // Check if all items in the array are valid payment channels
    return channels.every(channel => validChannels.includes(channel));
}
//# sourceMappingURL=index.js.map