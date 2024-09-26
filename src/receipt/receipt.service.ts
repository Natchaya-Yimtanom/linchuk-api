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
        const receiptNumber = await this.createNumber();

        const newReceipt = {
            user_id: receiptDto.user_id,
            create_on: new Date(),
            receipt_number: receiptNumber
        };
        
        return this.receiptRepository.save(newReceipt);
    }

    async findAll(): Promise<T_RECEIPT[]> {
        return await this.receiptRepository.find();
    }

    async findOne(id: number): Promise<T_RECEIPT> {
        return await this.receiptRepository.findOne({ where: { receipt_id: id } });
    }

    async createNumber() {
        let rowId = (await this.findAll()).length + 1;
        let receiptNum = rowId.toString().padStart(5, '0');

        const date = new Date();
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = new Date().getFullYear() % 100;

        const number = 'LP-'+ day + month + year + receiptNum;
        return number;
    }
}
