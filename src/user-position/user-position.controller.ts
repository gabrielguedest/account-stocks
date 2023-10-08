import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { UserPositionService } from './user-position.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { AuthReq } from 'src/auth-req';

@Controller('userPosition')
export class UserPositionController {
  constructor(
    private readonly userPositionService: UserPositionService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async getUserPosition(@Req() req: AuthReq) {
    return await this.userPositionService.getUserPosition(req.user.cpf);
  }
}
