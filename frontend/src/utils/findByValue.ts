export const findByValue = <T, K extends keyof T>(value: T[K], key: K, array: T[]): T | undefined => {
  for (const item of array) {
    if (item[key] === value) {
      return item;
    }
  }

  return;
};
