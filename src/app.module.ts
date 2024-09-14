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
        T_PAYMENT
      ],
    }),
    SweetModule,
    ProductTypeModule,
    ProductModule,
    UserModule,
    ReceiptModule,
    PaymentModule,
  ],
})

export class AppModule {}
