/**
 * A route error worth showing the caller, as opposed to one that just
 * happened. Most routes already return `{ error, status }` objects for
 * expected failures — validation, quota, "not configured" — and that pattern
 * stays untouched. This is for the smaller set of cases that need to *throw*
 * (deep inside a helper, past several call frames) without `wrap`'s catch-all
 * turning them into a leaked exception message.
 */
export class ApiError extends Error {
  constructor(status, code, publicMessage) {
    super(publicMessage || code)
    this.name = 'ApiError'
    this.status = status
    this.code = code
    this.publicMessage = publicMessage || code
  }
}
