import { Controller, Post, UseGuards, Req, Body } from '@nestjs/common';
import { AuthReq } from '../utils/auth-req';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { OrderStockDTO } from './user-stocks.dto';
import { ValidateOrderStockDTO } from './user-stocks-dto.pipe';
import { UserStocksService } from './user-stocks.service';

@Controller('user-stocks')
export class UserStocksController {
  constructor(private readonly userStocksService: UserStocksService) {}

  @UseGuards(JwtAuthGuard)
  @Post('order')
  async buyStocks(
    @Req() req: AuthReq,
    @Body(ValidateOrderStockDTO) body: OrderStockDTO,
  ) {
    return await this.userStocksService.buyStocks(
      req.user.cpf,
      body.symbol,
      body.amount,
    );
  }
}
