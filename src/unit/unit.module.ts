import { Module } from '@nestjs/common';
import { UnitService } from './unit.service';
import { UnitController } from './unit.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { C_UNIT } from './entities/unit.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([C_UNIT]),
  ],
  controllers: [UnitController],
  providers: [UnitService],
  exports: [
    UnitService,
    TypeOrmModule
  ]
})
export class UnitModule {}
