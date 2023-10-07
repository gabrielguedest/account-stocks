export interface UserModel {
  id: string;
  name: string;
  cpf: string;
  password: string;
  salt: string,
  createdAt: Date;
  updatedAt: Date;
}