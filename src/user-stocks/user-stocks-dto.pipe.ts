import { Injectable, PipeTransform } from "@nestjs/common";
import { InvalidStockAmount, RequiredInput } from "src/exceptions";
import { OrderStockDTO } from "./user-stocks.dto";

@Injectable()
export class ValidateOrderStockDTO implements PipeTransform {
  transform(value: OrderStockDTO) {
    if (!value.symbol) {
      throw new RequiredInput('cpf');
    }
    
    if (!value.amount) {
      throw new RequiredInput('password');
    }

    if (value.amount < 1) {
      throw new InvalidStockAmount();
    }

    return value
  }
}