import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthLoginDTO } from './auth.dto';
import { ValidateAuthLoginDTO } from './auth-dto.pipe';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async signIn(@Body(ValidateAuthLoginDTO) signInDto: AuthLoginDTO) {
    return this.authService.signIn(signInDto.cpf, signInDto.password);
  }
}
