import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { T_ORDER } from './entity/order.entity';
import { PaymentModule } from 'src/payment/payment.module';
import { OrderDetailModule } from 'src/order_detail/order_detail.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([T_ORDER]),
    PaymentModule,
    OrderDetailModule
  ],
  controllers: [OrderController],
  providers: [OrderService],
  exports: [OrderService]
})
export class OrderModule {}
