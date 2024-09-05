export interface User {
  id: number;
  firstName: string;
  lastName: string;
  userName: string;
  password: string | '';
  role: number;
  contact: string;
  birthDate: string;
}
