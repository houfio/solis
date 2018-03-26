import { ActionReducers, CreateAction, Module, State } from '../types';

export const createModule =
  <T extends ActionReducers,
    M extends keyof State,
    S extends State[M]>(name: M,
                        initialState: State[M],
                        getActions: (createAction: CreateAction<S>) => T): Module<S, T> => ({
    name,
    initialState,
    ...getActions((type) => (getAction, reduce) => {
      type = `@@${name}/${type}`;

      const actionReducer: any = (payload?: any) => {
        return {
          type,
          ...getAction(payload) as any
        };
      };

      actionReducer.type = type;
      actionReducer.reduce = reduce;

      return actionReducer;
    }) as any
  });
