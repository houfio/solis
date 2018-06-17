import { EntityManager, ObjectType } from 'typeorm';

export const updateOrder = async (
  entityManager: EntityManager,
  entity: ObjectType<{ order: number }>,
  current: number,
  updated: number
) => {
  const count = await entityManager.count(entity);

  updated = Math.max(0, Math.min(count - 1, updated));

  if (updated > current) {
    await entityManager.createQueryBuilder()
      .update(entity)
      .where('order > :old and order <= :new', { old: current, new: updated })
      .set({ order: () => '"order" - 1' })
      .execute();
  } else if (updated < current) {
    await entityManager.createQueryBuilder()
      .update(entity)
      .where('order < :old and order >= :new', { old: current, new: updated })
      .set({ order: () => '"order" + 1' })
      .execute();
  }
};
