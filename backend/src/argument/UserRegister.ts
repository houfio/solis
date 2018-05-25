import { UserLogin } from './UserLogin';

export type UserRegister = UserLogin & {
  membershipId: number,
  membershipSection: string
};
