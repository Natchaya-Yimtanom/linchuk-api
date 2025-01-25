import { Module } from '@nestjs/common';
import { IngredientsService } from './ingredients.service';
import { IngredientsController } from './ingredients.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { T_INGREDIENTS } from './entities/ingredient.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([T_INGREDIENTS]),
  ],
  controllers: [IngredientsController],
  providers: [IngredientsService],
  exports: [
    IngredientsService,
    TypeOrmModule
  ]
})
export class IngredientsModule {}
