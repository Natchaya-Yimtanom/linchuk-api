import { Injectable } from '@nestjs/common';
import { T_PRODUCT } from './entity/product.entity';
import { DeleteResult, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductDto } from './dto/product.dto';

@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(T_PRODUCT)
        private readonly productRepository: Repository<T_PRODUCT>,
    ) {}

    async create(productDto: ProductDto) {
        const newProduct = {
            product_name: productDto.product_name,
            product_price: productDto.product_price,
            product_cost: productDto.product_cost,
            product_quantity: productDto.product_quantity,
            product_type_id: productDto.product_type_id,
            product_image: productDto.product_image,
            order_date: productDto.order_date,
            expire_date: productDto.expire_date,
        };
        
        return this.productRepository.save(newProduct);
    }
    
    async findOne(id: number): Promise<T_PRODUCT> {
        return await this.productRepository.findOne({ where: { product_id: id } });
    }
    
    async findAll(): Promise<T_PRODUCT[]> {
        return await this.productRepository.find();
    }

    async update(id: number, product: ProductDto) {
        return await this.productRepository.update(id, product);
    }
    
    async delete(id: number): Promise<DeleteResult> {
        return await this.productRepository.delete({ product_id: id });
    }
}
