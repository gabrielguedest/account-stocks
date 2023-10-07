import { RequiredInput } from "src/exceptions";

export class AuthLoginDTO {
  readonly cpf: string;
  readonly password: string;

  validate() {
    if (!this.cpf) {
      throw new RequiredInput('cpf');
    }

    if (!this.password) {
      throw new RequiredInput('password');
    }
  }
}