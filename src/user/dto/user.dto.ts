import { IsEmpty } from 'class-validator';

export class UserDto {
    @IsEmpty()
    uuid: string;

    @IsEmpty()
    firstname: string;

    @IsEmpty()
    lastname: string;

    @IsEmpty()
    email: string;

    @IsEmpty()
    password: string;

    @IsEmpty()
    role: string;

    @IsEmpty()
    image: string;

    @IsEmpty()
    create_on: Date;

    @IsEmpty()
    update_on: Date;

    @IsEmpty()
    last_login: Date;
  }