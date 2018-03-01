import { Identifiable } from '../api/Identifiable';

export const findById = <T extends Identifiable>(id: number, array: T[]): T | undefined => {
  for (let item of array) {
    if (item.id === id) {
      return item;
    }
  }

  return;
};
