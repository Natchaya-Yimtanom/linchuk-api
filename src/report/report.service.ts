import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { count } from 'console';
import { T_ORDER } from 'src/order/entity/order.entity';
import { T_ORDER_DETAIL } from 'src/order_detail/entity/order_detail.entity';
import { T_PAYMENT } from 'src/payment/entity/payment.entity';
import { T_PRODUCT } from 'src/product/entity/product.entity';
import { ProductService } from 'src/product/product.service';
import { T_PRODUCT_TYPE } from 'src/product_type/entity/product_type.entity';
import { T_RECEIPT } from 'src/receipt/entity/receipt.entity';
import { Between, Repository } from 'typeorm';

@Injectable()
export class ReportService {
    constructor(
        @InjectRepository(T_RECEIPT)
        private readonly receiptRepository: Repository<T_RECEIPT>,

        @InjectRepository(T_PAYMENT)
        private readonly paymentRepository: Repository<T_PAYMENT>,

        @InjectRepository(T_PRODUCT)
        private readonly productRepository: Repository<T_PRODUCT>,

        @InjectRepository(T_ORDER)
        private readonly orderRepository: Repository<T_ORDER>,

        @InjectRepository(T_ORDER_DETAIL)
        private readonly orderDetailRepository: Repository<T_ORDER_DETAIL>,

        @InjectRepository(T_PRODUCT_TYPE)
        private readonly productTypeRepository: Repository<T_PRODUCT_TYPE>,
    ) {}

    async findAllInRange(startDate: Date, endDate: Date) {
        let data = {};

        // get payment in date range
        const payment = this.paymentRepository.find({
          where: {
            create_on: Between(startDate, endDate),
          },
        });

        data['allOrder'] = (await payment).length;

        let saleSum = 0;
        let order = [];
        (await payment).forEach(elm => {
            saleSum += elm.total_price;
            order.push(elm.payment_id);
        });

        data['sales'] = saleSum;

        
        // get all order in the payment_id
        let orderArr = [];
        await Promise.all(order.map(async elm => {
            const orderList = await this.orderRepository.find({
              where: {
                payment_id: elm,
              },
            });
        
            orderList.forEach(orderItem => {
              orderArr.push(orderItem.order_id);
            });
        }));
        

        // get all order detail in order_id
        let orderDetailArr = [];
        await Promise.all(orderArr.map(async elm => {
            const orderDetailList = await this.orderDetailRepository.find({
              where: {
                order_id: elm,
              },
            });
        
            orderDetailList.forEach(orderItem => {
              orderDetailArr.push(orderItem.order_detail_id);
            });
        }));


        // get all order detail id in order_detail_id list
        let detail = [];
        await Promise.all(orderDetailArr.map(async elm => {
          const detailList = await this.orderDetailRepository.find({
            where: {
              order_detail_id: elm,
            },
          });

          detailList.forEach(orderDetail => {
            if (!detail.hasOwnProperty(orderDetail.product_id)) {
              detail[orderDetail.product_id] = { product_id: orderDetail.product_id, quantity: orderDetail.quantity };
            } else {
              detail[orderDetail.product_id].quantity += orderDetail.quantity;
            }
          });
        }));


        // get all products base on order detail id
        let productArr = {};
        let productType = {};
        let allCost = 0;

        await Promise.all(detail.map(async elm => {
          const productList = await this.productRepository.find({
            where: {
              product_id: elm.product_id,
            },
          });
      
          for (const product of productList) {
            const productTypeList = await this.productTypeRepository.find({
              where: {
                product_type_id: product.product_type_id,
              },
            });
            
            let type = productTypeList[0]['product_type'];

            if (!productArr.hasOwnProperty(product.product_id)) {
              productArr[product.product_id] = { name: product.product_name, cost: product.product_cost, count: elm.quantity };
              productType[product.product_type_id] = { name: type, count: (productType[product.product_type_id]?.count || 0) + 1 };
              allCost += (product.product_cost * elm.quantity);
            } else {
              if(product.product_id == elm.product_id){
                productArr[product.product_id].count += elm.quantity;
                productType[product.product_type_id].count += 1;
                allCost += (product.product_cost * elm.quantity);
              }
            }
          };
        }));
        
        data['allCost'] = allCost;
        data['profit'] = saleSum - allCost;
        data['products'] = productArr;
        data['types'] = productType;

        return data;
    }

}
