import { Module } from '@nestjs/common';
import { ReceiptController } from './receipt.controller';
import { ReceiptService } from './receipt.service';
import { T_RECEIPT } from './entity/receipt.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentService } from 'src/payment/payment.service';
import { PaymentModule } from 'src/payment/payment.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([T_RECEIPT]),
    PaymentModule
  ],
  controllers: [ReceiptController],
  providers: [ReceiptService],
  exports: [ReceiptService]
})
export class ReceiptModule {}
