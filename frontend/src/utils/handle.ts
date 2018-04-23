export const handle = <T>(
  func: (arg: T) => void, arg: T | (() => T)
) => () => func(typeof arg === 'function' ? arg() : arg);
