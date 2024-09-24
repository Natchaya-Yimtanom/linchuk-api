import { Module } from '@nestjs/common';
import { ReportController } from './report.controller';
import { ReportService } from './report.service';
import { ProductModule } from 'src/product/product.module';
import { ReceiptModule } from 'src/receipt/receipt.module';
import { PaymentModule } from 'src/payment/payment.module';
import { OrderModule } from 'src/order/order.module';
import { OrderDetailModule } from 'src/order_detail/order_detail.module';
import { ProductTypeModule } from 'src/product_type/product_type.module';

@Module({
  imports: [
    ProductModule,
    ReceiptModule,
    PaymentModule,
    OrderModule,
    OrderDetailModule,
    ProductTypeModule
  ],
  controllers: [ReportController],
  providers: [ReportService],
  exports: [ReportService]
})
export class ReportModule {}
