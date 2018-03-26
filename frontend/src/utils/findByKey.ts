export const findByKey = <T, K extends keyof T>(key: K, object: T): T[K] => object[key];
