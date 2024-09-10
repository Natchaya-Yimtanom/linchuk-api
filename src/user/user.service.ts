import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { T_USER } from './entity/user.entity';
import { DeleteResult, Repository } from 'typeorm';
import { UserDto } from './dto/user.dto';
import { CreateUserDto } from './dto/create_user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(T_USER)
        private readonly userRepository: Repository<T_USER>,
    ) {}

    async managerRegister(createUserDto: CreateUserDto) {
        const { email, password } = createUserDto;

        const existingUser = await this.userRepository.findOne({ where: { email } });
        if (existingUser) {
            throw new BadRequestException('มีอีเมลนี้ในระบบแล้ว');
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = {
            uuid: this.generateRandomString(10),
            firstname: createUserDto.firstname,
            lastname: createUserDto.lastname,
            email: email,
            password: hashedPassword,
            role: createUserDto.role,
            image: createUserDto.image,
            create_on: new Date(),
        };

        return this.userRepository.save(newUser); 
    }

    async createEmployee(createUserDto: CreateUserDto) {
        const newUser = {
            uuid: this.generateRandomString(10),
            firstname: createUserDto.firstname,
            lastname: createUserDto.lastname,
            role: 'employee',
            create_on: new Date(),
        };

        return this.userRepository.save(newUser);
    }

    async employeeRegister(user: UserDto) {
        const employee = await this.findAll();
        let id = 0;

        employee.forEach(elm => {
            if(elm.uuid == user.uuid && elm.firstname == user.firstname && user.lastname == user.lastname){
                id = elm.user_id;
            }
        });

        if(id != 0){
            user.update_on = new Date();
            user.password = await bcrypt.hash(user.password, 10);

            return await this.userRepository.update(id, user);
        } else {
            throw new BadRequestException('ไม่มีรหัสพนักงานนี้ในระบบ');
        }
    }

    async findAll(): Promise<T_USER[]> {
        return await this.userRepository.find();
    }

    async findOne(id: number): Promise<T_USER> {
        return await this.userRepository.findOne({ where: { user_id: id } });
    }

    async update(id: number, user: UserDto) {
        user.update_on = new Date();
        return await this.userRepository.update(id, user);
    }

    async delete(id: number): Promise<DeleteResult> {
        return await this.userRepository.delete({ user_id: id });
    }

    generateRandomString(length: number): string {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        const charactersLength = characters.length;
    
        for (let i = 0; i < length; i++) {
          result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
    
        return result;
      }
}
