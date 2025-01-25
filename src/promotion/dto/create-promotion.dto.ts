import { isEmpty, IsEmpty } from 'class-validator';

export class CreatePromotionDto {
    @IsEmpty()
    promotion_name: string;

    @IsEmpty()
    discount_amount: number;

    @IsEmpty()
    start_date: Date;

    @IsEmpty()
    end_date: Date;

    @IsEmpty()
    product_id: number;
  }