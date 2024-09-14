import { Module } from '@nestjs/common';
import { PaymentController } from './payment.controller';
import { PaymentService } from './payment.service';
import { T_PAYMENT } from './entity/payment.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReceiptModule } from 'src/receipt/receipt.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([T_PAYMENT]),
    ReceiptModule
  ],
  controllers: [PaymentController],
  providers: [PaymentService],
  exports: [PaymentService]
})
export class PaymentModule {}
