import { Injectable } from '@nestjs/common';
import { T_PRODUCT } from './entity/product.entity';
import { DeleteResult, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductDto } from './dto/product.dto';
import { T_RECIPE } from 'src/recipe/entities/recipe.entity';
import { T_PROMOTION } from 'src/promotion/entities/promotion.entity';
import sharp from 'sharp';

@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(T_PRODUCT)
        private readonly productRepository: Repository<T_PRODUCT>,

        @InjectRepository(T_RECIPE)
        private readonly recipeRepo: Repository<T_RECIPE>,

        @InjectRepository(T_PROMOTION)
        private readonly promotionRepo: Repository<T_PROMOTION>,
    ) {}

    async create(productDto: ProductDto) {
        const newProduct = {
            product_name: productDto.product_name,
            product_price: productDto.product_price,
            product_cost: productDto.product_cost,
            // product_quantity: productDto.product_quantity,
            product_type_id: productDto.product_type_id,
            product_image: productDto.product_image,
            // order_date: productDto.order_date,
            // expire_date: productDto.expire_date,
            promotion_id: productDto.promotion_id,
        };
        
        return this.productRepository.save(newProduct);
    }
    
    async findOne(id: number): Promise<T_PRODUCT> {
        return await this.productRepository.findOne({ where: { product_id: id } });
    }
    
    async findAll(): Promise<T_PRODUCT[]> {
        const products = await this.productRepository.find();
        let returnArr = products;

        for (const elm of returnArr) {
            if (elm.promotion_id != null) {
                const promotion = await this.promotionRepo.findOne({
                    where: { promotion_id: elm.promotion_id }
                });
        
                if (promotion) {
                    elm['discount_amount'] = promotion.discount_amount;
                }
            }
        }

        return returnArr;
    }

    async update(id: number, product: ProductDto) {
        return await this.productRepository.update(id, product);
    }
    
    async delete(id: number): Promise<DeleteResult> {
        return await this.recipeRepo.manager.transaction(async (transactionalEntityManager) => {
            // 1️⃣ Find all recipes that contain this ingredient
            const recipes = await transactionalEntityManager.find(T_RECIPE, {
              where: { product_id: id },
            });
        
            // 2️⃣ Delete all found recipes from T_RECIPE
            for (const recipe of recipes) {
              await transactionalEntityManager.delete(T_RECIPE, { recipe_id: recipe.recipe_id });
            }
        
            // 3️⃣ Now delete the ingredient from T_PRODUCT
            return await transactionalEntityManager.delete(T_PRODUCT, { product_id: id });
          });
    }
}
