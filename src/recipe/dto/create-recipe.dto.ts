import { IsEmpty } from 'class-validator';

export class CreateRecipeDto {
    @IsEmpty()
    product_id: number;

    @IsEmpty()
    product_name: string;

    @IsEmpty()
    ingredients_id: number;

    @IsEmpty()
    ingredients_name: string;

    @IsEmpty()
    amount: number;

    @IsEmpty()
    unit_id: number;

    @IsEmpty()
    unit: string;
  }