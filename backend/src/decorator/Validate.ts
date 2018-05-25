import { isUUID } from 'validator';

export const Validate = <T extends any>(validate?: (obj: T) => boolean): MethodDecorator => {
  return (_, __, descriptor: TypedPropertyDescriptor<any>) => {
    const func = descriptor.value;

    descriptor.value = function(obj: T) {
      if ((obj.id && !isUUID(obj.id, 4)) || (validate && !validate(obj))) {
        throw new Error('Invalid parameters');
      }

      return func.apply(this, arguments);
    };

    return descriptor;
  };
};
