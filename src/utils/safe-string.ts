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
export function safeStringToNumber(
  input: string | number | null | undefined,
  options: SafeNumberOptions = {}
): SafeNumberResult {
  const {
    allowDecimals = true,
    allowNegative = true,
    min,
    max,
    defaultValue,
    allowScientific = true,
    allowWhitespace = true,
    allowThousandSeparators = false
  } = options;

  // Handle null/undefined input
  if (input === null || input === undefined) {
    return {
      value: defaultValue ?? null,
      success: false,
      error: "Input is null or undefined",
      input: String(input)
    };
  }

  // Handle number input - validate and return if it's already a valid number
  if (typeof input === 'number') {
    // Check for NaN
    if (isNaN(input)) {
      return {
        value: defaultValue ?? null,
        success: false,
        error: "Input number is NaN",
        input: String(input)
      };
    }

    // Check for Infinity
    if (!isFinite(input)) {
      return {
        value: defaultValue ?? null,
        success: false,
        error: "Input number is Infinity",
        input: String(input)
      };
    }

    // Check decimal restriction
    if (!allowDecimals && input % 1 !== 0) {
      return {
        value: defaultValue ?? null,
        success: false,
        error: "Decimal numbers not allowed",
        input: String(input)
      };
    }

    // Check negative restriction
    if (!allowNegative && input < 0) {
      return {
        value: defaultValue ?? null,
        success: false,
        error: "Negative numbers not allowed",
        input: String(input)
      };
    }

    // Check min/max bounds
    if (min !== undefined && input < min) {
      return {
        value: defaultValue ?? null,
        success: false,
        error: `Value ${input} is below minimum ${min}`,
        input: String(input)
      };
    }

    if (max !== undefined && input > max) {
      return {
        value: defaultValue ?? null,
        success: false,
        error: `Value ${input} is above maximum ${max}`,
        input: String(input)
      };
    }

    // Number input is valid
    return {
      value: input,
      success: true,
      input: String(input)
    };
  }

  // Handle non-string, non-number input
  if (typeof input !== 'string') {
    return {
      value: defaultValue ?? null,
      success: false,
      error: `Input type '${typeof input}' is not supported`,
      input: String(input)
    };
  }

  let processedInput = input;

  // Handle whitespace
  if (allowWhitespace) {
    processedInput = processedInput.trim();
  } else if (/^\s|\s$/.test(processedInput)) {
    return {
      value: defaultValue ?? null,
      success: false,
      error: "Leading or trailing whitespace not allowed",
      input
    };
  }

  // Handle empty string
  if (processedInput === '') {
    return {
      value: defaultValue ?? null,
      success: false,
      error: "Empty string",
      input
    };
  }

  // Handle thousand separators
  if (allowThousandSeparators) {
    // Remove thousand separators (commas) but validate format first
    const thousandSeparatorRegex = /^-?(\d{1,3}(,\d{3})*(\.\d+)?|\d+(\.\d+)?)([eE][+-]?\d+)?$/;
    if (processedInput.includes(',')) {
      if (!thousandSeparatorRegex.test(processedInput)) {
        return {
          value: defaultValue ?? null,
          success: false,
          error: "Invalid thousand separator format",
          input
        };
      }
      processedInput = processedInput.replace(/,/g, '');
    }
  } else if (processedInput.includes(',')) {
    return {
      value: defaultValue ?? null,
      success: false,
      error: "Thousand separators not allowed",
      input
    };
  }

  // Check for negative numbers
  if (!allowNegative && processedInput.startsWith('-')) {
    return {
      value: defaultValue ?? null,
      success: false,
      error: "Negative numbers not allowed",
      input
    };
  }

  // Check for scientific notation
  if (!allowScientific && /[eE]/.test(processedInput)) {
    return {
      value: defaultValue ?? null,
      success: false,
      error: "Scientific notation not allowed",
      input
    };
  }

  // Check for decimal places
  if (!allowDecimals && processedInput.includes('.')) {
    return {
      value: defaultValue ?? null,
      success: false,
      error: "Decimal numbers not allowed",
      input
    };
  }

  // Additional format validation
  const numberRegex = allowScientific
    ? /^-?(\d+\.?\d*|\.\d+)([eE][+-]?\d+)?$/
    : /^-?(\d+\.?\d*|\.\d+)$/;

  if (!numberRegex.test(processedInput)) {
    return {
      value: defaultValue ?? null,
      success: false,
      error: "Invalid number format",
      input
    };
  }

  // Convert to number
  const numValue = Number(processedInput);

  // Check if conversion resulted in NaN
  if (isNaN(numValue)) {
    return {
      value: defaultValue ?? null,
      success: false,
      error: "Conversion resulted in NaN",
      input
    };
  }

  // Check if conversion resulted in Infinity
  if (!isFinite(numValue)) {
    return {
      value: defaultValue ?? null,
      success: false,
      error: "Conversion resulted in Infinity",
      input
    };
  }

  // Check min/max bounds
  if (min !== undefined && numValue < min) {
    return {
      value: defaultValue ?? null,
      success: false,
      error: `Value ${numValue} is below minimum ${min}`,
      input
    };
  }

  if (max !== undefined && numValue > max) {
    return {
      value: defaultValue ?? null,
      success: false,
      error: `Value ${numValue} is above maximum ${max}`,
      input
    };
  }

  // Success!
  return {
    value: numValue,
    success: true,
    input
  };
}

/**
 * Simplified version that just returns the number or null
 * 
 * @param input - The string or number to convert
 * @param options - Configuration options
 * @returns The converted number or null if conversion failed
 */
export function stringToNumberOrNull(
  input: string | number | null | undefined,
  options: SafeNumberOptions = {}
): number | null {
  const result = safeStringToNumber(input, options);
  return result.value;
}

/**
 * Version that returns a default value instead of null
 * 
 * @param input - The string or number to convert
 * @param defaultValue - Value to return if conversion fails
 * @param options - Configuration options
 * @returns The converted number or the default value
 */
export function stringToNumberOrDefault(
  input: string | number | null | undefined,
  defaultValue: number,
  options: SafeNumberOptions = {}
): number {
  const result = safeStringToNumber(input, { ...options, defaultValue });
  return result.value ?? defaultValue;
}