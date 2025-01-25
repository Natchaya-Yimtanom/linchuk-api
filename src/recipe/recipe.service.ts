import { Injectable } from '@nestjs/common';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { UpdateRecipeDto } from './dto/update-recipe.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { T_RECIPE } from './entities/recipe.entity';
import { Repository } from 'typeorm';
import { T_PRODUCT } from 'src/product/entity/product.entity';

@Injectable()
export class RecipeService {
  constructor(
      @InjectRepository(T_RECIPE)
      private readonly recipeRepo: Repository<T_RECIPE>,

      @InjectRepository(T_PRODUCT)
      private readonly productRepo: Repository<T_PRODUCT>,
  ) {}

  async createMultipleRows(productId: number, createRecipeDto: CreateRecipeDto[]) {
    const productDetail = this.productRepo.find({ where: {product_id: productId} });
    let saveRows: any[];

    const details = createRecipeDto.map(elm => {
      let temp: any[];
      temp['product_id'] = productId;
      temp['product_name'] = productDetail['product_name'];
      temp['ingredients_id'] = elm.ingredients_id;
      temp['ingredients_name'] = elm.ingredients_name;
      temp['amount'] = elm.amount;
      temp['unit_id'] = elm.unit_id;
      temp['unit'] = elm.unit;

      saveRows.push(elm);
    });

    return await this.recipeRepo.save(saveRows);
  }



  findAll() {
    return `This action returns all recipe`;
  }

  findOne(id: number) {
    return `This action returns a #${id} recipe`;
  }

  update(id: number, updateRecipeDto: UpdateRecipeDto) {
    return `This action updates a #${id} recipe`;
  }

  remove(id: number) {
    return `This action removes a #${id} recipe`;
  }
}
