import { BadRequestException, HttpException, HttpStatus } from "@nestjs/common";

export class InvalidCPF extends BadRequestException {
  constructor() {
    super('CPF inválido');
  }
}

export class RequiredInput extends BadRequestException {
  constructor(field: string) {
    super(`O campo ${field} é obrigatório`);
  }
}

export class UserAlreadyExists extends HttpException {
  constructor() {
    super('Usuário já existe', HttpStatus.CONFLICT);
  }
}