/**
 * Configuration options for string to number conversion
 */
interface SafeNumberOptions {
    /** Allow decimal numbers (default: true) */
    allowDecimals?: boolean;
    /** Allow negative numbers (default: true) */
    allowNegative?: boolean;
    /** Minimum allowed value */
    min?: number;
    /** Maximum allowed value */
    max?: number;
    /** Default value to return if conversion fails */
    defaultValue?: number;
    /** Allow scientific notation like "1e5" (default: true) */
    allowScientific?: boolean;
    /** Allow leading/trailing whitespace (default: true) */
    allowWhitespace?: boolean;
    /** Allow thousand separators like "1,000" (default: false) */
    allowThousandSeparators?: boolean;
}
/**
 * Result of the safe number conversion
 */
interface SafeNumberResult {
    /** The converted number, or null if conversion failed */
    value: number | null;
    /** Whether the conversion was successful */
    success: boolean;
    /** Error message if conversion failed */
    error?: string;
    /** The original input string */
    input: string;
}
/**
 * Safely converts a string or number to a number with comprehensive edge case handling
 *
 * @param input - The string or number to convert
 * @param options - Configuration options for the conversion
 * @returns SafeNumberResult containing the result and metadata
 *
 * @example
 * ```typescript
 * // Basic usage with string
 * const result = safeStringToNumber("123");
 * if (result.success) {
 *   console.log(result.value); // 123
 * }
 *
 * // Basic usage with number
 * const result2 = safeStringToNumber(456);
 * if (result2.success) {
 *   console.log(result2.value); // 456
 * }
 *
 * // With options
 * const result3 = safeStringToNumber("-45.67", {
 *   allowNegative: false,
 *   defaultValue: 0
 * });
 *
 * // With thousand separators
 * const result4 = safeStringToNumber("1,234.56", {
 *   allowThousandSeparators: true
 * });
 * ```
 */
export declare function safeStringToNumber(input: string | number | null | undefined, options?: SafeNumberOptions): SafeNumberResult;
/**
 * Simplified version that just returns the number or null
 *
 * @param input - The string or number to convert
 * @param options - Configuration options
 * @returns The converted number or null if conversion failed
 */
export declare function stringToNumberOrNull(input: string | number | null | undefined, options?: SafeNumberOptions): number | null;
/**
 * Version that returns a default value instead of null
 *
 * @param input - The string or number to convert
 * @param defaultValue - Value to return if conversion fails
 * @param options - Configuration options
 * @returns The converted number or the default value
 */
export declare function stringToNumberOrDefault(input: string | number | null | undefined, defaultValue: number, options?: SafeNumberOptions): number;
export {};
