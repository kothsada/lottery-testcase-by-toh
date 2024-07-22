export class SaleDetailResponseDto {
  billNumber: string;
  itemId: number;
  saleDigit: string;
  saleAmount: number;
}

export class SaleResponseDto {
  billNumber: string;
  barcode: string;
  billDate: string;
  billAmount: number;
  roundNo: string;
  saleDetails: SaleDetailResponseDto[];
}
