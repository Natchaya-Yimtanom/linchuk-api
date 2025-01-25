import { IsEmpty } from "class-validator";

export class CreateIngredientDto {
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

    @IsEmpty()
    lot_number: string;

    @IsEmpty()
    order_date: Date;

    @IsEmpty()
    expire_date: Date;
  }