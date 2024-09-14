import { Module } from '@nestjs/common';
import { OrderDetailController } from './order_detail.controller';
import { OrderDetailService } from './order_detail.service';
import { T_ORDER_DETAIL } from './entity/order_detail.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([T_ORDER_DETAIL])
  ],
  controllers: [OrderDetailController],
  providers: [OrderDetailService],
  exports: [OrderDetailService]
})
export class OrderDetailModule {}
