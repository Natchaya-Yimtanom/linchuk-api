import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { OrderService } from './order.service';
import { T_ORDER } from './entity/order.entity';
import { OrderDto } from './dto/order.dto';
import { OrderDetailDto } from 'src/order_detail/dto/order_detail.dto';

@Controller('order')
export class OrderController {
    constructor(private readonly orderService: OrderService) {}

    @Post(':id')
    async create(
        @Param('id') paymentId: number,
        @Body() orderDetailDto: OrderDetailDto[],
    ){
        return await this.orderService.create(paymentId,orderDetailDto);
    }

    @Get() // GET /order
    async getOrder(): Promise<T_ORDER[]> {
        return await this.orderService.findAll();
    }

    @Get(':id') // GET /order/123
    async findOrder(@Param('id') id: number): Promise<T_ORDER> {
        return await this.orderService.findOne(id);
    }
}
