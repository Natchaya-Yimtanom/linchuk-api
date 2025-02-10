import { Injectable, Logger } from '@nestjs/common';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { UpdateRecipeDto } from './dto/update-recipe.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { T_RECIPE } from './entities/recipe.entity';
import { Repository } from 'typeorm';
import { T_PRODUCT } from 'src/product/entity/product.entity';
import { create } from 'domain';

@Injectable()
export class RecipeService {
  constructor(
    @InjectRepository(T_RECIPE)
    private readonly recipeRepo: Repository<T_RECIPE>,

    @InjectRepository(T_PRODUCT)
    private readonly productRepo: Repository<T_PRODUCT>,
  ) {}

  async createMultipleRows(
    productId: number,
    createRecipeDto: CreateRecipeDto[],
  ) {
    const productDetail = await this.productRepo.findOne({
      where: { product_id: productId },
    });

    if (!productDetail) {
      return {
        status: false,
        message: `หาสินค้าหมายเลข${productDetail.product_name}ไม่พบ`,
      };
    }

    const existingRecipes = await this.recipeRepo.find({
      where: { product_id: productId },
    });

    if (existingRecipes.length > 0) {
      return {
        status: false,
        message: `${productDetail.product_name}มีสูตรอยู่แล้ว`,
      };
    }

    const details = createRecipeDto.map((elm) => {
      const detail = this.recipeRepo.create(elm);
      detail.product_id = productId;
      detail.product_name = productDetail.product_name;
      return detail;
    });

    return await this.recipeRepo.save(details);
  }

  async findAll() {
    return await this.recipeRepo.find();
  }

  async findOne(id: number) {
    return await this.recipeRepo.find({ where: { product_id: id } });
  }

  async updateMultipleRows(
    productId: number,
    updateRecipeDto: UpdateRecipeDto[],
  ) {
    const recipeDetails = await this.recipeRepo.find({
      where: { product_id: productId },
    });

    if (!recipeDetails || recipeDetails.length === 0) {
      throw new Error(`No recipe details found for product ID: ${productId}`);
    }

    const updatedDetails = recipeDetails.map((existingDetail) => {
      const updateData = updateRecipeDto.find(
        (dto) => dto.ingredients_id === existingDetail.ingredients_id,
      );

      if (!updateData) return existingDetail;

      return {
        ...existingDetail,
        ingredients_name: updateData.ingredients_name,
        amount: updateData.amount,
        unit_id: updateData.unit_id,
        unit: updateData.unit,
      };
    });

    return await this.recipeRepo.save(updatedDetails);
  }

  async remove(id: number) {
    return await this.recipeRepo.delete({ recipe_id: id });
  }
}