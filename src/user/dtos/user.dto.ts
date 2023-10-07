import { InvalidCPF, RequiredInput } from "../../exceptions";

export class CreateUserDTO {
  readonly name: string;
  readonly cpf: string;
  readonly password: string;

  validate() {
    if (!this.name) {
      throw new RequiredInput('name');
    }

    if (!this.cpf) {
      throw new RequiredInput('cpf');
    }

    if (!this.password) {
      throw new RequiredInput('password');
    }

    // we should have a better cpf validation here, this is just a simple example
    const cpfReg = new RegExp('^\d+$');
    if (!cpfReg.test(this.cpf) || this.cpf.length !== 11) {
      throw new InvalidCPF();
    }
  }
}