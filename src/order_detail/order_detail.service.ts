import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { T_ORDER_DETAIL } from './entity/order_detail.entity';
import { Repository } from 'typeorm';
import { OrderService } from 'src/order/order.service';
import { T_ORDER } from 'src/order/entity/order.entity';
import { OrderDetailDto } from './dto/order_detail.dto';
import { T_PRODUCT } from 'src/product/entity/product.entity';

@Injectable()
export class OrderDetailService {
    constructor(
        @InjectRepository(T_ORDER_DETAIL)
        private readonly orderDetailRepository: Repository<T_ORDER_DETAIL>,

        @InjectRepository(T_PRODUCT)
        private readonly productRepository: Repository<T_PRODUCT>,
    ) {}

    async createMultipleRows(orderId: number, orderDetailDto: OrderDetailDto[]): Promise<any[]> {
        console.log(orderDetailDto);
        const details = orderDetailDto.map(elm => {
            const detail = this.orderDetailRepository.create(elm);
            detail.order_id = orderId;
            return detail;
        });

        await this.removeFromProduct(orderDetailDto);

        return await this.orderDetailRepository.save(details);
      }

    async findOne(id: number): Promise<T_ORDER_DETAIL> {
        return await this.orderDetailRepository.findOne({ where: { order_detail_id: id } });
    }

    async findByOrderId(id: number) {
        return await this.orderDetailRepository.find({ where: {order_id: id} });
    }
    
    async findAll(): Promise<T_ORDER_DETAIL[]> {
        return await this.orderDetailRepository.find();
    }

    async removeFromProduct(orderDetailDto: OrderDetailDto[]){
        orderDetailDto.map(async elm => {
            console.log(elm);
            const products: T_PRODUCT[] = await this.productRepository.find({ where: {product_id: elm.product_id} });
            products[0].product_quantity -= elm.quantity;
            this.productRepository.save(products);
        });
    }
}
