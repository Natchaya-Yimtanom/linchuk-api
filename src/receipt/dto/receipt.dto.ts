import { IsEmpty } from 'class-validator';

export class ReceiptDto {
    @IsEmpty()
    user_id: number;

    @IsEmpty()
    create_on: Date;
  }