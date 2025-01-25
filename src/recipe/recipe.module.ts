import { Module } from '@nestjs/common';
import { RecipeService } from './recipe.service';
import { RecipeController } from './recipe.controller';
import { ProductModule } from 'src/product/product.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { T_RECIPE } from './entities/recipe.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([T_RECIPE]),
    ProductModule
  ],
  controllers: [RecipeController],
  providers: [RecipeService],
  exports: [
    RecipeService,
    TypeOrmModule
  ]
})
export class RecipeModule {}
