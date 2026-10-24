/**
 * Input validation and security helpers
 */

export function isValidEmail(email: string): boolean {
  if (!email || typeof email !== "string") return false;
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
  return emailRegex.test(email.trim()) && email.length <= 254;
}

export function validatePasswordStrength(password: string): { valid: boolean; message?: string } {
  if (!password || typeof password !== "string") {
    return { valid: false, message: "Password is required." };
  }
  if (password.length < 8) {
    return { valid: false, message: "Password must be at least 8 characters long." };
  }
  if (!/[A-Za-z]/.test(password) || !/[0-9]/.test(password)) {
    return { valid: false, message: "Password must contain at least one letter and one number." };
  }
  return { valid: true };
}

/**
 * Open Redirect Prevention
 * Ensures redirect URL is strictly an internal, relative path starting with '/'
 * Rejects absolute URLs, protocol-relative '//', javascript:, data:, and backslashes
 */
export function getSafeRedirectUrl(
  redirectUrl: string | null | undefined,
  defaultUrl = "/student-parent-payments"
): string {
  if (!redirectUrl || typeof redirectUrl !== "string") {
    return defaultUrl;
  }

  const trimmed = redirectUrl.trim();

  // Must begin with a single slash, not followed by another slash or backslash
  if (!trimmed.startsWith("/") || trimmed.startsWith("//") || trimmed.includes("\\")) {
    return defaultUrl;
  }

  // Reject URLs with embedded protocols
  if (trimmed.includes(":") || trimmed.includes("%3A") || trimmed.includes("%3a")) {
    return defaultUrl;
  }

  return trimmed;
}
