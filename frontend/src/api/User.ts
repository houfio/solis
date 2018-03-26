import { Identifiable } from './Identifiable';

export type User = Identifiable & {
  admin: boolean,
  membership: UserMembership,
  creation_date: string,
  receive_emails: boolean,
  contact_data: ContactData,
  tokens: Token[]
};

export type UserMembership = Identifiable & {
  name: string
};

export type ContactData = Identifiable & {
  first_name: string,
  last_name: string,
  email: string,
  phone_number: string,
  zip_code: string,
  house_number: string,
  birth_date: string
};

export type Token = Identifiable & {
  date: string,
  user_agent: string,
  ip_address: string
};
