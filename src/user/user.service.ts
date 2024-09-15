import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { T_USER } from './entity/user.entity';
import { DeleteResult, Repository } from 'typeorm';
import { UserDto } from './dto/user.dto';
import { CreateUserDto } from './dto/create_user.dto';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(T_USER)
        private readonly userRepository: Repository<T_USER>,
    ) {}

    // async managerRegister(createUserDto: CreateUserDto) {
    //     const { email, password } = createUserDto;

    //     const existingUser = await this.userRepository.findOne({ where: { email } });
    //     if (existingUser) {
    //         throw new BadRequestException('มีอีเมลนี้ในระบบแล้ว');
    //     }

    //     const hashedPassword = await bcrypt.hash(password, 10);

    //     const newUser = {
    //         uuid: this.generateRandomString(10),
    //         firstname: createUserDto.firstname,
    //         lastname: createUserDto.lastname,
    //         email: email,
    //         password: hashedPassword,
    //         role: createUserDto.role,
    //         image: createUserDto.image,
    //         create_on: new Date(),
    //     };

    //     return this.userRepository.save(newUser); 
    // }

    async createEmployee(createUserDto: CreateUserDto[]) {
        const users = createUserDto.map(elm => {
            const user = this.userRepository.create(elm);
            user.uuid = this.generateRandomString(10);
            user.role = 'employee';
            user.create_on = new Date();
            return user;
        });

        return this.userRepository.save(users);
    }

    async employeeRegister(user: UserDto) {
        const employee = await this.findAll();
        let id = 0;

        employee.forEach(elm => {
            if(elm.uuid == user.uuid && elm.firstname == user.firstname && elm.lastname == user.lastname){
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

    async login(loginDto: LoginDto) {
        const allProfile = await this.userRepository.find();
        let profile: any;

        allProfile.forEach(elm => {
            if(elm.email == loginDto.email){
                profile = elm;
            }
        });

        if(profile != null){
            return bcrypt.compare(loginDto.password, profile.password);
        } else {
            throw new NotFoundException('ไม่พบบัญชีในระบบ');
        }
    }

    async forget(loginDto: LoginDto) {
        const allProfile = await this.userRepository.find();
        let profile: any;

        allProfile.forEach(elm => {
            if(elm.email == loginDto.email){
                profile = elm;
            }
        });

        if(profile != null){
            let status = {
                status: true,
                message: profile
            };
            
            return status;
        } else {
            throw new NotFoundException('ไม่พบบัญชีในระบบ');
        }
    }

    async newpass(loginDto: LoginDto) {
        const profile = await this.userRepository.findOne({ where: { user_id: loginDto.user_id } });

        profile.password = await bcrypt.hash(loginDto.password, 10);

        return await this.userRepository.update(loginDto.user_id, profile);
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
