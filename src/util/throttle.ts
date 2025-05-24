export const debounce = <T extends (...args: any) => any>(fn: T, ms = 0) => {
  let t: ReturnType<typeof setTimeout> | undefined
  return (...args: Parameters<T>) => {
    clearTimeout(t)
    t = setTimeout(() => fn(...args), ms)
  }
}
