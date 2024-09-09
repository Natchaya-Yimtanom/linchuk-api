import { IsEmpty } from 'class-validator';

export class ProductType {
    @IsEmpty()
    product_type: string;
  }