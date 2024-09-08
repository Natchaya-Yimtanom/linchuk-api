import { Injectable } from '@nestjs/common';
import { T_PRODUCT } from './entity/product.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(T_PRODUCT)
        private readonly productRepository: Repository<T_PRODUCT>,
    ) {}
    
    async findAll(): Promise<T_PRODUCT[]> {
        return await this.productRepository.find();
    }
}
