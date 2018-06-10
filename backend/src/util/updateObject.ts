export const updateObject = <T>(object: T, update: Partial<T>) => {
  Object.entries(update).forEach(([ key, value ]) => {
    (object as any)[key] = value;
  });

  return object;
};
