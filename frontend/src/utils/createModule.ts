import { Actions, CreateAction, Module, State } from '../types';

export const createModule = <N extends keyof State, A extends Actions>(
  name: N,
  initialState: State[N],
  getAction: (createAction: CreateAction<State[N]>) => A): Module<N, A> => {
  let reducers = {};
  const actions = getAction(type => (map, reduce) => {
    type = `@@${name}/${type}`;
    reducers = {
      ...reducers,
      [type]: reduce
    };

    return payload => ({
      type,
      ...map(payload!) as any
    })
  });

  return {
    name,
    initialState,
    reducers,
    ...actions as any
  }
};
