import { EntityManager, LessThan, Not, ObjectType } from 'typeorm';

export const incrementOrder = async (
  entityManager: EntityManager,
  entity: ObjectType<{ order: number }>,
  order: number
) => {
  await entityManager.increment(entity, { order: Not(LessThan(order)) }, 'order', 1);
};
