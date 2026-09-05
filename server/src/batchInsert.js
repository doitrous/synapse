/** Splits `items` into arrays of at most `size`, for chunked multi-row INSERTs. */
export function chunk(items, size) {
  const batches = []
  for (let i = 0; i < items.length; i += size) batches.push(items.slice(i, i + size))
  return batches
}
