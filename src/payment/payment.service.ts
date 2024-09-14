import { BadRequestException, Injectable } from '@nestjs/common';
import { T_PAYMENT } from './entity/payment.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PaymentDto } from './dto/payment.dto';
import { ExceptionsHandler } from '@nestjs/core/exceptions/exceptions-handler';

@Injectable()
export class PaymentService {
    constructor(
        @InjectRepository(T_PAYMENT)
        private readonly productRepository: Repository<T_PAYMENT>,
    ) {}

    async create(receiptId: number, paymentDto: PaymentDto) {
        const receiptList = await this.findAll();
        let chk = false;

        receiptList.forEach(elm => {
            if(elm.receipt_id == receiptId){
                chk = true;
            }
        });

        if(!chk){
            let newPayment: any;
            if(paymentDto.pay_type == 'promtpay'){
                newPayment = {
                    receipt_id: receiptId,
                    total_price: paymentDto.total_price,
                    pay_type: paymentDto.pay_type,
                    pay_img: paymentDto.pay_img,
                    create_on: new Date()
                };
            } else {
                newPayment = {
                    receipt_id: receiptId,
                    total_price: paymentDto.total_price,
                    pay_type: paymentDto.pay_type,
                    cash_receive: paymentDto.cash_receive,
                    cash_return: paymentDto.cash_return,
                    create_on: new Date()
                };
            }
            
            return this.productRepository.save(newPayment);
        } else {
            throw new BadRequestException('ไม่สามารถเพิ่มข้อมูลชำระเงินได้', { 
                cause: new Error(), 
                description: 'เลขใบเสร็จนี้มีการบันทึกข้อมูลชำระเงินอยู่แล้ว' 
            })
        }
        
    }
    
    async findOne(id: number): Promise<T_PAYMENT> {
        return await this.productRepository.findOne({ where: { payment_id: id } });
    }
    
    async findAll(): Promise<T_PAYMENT[]> {
        return await this.productRepository.find();
    }
}
