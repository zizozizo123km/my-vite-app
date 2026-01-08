const DEFAULT_LOCALE = 'en-US';
const DEFAULT_CURRENCY = 'USD';

/**
 * Formats a numeric value into a localized currency string using Intl.NumberFormat.
 * This utility ensures consistent, localized, and performant currency display across the application.
 *
 * @param {number | string} amount - The numeric value to format.
 * @param {string} [locale='en-US'] - The locale string (e.g., 'ar-SA', 'en-GB').
 * @param {string} [currency='USD'] - The ISO 4217 currency code (e.g., 'EUR', 'SAR', 'JOD').
 * @returns {string} The formatted currency string (e.g., "$1,234.56" or "1,234.56 ر.س").
 */
export const formatCurrency = (amount, locale = DEFAULT_LOCALE, currency = DEFAULT_CURRENCY) => {
  const numericAmount = Number(amount);

  if (isNaN(numericAmount) || amount === null || amount === undefined) {
    // In a production environment, we might log this error but return a safe default.
    // console.warn(`Invalid amount provided to formatCurrency: ${amount}`);
    return '';
  }

  try {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: currency,
      // Ensure standard currency display precision
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(numericAmount);
  } catch (error) {
    // Fallback mechanism if the locale or currency code is invalid or unsupported
    console.error(`Error formatting currency for locale ${locale} and currency ${currency}. Falling back to fixed format.`, error);
    return `${currency} ${numericAmount.toFixed(2)}`;
  }
};

/**
 * Example usage (optional, for documentation/testing purposes):
 *
 * console.log(formatCurrency(12345.67));             // "$12,345.67" (Default)
 * console.log(formatCurrency(12345.67, 'ar-SA', 'SAR')); // "١٢,٣٤٥.٦٧ ر.س"
 * console.log(formatCurrency(12345.67, 'en-GB', 'GBP')); // "£12,345.67"
 */