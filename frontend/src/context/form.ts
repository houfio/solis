import { createContext } from '../utils/createContext';

type State = {
  fields: Field[]
};

type Field = {
  name: string,
  initial: any,
  current: any
};

export const {
  Provider: FormProvider,
  Consumer: FormConsumer,
  actions: formActions
} = createContext<State>({
  fields: []
})({
  registerField: (name: string, initial: any) => ({ fields }) => ({
    fields: [
      ...fields,
      {
        name,
        initial,
        current: initial
      }
    ]
  }),
  unregisterField: (name: string) => ({ fields }) => ({
    fields: fields.filter((field) => field.name !== name)
  }),
  changeField: (name: string, value: any) => ({ fields }) => ({
    fields: fields.map((field) => {
      if (field.name !== name) {
        return field;
      }

      return {
        ...field,
        current: value
      };
    })
  })
});
