import { Injectable } from '@nestjs/common';
import { CreateIngredientDto } from './dto/create-ingredient.dto';
import { UpdateIngredientDto } from './dto/update-ingredient.dto';
import { T_INGREDIENTS } from './entities/ingredient.entity';
import { DeleteResult, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { T_RECIPE } from 'src/recipe/entities/recipe.entity';

@Injectable()
export class IngredientsService {
  constructor(
    @InjectRepository(T_INGREDIENTS)
    private readonly ingredientsRepo: Repository<T_INGREDIENTS>,

    @InjectRepository(T_RECIPE)
    private readonly recipeRepo: Repository<T_RECIPE>,
  ) {}

  async create(createIngredientDto: CreateIngredientDto) {
    const newIngredients = {
      ingredients_type: createIngredientDto.ingredients_type,
      ingredients_name: createIngredientDto.ingredients_name,
      unit_id: createIngredientDto.unit_id,
      unit_name: createIngredientDto.unit_name,
      order_amount: createIngredientDto.order_amount,
      remain: createIngredientDto.remain,
      lot_number: createIngredientDto.lot_number,
      order_date: createIngredientDto.order_date,
      expire_date: createIngredientDto.expire_date,
    };
  
    return this.ingredientsRepo.save(newIngredients);
  }

  async findOne(id: number): Promise<T_INGREDIENTS> {
      return await this.ingredientsRepo.findOne({ where: { ingredients_id: id } });
  }

  async findAll(): Promise<T_INGREDIENTS[]> {
      return await this.ingredientsRepo.find();
  }

  async update(id: number, ingredients: UpdateIngredientDto) {
      return await this.ingredientsRepo.update(id, ingredients);
  }

  async delete(id: number): Promise<DeleteResult> {
    return await this.recipeRepo.manager.transaction(async (transactionalEntityManager) => {
      const recipes = await transactionalEntityManager.find(T_RECIPE, {
        where: { ingredients_id: id }, 
      });
  
      for (const recipe of recipes) {
        await transactionalEntityManager.delete(T_RECIPE, { recipe_id: recipe.recipe_id });
      }
  
      return await transactionalEntityManager.delete(T_INGREDIENTS, { ingredients_id: id });
    });
  }
}
