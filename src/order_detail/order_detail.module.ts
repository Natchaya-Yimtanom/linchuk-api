import { Module } from '@nestjs/common';
import { OrderDetailController } from './order_detail.controller';
import { OrderDetailService } from './order_detail.service';
import { T_ORDER_DETAIL } from './entity/order_detail.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductModule } from 'src/product/product.module';
import { IngredientsModule } from 'src/ingredients/ingredients.module';
import { RecipeModule } from 'src/recipe/recipe.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([T_ORDER_DETAIL]),
    ProductModule,
    IngredientsModule,
    RecipeModule
  ],
  controllers: [OrderDetailController],
  providers: [OrderDetailService],
  exports: [
    OrderDetailService,
    TypeOrmModule
  ]
})
export class OrderDetailModule {}
