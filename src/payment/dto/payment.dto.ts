import { IsEmpty } from 'class-validator';

export class PaymentDto {
    @IsEmpty()
    receipt_id: number;

    @IsEmpty()
    total_price: number;

    @IsEmpty()
    pay_type: string;

    @IsEmpty()
    pay_img: string;

    @IsEmpty()
    cash_receive: number;

    @IsEmpty()
    cash_return: number;
  }