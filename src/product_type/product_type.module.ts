import { Module } from '@nestjs/common';
import { ProductTypeController } from './product_type.controller';
import { ProductTypeService } from './product_type.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { T_PRODUCT_TYPE } from './entity/product_type.entity';

@Module({
  imports: [TypeOrmModule.forFeature([T_PRODUCT_TYPE])],
  controllers: [ProductTypeController],
  providers: [ProductTypeService]
})
export class ProductTypeModule {}
