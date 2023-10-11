export class UserPositionResponseDTO {
  checkingAccountAmount: number;
  positions: Array<{
    symbol: string;
    amount: number;
    currentPrice: number;
  }>;
  consolidated: number;
}
