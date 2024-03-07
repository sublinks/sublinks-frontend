const abbreviations = ['k', 'm', 'b', 't']

export function compactNumber(number?: number): string {
  if (!number) return '0'

  for (let i = abbreviations.length - 1; i >= 0; i--) {
    const size = Math.pow(10, (i + 1) * 3)

    if (size <= number) {
      const localNum = number / size

      const roundedNum = roundTo(
        localNum,
        localNum > 100 ? 0 : localNum > 10 ? 1 : 2
      )

      return `${roundedNum}${abbreviations[i]}`
    }
  }

  return number.toString()
}

export function roundTo(number?: number, digits?: number) {
  if (!number) return 0
  if (digits == undefined) return number

  const base = 10 ** digits

  return Math.round(number * base) / base
}