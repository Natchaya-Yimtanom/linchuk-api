import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { T_RECEIPT } from 'src/receipt/entity/receipt.entity';
import { ReceiptService } from 'src/receipt/receipt.service';
import { ReceiptDto } from './dto/receipt.dto';

@Controller('receipt')
export class ReceiptController {
    constructor(private readonly receiptService: ReceiptService) {}

    @Post()
    async create(
        @Body() receiptDto: ReceiptDto
    ){
        return await this.receiptService.create(receiptDto);
    }

    @Get() // GET /receipt
    async getReceipt(): Promise<T_RECEIPT[]> {
        return await this.receiptService.findAll();
    }

    @Get(':id') // GET /receipt/123
    async findProduct(@Param('id') id: number): Promise<T_RECEIPT> {
        return await this.receiptService.findOne(id);
    }

}
