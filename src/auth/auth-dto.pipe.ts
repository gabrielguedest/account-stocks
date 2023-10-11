import { Injectable, PipeTransform } from '@nestjs/common';
import { RequiredInput } from '../utils/exceptions';
import { AuthLoginDTO } from './auth.dto';

@Injectable()
export class ValidateAuthLoginDTO implements PipeTransform {
  transform(value: AuthLoginDTO) {
    if (!value.cpf) {
      throw new RequiredInput('cpf');
    }

    if (!value.password) {
      throw new RequiredInput('password');
    }

    return value;
  }
}
