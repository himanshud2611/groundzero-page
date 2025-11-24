// =============================================================================
// VALIDATION UTILITIES
// =============================================================================
// Shared validation functions used across API routes
// =============================================================================

/**
 * Validates email format using regex
 * @param email - Email string to validate
 * @returns true if valid, false otherwise
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validates URL format
 * @param url - URL string to validate
 * @returns true if valid, false otherwise
 */
export function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

/**
 * Normalizes email (lowercase and trim)
 * @param email - Email string to normalize
 * @returns Normalized email string
 */
export function normalizeEmail(email: string): string {
  return email.toLowerCase().trim();
}
