import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthLoginDTO } from './auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private  readonly authService: AuthService) {}

  @Post('login')
  async signIn(@Body() signInDto: AuthLoginDTO) {
    signInDto.validate();

    return this.authService.signIn(signInDto.cpf, signInDto.password);
  }
}
