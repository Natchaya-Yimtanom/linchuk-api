import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SweetModule } from './sweet/sweet.module';
import { ProductTypeModule } from './product_type/product_type.module';

import { T_SWEET } from './sweet/entity/sweet.entity';
import { T_PRODUCT_TYPE } from './product_type/entity/product_type.entity';
import { ProductModule } from './product/product.module';
import { T_PRODUCT } from './product/entity/product.entity';
import { UserModule } from './user/user.module';
import { T_USER } from './user/entity/user.entity';
import { ReceiptModule } from './receipt/receipt.module';
import { T_RECEIPT } from './receipt/entity/receipt.entity';
import { PaymentModule } from './payment/payment.module';
import { T_PAYMENT } from './payment/entity/payment.entity';
import { OrderModule } from './order/order.module';
import { T_ORDER } from './order/entity/order.entity';
import { OrderDetailModule } from './order_detail/order_detail.module';
import { T_ORDER_DETAIL } from './order_detail/entity/order_detail.entity';
import { ReportModule } from './report/report.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db/linchuk.db',
      entities: [
        T_SWEET, 
        T_PRODUCT_TYPE,
        T_PRODUCT,
        T_USER,
        T_RECEIPT,
        T_PAYMENT,
        T_ORDER,
        T_ORDER_DETAIL
      ],
    }),
    SweetModule,
    ProductTypeModule,
    ProductModule,
    UserModule,
    ReceiptModule,
    PaymentModule,
    OrderModule,
    OrderDetailModule,
    ReportModule,
  ],
})

export class AppModule {}
