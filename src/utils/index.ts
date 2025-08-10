import { PaymentChannels } from "..";

/**
 * Generic function to get enum value by key
 * @param enumObj - The enum object to search in
 * @param key - The key to search for
 * @returns The value if found, undefined otherwise
 */
export function getEnumValue<T extends Record<string, string>>(
  enumObj: T,
  key: string
): T[keyof T] | undefined {
  return enumObj[key as keyof T];
}

export function getAmount(amount: number): number {
  return Math.round(amount * 100);
}

/**
 * Type-safe version that ensures the key exists in the enum
 * @param enumObj - The enum object to search in
 * @param key - The key to search for (must be a valid key of the enum)
 * @returns The value for the given key
 */
export function getEnumValueSafe<T extends Record<string, string>, K extends keyof T>(
  enumObj: T,
  key: K
): T[K] {
  return enumObj[key];
}

/**
 * Flexible enum value getter that accepts string and returns the value if valid
 * @param enumObj - The enum object to search in
 * @param key - The string key to search for
 * @returns The value if the key exists in the enum, undefined otherwise
 */
export function getEnumValueByString<T extends Record<string, string>>(
  enumObj: T,
  key: string
): string | undefined {
  if (key in enumObj) {
    return enumObj[key as keyof T];
  }
  return undefined;
}

/**
 * Type guard to check if a string is a valid key for an enum
 * @param enumObj - The enum object to check against
 * @param key - The string to check
 * @returns True if the key exists in the enum
 */
export function isValidEnumKey<T extends Record<string, string>>(
  enumObj: T,
  key: string
): key is Extract<keyof T, string> {
  return key in enumObj;
}

export function normalize(text: string): string {
  return text.trim().toLowerCase();
}

/* eslint-disable */

/**
* Generates formatted currency string
* @param {number} amount to be formatted
* @param {string} currency value currency
* @return {string} value
*/
export function formatCurrency(
  amount: number, currency = "NGN"): string {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: currency.toUpperCase() }).format(amount);
}

/**
 * Converts amount in kobo (minor currency unit) to naira (major unit)
 *
 * @param {number} amountInKobo - Amount received from payment processor (e.g., 1000000000)
 * @return {number} Parsed amount in naira (e.g., 10000000)
 */
export function parseAmountFromKobo(amountInKobo: number): number {
  return amountInKobo / 100;
}

export function isValidPaymentChannels(channels: string[], validChannels: PaymentChannels[]): channels is PaymentChannels[] {
  // Check if all items in the array are valid payment channels
  return channels.every(channel => validChannels.includes(channel as PaymentChannels));
}