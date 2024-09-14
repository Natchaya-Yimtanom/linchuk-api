import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { OrderDetailService } from './order_detail.service';
import { OrderDetailDto } from './dto/order_detail.dto';
import { T_ORDER_DETAIL } from './entity/order_detail.entity';

@Controller('order-detail')
export class OrderDetailController {
    constructor(private readonly orderDetailService: OrderDetailService) {}

    @Post(':id')
    async create(
        @Param('id') orderId: number,
        @Body() orderDetailDto: OrderDetailDto[]
    ): Promise<T_ORDER_DETAIL[]>{
        return await this.orderDetailService.createMultipleRows(orderId,orderDetailDto);
    }

    @Get() // GET /order-detail
    async getOrderDetail(): Promise<T_ORDER_DETAIL[]> {
        return await this.orderDetailService.findAll();
    }

    @Get(':id') // GET /order-detail/123
    async findOrderDetail(@Param('id') id: number): Promise<T_ORDER_DETAIL> {
        return await this.orderDetailService.findOne(id);
    }

    @Get('order/:id') // GET /order-detail/order/123
    async findByOrderId(@Param('id') id: number) {
        return await this.orderDetailService.findByOrderId(id);
    }
}
