export const findByIndex = <T>(
  index: number,
  object: { [key: string]: T }): [string, T] => {
  const keys = Object.keys(object);

  if (index >= keys.length) {
    index = 0;
  }

  const key = keys[index];
  const value = object[key];

  return [key, value];
};
