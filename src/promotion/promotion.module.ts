import { Module } from '@nestjs/common';
import { PromotionService } from './promotion.service';
import { PromotionController } from './promotion.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { T_PROMOTION } from './entities/promotion.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([T_PROMOTION]),
  ],
  controllers: [PromotionController],
  providers: [PromotionService],
  exports: [
    PromotionService,
    TypeOrmModule
  ]
})
export class PromotionModule {}
