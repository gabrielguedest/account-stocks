import { Injectable, PipeTransform } from '@nestjs/common';
import { CreateUserDTO } from './user.dto';
import { InvalidCPF, RequiredInput } from '../../exceptions';

@Injectable()
export class ValidateCreateUserDTO implements PipeTransform {
  transform(value: CreateUserDTO) {
    if (!value.name) {
      throw new RequiredInput('name');
    }

    if (!value.cpf) {
      throw new RequiredInput('cpf');
    }

    if (!value.password) {
      throw new RequiredInput('password');
    }

    // we should have a better cpf validation here, this is just a simple example
    const cpfReg = new RegExp('^[0-9]+$');
    if (!cpfReg.test(value.cpf) || value.cpf.length !== 11) {
      throw new InvalidCPF();
    }

    return value;
  }
}
