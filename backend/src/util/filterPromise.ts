export function filterPromise<E, I>(
  entities: E | E[],
  get: (entity: E) => Promise<I[]>,
  check: (item: I) => boolean
): Promise<I[]> | Array<Promise<I[]>> {
  async function filter(entity: E): Promise<I[]> {
    const items = await get(entity);

    return items.filter(check);
  }

  if (entities instanceof Array) {
    return entities.map(filter);
  }

  return filter(entities);
}
