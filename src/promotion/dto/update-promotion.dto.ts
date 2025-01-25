import { PartialType } from '@nestjs/mapped-types';
import { CreatePromotionDto } from './create-promotion.dto';
import { IsEmpty } from 'class-validator';

export class UpdatePromotionDto extends PartialType(CreatePromotionDto) {
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
