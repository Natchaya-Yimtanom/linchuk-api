import { IsEmail, IsEmpty, IsNotEmpty, MinLength } from 'class-validator';

export class CreateUserDto {
    @IsEmpty()
    uuid: string;

    @IsEmpty()
    firstname: string;

    @IsEmpty()
    lastname: string;

    @IsEmpty()
    @IsEmail()
    email: string;

    @IsEmpty()
    @MinLength(6)
    password: string;

    @IsEmpty()
    role: string;

    @IsEmpty()
    image: string;

    @IsEmpty()
    create_on: Date;
  }