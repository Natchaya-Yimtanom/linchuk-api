import { Module } from '@nestjs/common';
import { SweetController } from './sweet.controller';
import { SweetService } from './sweet.service';
import { T_SWEET } from './entity/sweet.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([T_SWEET])],
  controllers: [SweetController],
  providers: [SweetService]
})
export class SweetModule {}
