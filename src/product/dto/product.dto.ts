import { IsEmpty } from 'class-validator';

export class ProductDto {
    @IsEmpty()
    product_name: string;

    @IsEmpty()
    product_price: number;

    @IsEmpty()
    product_cost: number;

    @IsEmpty()
    product_quantity: number;

    @IsEmpty()
    product_type_id: number;

    @IsEmpty()
    product_image: string;

    @IsEmpty()
    order_date: Date;

    @IsEmpty()
    expire_date: Date;
  }