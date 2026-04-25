/**
 * Normalize common Ecuador mobile inputs to E.164 digits (593XXXXXXXXX).
 * Returns null if the number does not look valid.
 */
export function normalizeEcuadorMobile(input: string): string | null {
  const digits = input.replace(/\D/g, '')
  if (!digits) return null

  if (digits.length === 12 && digits.startsWith('593')) {
    return digits
  }
  if (digits.length === 10 && digits.startsWith('09')) {
    return `593${digits.slice(1)}`
  }
  if (digits.length === 9 && digits.startsWith('9')) {
    return `593${digits}`
  }
  if (digits.length === 11 && digits.startsWith('5939')) {
    return digits
  }
  return null
}
