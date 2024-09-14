import { IsEmpty } from 'class-validator';

export class OrderDetailDto {
    @IsEmpty()
    order_id: number;

    @IsEmpty()
    product_id: number;

    @IsEmpty()
    sweet_id: number;

    @IsEmpty()
    quantity: number;
  }