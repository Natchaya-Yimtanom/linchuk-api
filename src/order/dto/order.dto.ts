import { IsEmpty } from 'class-validator';

export class OrderDto {
    @IsEmpty()
    payment_id: number;
  }