import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { T_PRODUCT } from './entity/product.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([T_PRODUCT])],
  controllers: [ProductController],
  providers: [ProductService]
})
export class ProductModule {}
