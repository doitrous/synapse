export function toMariaDbDate(value) {
  const date = value instanceof Date ? value : new Date(value || Date.now())
  return Number.isNaN(date.getTime()) ? new Date() : date
}
