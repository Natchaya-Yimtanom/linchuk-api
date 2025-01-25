import { PartialType } from '@nestjs/mapped-types';
import { CreateIngredientDto } from './create-ingredient.dto';
import { IsEmpty } from 'class-validator';

export class UpdateIngredientDto extends PartialType(CreateIngredientDto) {
    @IsEmpty()
    ingredients_type: string;

    @IsEmpty()
    ingredients_name: string;

    @IsEmpty()
    unit_id: number;

    @IsEmpty()
    unit_name: string;

    @IsEmpty()
    order_amount: number;

    @IsEmpty()
    remain: number;
}
