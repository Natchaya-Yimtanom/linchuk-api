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

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db/linchuk.db',
      entities: [
        T_SWEET, 
        T_PRODUCT_TYPE,
        T_PRODUCT
      ],
    }),
    SweetModule,
    ProductTypeModule,
    ProductModule,
  ],
})

export class AppModule {}
