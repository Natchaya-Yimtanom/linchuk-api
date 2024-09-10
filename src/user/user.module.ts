import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { T_USER } from './entity/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([T_USER]),
  ],
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule {}
