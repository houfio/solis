import { hash } from 'bcrypt';
import { UserLogin } from './UserLogin';

export class UserRegister extends UserLogin {
  public membershipId!: number;

  public membershipSection!: string;

  public hash = async () => {
    return await hash(this.password, 10);
  }
}
