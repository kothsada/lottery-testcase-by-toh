import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateSaleDto } from './dto/create-sale.dto';
import {
  SaleResponseDto,
  SaleDetailResponseDto,
} from './dto/sale-response.dto';
import { UniqueConstraintViolationException } from '../common/exceptions/unique-constraint-violation.exception';
import { Prisma } from '@prisma/client';

@Injectable()
export class LotteryService {
  constructor(private prisma: PrismaService) {}

  async createSale(createSaleDto: CreateSaleDto): Promise<SaleResponseDto> {
    const { powerBall, mobileNo, clientrefno, saleDetails } = createSaleDto;

    try {
      const sale = await this.prisma.sale.create({
        data: {
          powerBall,
          mobileNo,
          clientrefno,
          billNumber: this.generateBillNumber(),
          barcode: this.generateBarcode(),
          billDate: new Date(),
          billAmount: saleDetails.reduce(
            (total, detail) => total + detail.saleAmount,
            0,
          ),
          roundNo: this.generateRoundNo(),
          saleDetails: {
            create: saleDetails.map((detail) => ({
              billNumber: detail.billNumber,
              itemId: detail.itemId,
              saleDigit: detail.saleDigit,
              saleAmount: detail.saleAmount,
            })),
          },
        },
        include: {
          saleDetails: true,
        },
      });

      return this.formatResponse(sale);
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new UniqueConstraintViolationException(
            'clientrefno|create order lottery',
          );
        }
      }
      throw new InternalServerErrorException('An unexpected error occurred');
    }
  }

  private generateBillNumber(): string {
    return Math.floor(Math.random() * 10000000000000)
      .toString()
      .padStart(14, '0');
  }

  private generateBarcode(): string {
    return Math.random().toString(36).substring(2, 15);
  }

  private generateRoundNo(): string {
    const now = new Date();
    return `${now.getFullYear()}${(now.getMonth() + 1).toString().padStart(2, '0')}`;
  }

  private formatResponse(sale: any): SaleResponseDto {
    return {
      billNumber: sale.billNumber,
      barcode: sale.barcode,
      billDate: sale.billDate.toLocaleDateString('en-GB'),
      billAmount: sale.billAmount,
      roundNo: sale.roundNo,
      saleDetails: this.formatSaleDetails(sale.saleDetails),
    };
  }

  private formatSaleDetails(saleDetails: any[]): SaleDetailResponseDto[] {
    return saleDetails.map((detail) => ({
      billNumber: detail.billNumber,
      itemId: detail.itemId,
      saleDigit: detail.saleDigit,
      saleAmount: detail.saleAmount,
    }));
  }
}
