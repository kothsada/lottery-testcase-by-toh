import {
  IsNumber,
  IsString,
  IsArray,
  ValidateNested,
  ArrayMinSize,
} from 'class-validator';
import { Type } from 'class-transformer';

class SaleDetailDto {
  @IsString()
  billNumber: string;

  @IsNumber()
  itemId: number;

  @IsString()
  saleDigit: string;

  @IsNumber()
  saleAmount: number;
}

export class CreateSaleDto {
  @IsNumber()
  powerBall: number;

  @IsString()
  mobileNo: string;

  @IsString()
  clientrefno: string;

  @IsArray()
  @ValidateNested({ each: true })
  @ArrayMinSize(1)
  @Type(() => SaleDetailDto)
  saleDetails: SaleDetailDto[];
}
