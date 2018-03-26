export const handle = <T>(func: (arg: T) => void, arg: T) => () => func(arg);
