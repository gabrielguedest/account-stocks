export class UserPositionResponseDTO {
  checkingAccountAmount: number;
  positions: [{
    symbol: string;
    amount: number;
    currentPrice: number;
  }?];
  consolidated: number;
}