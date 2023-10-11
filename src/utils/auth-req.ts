export interface AuthReq extends Request {
  user: {
    cpf: string;
  };
}
