import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { T_ORDER_DETAIL } from './entity/order_detail.entity';
import { Repository } from 'typeorm';
import { OrderService } from 'src/order/order.service';
import { T_ORDER } from 'src/order/entity/order.entity';
import { OrderDetailDto } from './dto/order_detail.dto';

@Injectable()
export class OrderDetailService {
    constructor(
        @InjectRepository(T_ORDER_DETAIL)
        private readonly orderDetailRepository: Repository<T_ORDER_DETAIL>
    ) {}

    async createMultipleRows(orderId: number, orderDetailDto: OrderDetailDto[]): Promise<any[]> {
        const details = orderDetailDto.map(elm => {
            const detail = this.orderDetailRepository.create(elm);
            detail.order_id = orderId;
            return detail;
        });

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
}
