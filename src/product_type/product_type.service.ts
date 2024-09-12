import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { T_PRODUCT_TYPE } from './entity/product_type.entity';
import { DeleteResult, Repository } from 'typeorm';
import { ProductService } from 'src/product/product.service';
import { ProductType } from './dto/product_type.dto';

@Injectable()
export class ProductTypeService {
    constructor(
        @InjectRepository(T_PRODUCT_TYPE)
        private readonly productTypeRepository: Repository<T_PRODUCT_TYPE>,
        private readonly productService: ProductService
    ) {}

    async create(productTypeDto: ProductType) {
        const allType = await this.productTypeRepository.find();
        let typeExist = false;

        allType.forEach(elm => {
            if(elm.product_type == productTypeDto.product_type){
                typeExist = true;
            }
        });

        if(!typeExist){
            const newProductType = {
                product_type: productTypeDto.product_type,
            };
            
            return this.productTypeRepository.save(newProductType);
        } else {
            const status = {
                status: false,
                message: 'มีประเภทสินค้านี้อยู่แล้ว'
            }

            return  status;
        }
    }
    
    async findAll() {
        let typeList = await this.productTypeRepository.find();
        const type = typeList.map((elm) => {
            elm["count"] = 0;
            return elm;
        });

        let product = await this.productService.findAll();

        product.forEach((elm) => {
            type.forEach((type,index) => {
                if(elm.product_type_id == type.product_type_id){
                    type['count'] += 1;
                }
            });
        });

        return type;
    }

    async update(id: number, productType: ProductType) {
        return await this.productTypeRepository.update(id, productType);
    }

    async delete(id: number): Promise<DeleteResult> {
        return await this.productTypeRepository.delete({ product_type_id: id });
    }
}
