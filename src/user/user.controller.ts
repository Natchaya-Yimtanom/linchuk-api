import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { T_USER } from './entity/user.entity';
import { UserDto } from './dto/user.dto';
import { CreateUserDto } from './dto/create_user.dto';
import { LoginDto } from './dto/login.dto';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    // @Post('manager/register')
    // async managerRegister(
    //     @Body() createUserDto: CreateUserDto
    // ){
    //     return await this.userService.managerRegister(createUserDto);
    // }

    @Post('manager/add')
    async createEmployee(
        @Body() createUserDto: CreateUserDto[]
    ){
        return await this.userService.createEmployee(createUserDto);
    }

    @Post('employee/register')
    async employeeRegister(
        @Body() userDto: UserDto
    ){
        return await this.userService.employeeRegister(userDto);
    }

    @Post('login')
    async login(
        @Body() loginDto: LoginDto
    ){
        return await this.userService.login(loginDto);
    }

    @Post('forget')
    async forget(
        @Body() loginDto: LoginDto
    ){
        return await this.userService.forget(loginDto);
    }

    @Post('newpass')
    async newpass(
        @Body() loginDto: LoginDto
    ){
        return await this.userService.newpass(loginDto);
    }

    @Get() // GET /user
    async getProduct(): Promise<T_USER[]> {
        return await this.userService.findAll();
    }

    @Get(':id') // GET /user/123
    async findProduct(@Param('id') id: number): Promise<T_USER> {
        return await this.userService.findOne(id);
    }

    @Post(':id') // POST /user/123
    async updateProduct(
        @Param('id') id: number,
        @Body() userDto: UserDto
    ){
        return await this.userService.update(id, userDto);
    }

    @Delete(':id')  // DELETE /user/123
    async deleteProduct(@Param('id') id: number): Promise<any> {
        await this.userService.delete(id);
        return { success: true };
    }

}
