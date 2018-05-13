import { validate } from 'class-validator';

const errorMessages: { [ type: string ]: string } = {
  isEmail: 'is geen geldig e-mail adres'
};

export const Validate = <T>(type: { new(): T }): MethodDecorator => {
  return (_, __, descriptor: TypedPropertyDescriptor<any>) => {
    const func = descriptor.value;

    descriptor.value = async function(obj: T, context: object, info: object) {
      const cls = Object.assign(new type(), obj);
      const errors = await validate(cls);

      if (errors.length) {
        const error = errors[ 0 ];
        const constraint = Object.keys(error.constraints)[ 0 ];
        const message = errorMessages[ constraint ];

        throw new Error(message);
      }

      return func.apply(this, [ cls, context, info ]);
    };

    return descriptor;
  };
};
