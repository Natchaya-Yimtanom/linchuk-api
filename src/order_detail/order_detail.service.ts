import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { T_ORDER_DETAIL } from './entity/order_detail.entity';
import { Not, Repository } from 'typeorm';
import { OrderService } from 'src/order/order.service';
import { T_ORDER } from 'src/order/entity/order.entity';
import { OrderDetailDto } from './dto/order_detail.dto';
import { T_PRODUCT } from 'src/product/entity/product.entity';
import { T_RECIPE } from 'src/recipe/entities/recipe.entity';
import { T_INGREDIENTS } from 'src/ingredients/entities/ingredient.entity';

@Injectable()
export class OrderDetailService {
    constructor(
        @InjectRepository(T_ORDER_DETAIL)
        private readonly orderDetailRepository: Repository<T_ORDER_DETAIL>,

        @InjectRepository(T_PRODUCT)
        private readonly productRepository: Repository<T_PRODUCT>,

        @InjectRepository(T_RECIPE)
        private readonly recipeRepository: Repository<T_RECIPE>,

        @InjectRepository(T_INGREDIENTS)
        private readonly ingredientRepo: Repository<T_INGREDIENTS>,
    ) {}

    async createMultipleRows(orderId: number, orderDetailDto: OrderDetailDto[]): Promise<any[]> {
        // console.log(orderDetailDto);
        const details = orderDetailDto.map(elm => {
            const detail = this.orderDetailRepository.create(elm);
            detail.order_id = orderId;
            return detail;
        });

        await this.removeFromProduct(orderDetailDto);

        return await this.orderDetailRepository.save(details);
      }

    async findOne(id: number): Promise<T_ORDER_DETAIL> {
        return await this.orderDetailRepository.findOne({ where: { order_detail_id: id } });
    }

    async findByOrderId(id: number) {
        return await this.orderDetailRepository.find({ where: {order_id: id} });
    }
    
    async findAll(): Promise<T_ORDER_DETAIL[]> {
        return await this.orderDetailRepository.find();
    }

    // async removeFromProduct(orderDetailDto: OrderDetailDto[]){
    //     orderDetailDto.map(async elm => {
    //         console.log(elm);
    //         const products: T_PRODUCT[] = await this.productRepository.find({ where: {product_id: elm.product_id} });
    //         // products[0].product_quantity -= elm.quantity;
    //         this.productRepository.save(products);
    //     });
    // }

    async removeFromProduct(orderDetailDto: OrderDetailDto[]) {
        for (const elm of orderDetailDto) {
        
            // 1️⃣ Find all recipes with the given product_id
            const recipeList: T_RECIPE[] = await this.recipeRepository.find({
                where: { product_id: elm.product_id },
            });
        
            if (!recipeList.length) {
                console.log(`No recipes found for product_id: ${elm.product_id}`);
                continue;
            }
        
            // 2️⃣ Extract ingredients_id and the amount to reduce (amount)
            const ingredientAmounts = recipeList.map(recipe => ({
                ingredients_id: recipe.ingredients_id,
                amount: elm.quantity * recipe.amount, // Assuming 'amount' field exists in T_RECIPE
            }));
        
            for (const { ingredients_id, amount } of ingredientAmounts) {
                let remainingToReduce = amount;
            
                // 3️⃣ Find ingredients ordered by orderDate (oldest first)
                const ingredientList: T_INGREDIENTS[] = await this.ingredientRepo.find({
                    where: { ingredients_id },
                    order: { order_date: 'ASC' }, // Oldest first
                });
                
                let ingredientType = '';
            
                for (const ingredient of ingredientList) {
                    ingredientType = ingredient.ingredients_type; //set type

                    if (remainingToReduce <= 0) break; // Stop when fully reduced
            
                    // 4️⃣ If current row has enough remaining, just subtract and save
                    if (ingredient.remain >= remainingToReduce) {
                        ingredient.remain -= remainingToReduce;
                        remainingToReduce = 0;
                    } else {
                    // 4️⃣ If not enough remain, reduce what's available and continue to the next oldest
                        remainingToReduce -= ingredient.remain;
                        ingredient.remain = 0;
                    }
            
                    // Save or delete ingredient if remain <= 0
                    await this.ingredientRepo.save(ingredient);
                }
            
                // If there's still remaining to reduce, continue to next ingredient
                if (remainingToReduce > 0) {
                    const ingredientListRemain: T_INGREDIENTS[] = await this.ingredientRepo.find({
                        where: { 
                            ingredients_type : ingredientType, 
                            remain: Not(0) // Filter rows where remain is not 0
                        },
                        order: { order_date: 'ASC' }, // Oldest first
                    });

                    for (const ingredient of ingredientListRemain) {
                        if (remainingToReduce <= 0) break; // Stop when fully reduced
                
                        // 4️⃣ If current row has enough remaining, just subtract and save
                        if (ingredient.remain >= remainingToReduce) {
                            ingredient.remain -= remainingToReduce;
                            remainingToReduce = 0;
                        } else {
                        // 4️⃣ If not enough remain, reduce what's available and continue to the next oldest
                            remainingToReduce -= ingredient.remain;
                            ingredient.remain = 0;
                        }
                
                        // Save or delete ingredient if remain <= 0
                        await this.ingredientRepo.save(ingredient);
                    }
                }
            }
        }

    }
}
