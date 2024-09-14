import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { T_ORDER } from './entity/order.entity';
import { Repository } from 'typeorm';
import { OrderDto } from './dto/order.dto';
import { PaymentService } from 'src/payment/payment.service';
import { OrderDetailDto } from 'src/order_detail/dto/order_detail.dto';
import { OrderDetailService } from 'src/order_detail/order_detail.service';

@Injectable()
export class OrderService {
    constructor(
        @InjectRepository(T_ORDER)
        private readonly orderRepository: Repository<T_ORDER>,
        private readonly paymentService: PaymentService,
        private readonly orderDetailService: OrderDetailService,
    ) {}

    async create(paymentId: number, orderDetailDto: OrderDetailDto[]) {
        const payment = await this.paymentService.findOne(paymentId);

        if(payment){
            const findPayment = await this.findPayment(paymentId);

            if(!findPayment){
                const newPayment = { payment_id: paymentId };
                const createOrder = await this.orderRepository.save(newPayment);

                const createOrderDetail = await this.orderDetailService.createMultipleRows(createOrder.order_id, orderDetailDto);
                return createOrderDetail;
            } else {
                throw new BadRequestException('ไม่สามารถเพิ่มข้อมูลการสั่งซื้อได้', { 
                    cause: new Error(), 
                    description: 'เลขชำระเงินนี้มีการบันทึกข้อมูลการสั่งซื้ออยู่แล้ว' 
                })
            }
        } else {
            throw new NotFoundException('ไม่พบข้อมูลการชำระเงิน', { 
                cause: new Error(), 
                description: 'ไม่พบข้อมูลการชำระเงินเลขนี้ในระบบ' 
            })
        }
    }

    async findOne(id: number): Promise<T_ORDER> {
        return await this.orderRepository.findOne({ where: { order_id: id } });
    }
    
    async findAll(): Promise<T_ORDER[]> {
        return await this.orderRepository.find();
    }

    async findPayment(paymentId: number) {
        const orderList = await this.findAll();

        let chk = false;
        orderList.forEach(elm => {
            if(elm.payment_id == paymentId){
                chk = true;
            }
        });

        return chk;
    }
}
