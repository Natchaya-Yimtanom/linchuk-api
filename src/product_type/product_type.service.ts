import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { T_PRODUCT_TYPE } from './entity/product_type.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductTypeService {
    constructor(
        @InjectRepository(T_PRODUCT_TYPE)
        private readonly productTypeRepository: Repository<T_PRODUCT_TYPE>,
    ) {}
    
    async findAll(): Promise<T_PRODUCT_TYPE[]> {
    return await this.productTypeRepository.find();
    }
}
