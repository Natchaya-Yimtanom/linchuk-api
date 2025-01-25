import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { IngredientsService } from './ingredients.service';
import { CreateIngredientDto } from './dto/create-ingredient.dto';
import { UpdateIngredientDto } from './dto/update-ingredient.dto';

@Controller('ingredients')
export class IngredientsController {
  constructor(private readonly ingredientsService: IngredientsService) {}

  @Post()
  create(@Body() createIngredientDto: CreateIngredientDto) {
    return this.ingredientsService.create(createIngredientDto);
  }

  @Get() // GET /ingredients
  findAll() {
    return this.ingredientsService.findAll();
  }

  @Get(':id') // GET /ingredients/123
  findOne(@Param('id') id: string) {
    return this.ingredientsService.findOne(+id);
  }

  @Post(':id') // POST /ingredients/123
  update(@Param('id') id: string, @Body() updateIngredientDto: UpdateIngredientDto) {
    return this.ingredientsService.update(+id, updateIngredientDto);
  }

  @Delete(':id') // DELETE /ingredients/123
  async deleteIngredients(@Param('id') id: number): Promise<any> {
    await this.ingredientsService.delete(id);
    return { success: true };
  }
}
