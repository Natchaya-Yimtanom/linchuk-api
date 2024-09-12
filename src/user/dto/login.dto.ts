import { IsEmpty } from 'class-validator';

export class LoginDto {
    @IsEmpty()
    user_id: number;

    @IsEmpty()
    email: string;

    @IsEmpty()
    password: string;
  }