export const Validate = <T>(validate: (obj: T) => void): MethodDecorator => {
  return (_, __, descriptor: TypedPropertyDescriptor<any>) => {
    const func = descriptor.value;

    descriptor.value = function () {
      return func.apply(this, arguments);
    };

    return descriptor;
  };
};
