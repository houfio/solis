import { compare } from 'bcrypt';
import { IsEmail, MinLength } from 'class-validator';

export class UserLogin {
  @IsEmail()
  public email!: string;

  @MinLength(8)
  public password!: string;

  public check = async (hash: string) => {
    return await compare(this.password, hash);
  }
}
