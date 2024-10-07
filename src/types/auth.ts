export interface User {
  _id?:string;
  name: string;
  phone: string;
  email: string;
  password?: string;
  phoneVerified?: boolean;
  emailVerified?: boolean;
}
