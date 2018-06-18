import { isUUID } from 'validator';

export const Validate = <T extends any>(validate?: (obj: T) => boolean, fail: any = null): MethodDecorator => {
  return (_, __, descriptor: TypedPropertyDescriptor<any>) => {
    const func = descriptor.value;

    descriptor.value = function(obj: T) {
      if ((obj.id && !isUUID(obj.id, 4)) || (validate && !validate(obj))) {
        return fail;
      }

      return func.apply(this, arguments);
    };

    return descriptor;
  };
};
