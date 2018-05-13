import { ContainerInstance, Inject } from 'typedi';
import { EntityManager } from 'typeorm';
import { Controller, CurrentRequest, Mutation, Query } from 'vesper';

import { Identifier } from '../argument/Identifier';
import { UserLogin } from '../argument/UserLogin';
import { UserRegister } from '../argument/UserRegister';
import { Admin } from '../decorator/Admin';
import { Validate } from '../decorator/Validate';
import { Token } from '../entity/Token';
import { User } from '../entity/User';

@Controller()
export class UserController {
  @Inject()
  private entityManager!: EntityManager;

  @Inject()
  private currentUser?: User;

  @Query()
  public async user() {
    return this.currentUser;
  }

  @Mutation()
  @Validate(UserLogin)
  public async login({ email, check }: UserLogin, context: { container: ContainerInstance }) {
    const user = await this.entityManager.findOneOrFail(User, { email, deleted: false });

    if (user.deleted || !user.approved || !await check(user.password)) {
      throw new Error('Ongeldige inloggegevens');
    }

    const request = context.container.get(CurrentRequest);
    const userAgent = request.headers[ 'user-agent' ];

    let ip = request.headers[ 'x-forwarded-for' ];

    if (typeof userAgent !== 'string' || (typeof ip !== 'string' && !(ip = request.connection.remoteAddress))) {
      throw new Error();
    }

    const token = new Token();
    token.user = Promise.resolve(user);
    token.creationDate = new Date();
    token.userAgent = userAgent;
    token.ipAddress = ip;

    return this.entityManager.save(token);
  }

  @Mutation()
  @Validate(UserRegister)
  public async register(args: UserRegister) {
    const user = new User();
    user.membershipId = args.membershipId;
    user.membershipSection = args.membershipSection;
    user.email = args.email;
    user.password = await args.hash();
    user.creationDate = new Date();

    return this.entityManager.save(user);
  }

  @Mutation()
  @Validate(Identifier)
  @Admin(false)
  public async approveUser({ id }: Identifier) {
    await this.entityManager.update(User, id, {
      approved: true
    });

    return true;
  }

  @Mutation()
  @Validate(Identifier)
  @Admin(false)
  public async deleteUser({ id }: Identifier) {
    const user = await this.entityManager.findOneOrFail(User, id);

    for (const token of await user.tokens) {
      token.active = false;

      await this.entityManager.save(token);
    }

    user.deleted = true;

    await this.entityManager.save(user);

    return true;
  }
}
