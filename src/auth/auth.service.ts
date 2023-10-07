import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/services/user.service';
import { JwtService } from '@nestjs/jwt';
import { JwtAuthService } from 'src/jwt-auth/jwt-auth.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtAuthService: JwtAuthService,
  ) {}

  async signIn(cpf: string, pwd: string) {
    const user = await this.userService.getUserByCpf(cpf);

    //TODO: verify with hashed + salted password check password
    if (user?.password != pwd) {
      throw new UnauthorizedException();
    }

    const token = await this.jwtAuthService.generateToken(user);

    return {
      access_token: token,
    }
  }
}
