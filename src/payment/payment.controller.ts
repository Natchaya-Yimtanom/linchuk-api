import { Body, Controller, Get, Param, ParamData, Post } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { T_PAYMENT } from './entity/payment.entity';
import { PaymentDto } from './dto/payment.dto';

@Controller('payment')
export class PaymentController {
    constructor(private readonly paymentService: PaymentService) {}

    @Post(':id')
    async create(
        @Body() paymentDto: PaymentDto,
        @Param('id') receiptId: number
    ){
        return await this.paymentService.create(receiptId,paymentDto);
    }

    @Get() // GET /payment
    async getPayment(): Promise<T_PAYMENT[]> {
        return await this.paymentService.findAll();
    }

    @Get(':id') // GET /payment/123
    async findPayment(@Param('id') id: number): Promise<T_PAYMENT> {
        return await this.paymentService.findOne(id);
    }

}
