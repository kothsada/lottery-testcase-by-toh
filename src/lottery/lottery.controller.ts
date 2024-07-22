import { Controller, Post, Body, UseInterceptors } from '@nestjs/common';
import { LotteryService } from './lottery.service';
import { CreateSaleDto } from './dto/create-sale.dto';
import { SaleResponseDto } from './dto/sale-response.dto';
import { TimezoneInterceptor } from 'src/interceptors/timezone.interceptor';

@Controller('lottery')
export class LotteryController {
  constructor(private readonly lotteryService: LotteryService) {}

  @Post('sale')
  @UseInterceptors(TimezoneInterceptor)
  async createSale(
    @Body() createSaleDto: CreateSaleDto,
  ): Promise<SaleResponseDto> {
    return this.lotteryService.createSale(createSaleDto);
  }
}
