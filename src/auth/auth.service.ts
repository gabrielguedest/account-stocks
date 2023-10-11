import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/services/user.service';
import { JwtAuthService } from '../jwt-auth/jwt-auth.service';
import { hashPassword } from '../utils';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtAuthService: JwtAuthService,
  ) {}

  async signIn(cpf: string, pwd: string) {
    const user = await this.userService.getUserByCpf(cpf);

    if (!user) {
      throw new UnauthorizedException();
    }

    const { pwdHash } = await hashPassword(pwd, user.salt);
    if (user?.password !== pwdHash) {
      throw new UnauthorizedException();
    }

    const token = await this.jwtAuthService.generateToken(user);

    return {
      access_token: token,
    };
  }
}
