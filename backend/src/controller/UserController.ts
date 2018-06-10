import { compare, hash } from 'bcrypt';
import { ContainerInstance, Inject } from 'typedi';
import { EntityManager } from 'typeorm';
import { isEmail, isLength } from 'validator';
import { Controller, CurrentRequest, Mutation, Query } from 'vesper';

import { Identifier } from '../argument/Identifier';
import { UserLogin } from '../argument/UserLogin';
import { UserRegister } from '../argument/UserRegister';
import { Authenticated } from '../decorator/Authenticated';
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
  @Validate<UserRegister>((obj) => {
    return isEmail(obj.email) && isLength(obj.password, 8);
  })
  public async createUser(args: UserRegister) {
    const user = new User();
    user.membershipId = args.membershipId;
    user.membershipSection = args.membershipSection;
    user.email = args.email;
    user.password = await hash(args.password, 10);
    user.creationDate = new Date();

    return this.entityManager.save(user);
  }

  @Mutation()
  @Validate(undefined, false)
  @Authenticated(false)
  public async deleteUser({ id }: Identifier) {
    const user = await this.entityManager.findOne(User, id);

    if (!user) {
      return false;
    }

    for (const token of await user.tokens) {
      token.deleted = true;

      await this.entityManager.save(token);
    }

    user.deleted = true;

    await this.entityManager.save(user);

    return true;
  }

  @Mutation()
  @Validate<UserLogin>((obj) => {
    return isEmail(obj.email) && isLength(obj.password, 8);
  })
  public async createToken(args: UserLogin, context: { container: ContainerInstance }) {
    const user = await this.entityManager.findOne(User, { email: args.email, deleted: false });

    if (!user || user.deleted || !user.approved || !await compare(args.password, user.password)) {
      return null;
    }

    const request = context.container.get(CurrentRequest);
    const userAgent = request.headers[ 'user-agent' ];

    let ip = request.headers[ 'x-forwarded-for' ];

    if (typeof userAgent !== 'string' || (typeof ip !== 'string' && !(ip = request.connection.remoteAddress))) {
      return null;
    }

    const token = new Token();
    token.user = Promise.resolve(user);
    token.creationDate = new Date();
    token.userAgent = userAgent;
    token.ipAddress = ip;

    return this.entityManager.save(token);
  }

  @Mutation()
  @Validate(undefined, false)
  @Authenticated(false)
  public async deleteToken({ id }: Identifier) {
    await this.entityManager.update(Token, { id, user: Promise.resolve(this.currentUser) }, {
      deleted: true
    });

    return true;
  }
}
