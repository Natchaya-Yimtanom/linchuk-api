import { Injectable } from '@nestjs/common';
import { T_RECEIPT } from './entity/receipt.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ReceiptDto } from './dto/receipt.dto';

@Injectable()
export class ReceiptService {
    constructor(
        @InjectRepository(T_RECEIPT)
        private readonly receiptRepository: Repository<T_RECEIPT>,
    ) {}

    async create(receiptDto: ReceiptDto) {
        const newReceipt = {
            user_id: receiptDto.user_id,
            create_on: new Date()
        };
        
        return this.receiptRepository.save(newReceipt);
    }

    async findAll(): Promise<T_RECEIPT[]> {
        return await this.receiptRepository.find();
    }

    async findOne(id: number): Promise<T_RECEIPT> {
        return await this.receiptRepository.findOne({ where: { receipt_id: id } });
    }
}
