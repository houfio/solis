import { ContainerInstance } from 'typedi';

import { User } from '../entity/User';

export const Authenticated = (admin: boolean, fail: any = null): MethodDecorator => {
  return (_, __, descriptor: TypedPropertyDescriptor<any>) => {
    const func = descriptor.value;

    descriptor.value = function(_: any, context: { container: ContainerInstance }) {
      const currentUser = context.container.get(User);

      if (!currentUser || (admin && !currentUser.admin)) {
        if (typeof fail === 'function') {
          fail = fail();
        }

        return fail;
      }

      return func.apply(this, arguments);
    };

    return descriptor;
  };
};
