import { BadRequestException, Injectable } from '@nestjs/common';
import { T_PAYMENT } from './entity/payment.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PaymentDto } from './dto/payment.dto';
import { ExceptionsHandler } from '@nestjs/core/exceptions/exceptions-handler';
import { ReceiptDto } from 'src/receipt/dto/receipt.dto';
import { ReceiptService } from 'src/receipt/receipt.service';

@Injectable()
export class PaymentService {
    constructor(
        @InjectRepository(T_PAYMENT)
        private readonly productRepository: Repository<T_PAYMENT>,
        private readonly receiptService: ReceiptService
    ) {}

    async create(receiptDto: ReceiptDto, paymentDto: PaymentDto) {
        const receiptCreate = await this.receiptService.create(receiptDto);

        let newPayment: any;
        if(paymentDto.pay_type == 'promtpay'){
            newPayment = {
                receipt_id: receiptCreate.receipt_id,
                total_price: paymentDto.total_price,
                pay_type: paymentDto.pay_type,
                pay_img: paymentDto.pay_img,
                create_on: new Date()
            };
        } else {
            newPayment = {
                receipt_id: receiptCreate.receipt_id,
                total_price: paymentDto.total_price,
                pay_type: paymentDto.pay_type,
                cash_receive: paymentDto.cash_receive,
                cash_return: paymentDto.cash_return,
                create_on: new Date()
            };
        }
        
        return this.productRepository.save(newPayment);
    }
    
    async findOne(id: number): Promise<T_PAYMENT> {
        return await this.productRepository.findOne({ where: { payment_id: id } });
    }
    
    async findAll(): Promise<T_PAYMENT[]> {
        return await this.productRepository.find();
    }
}
