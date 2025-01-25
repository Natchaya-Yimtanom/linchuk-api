import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PromotionService } from './promotion.service';
import { CreatePromotionDto } from './dto/create-promotion.dto';
import { UpdatePromotionDto } from './dto/update-promotion.dto';

@Controller('promotion')
export class PromotionController {
  constructor(private readonly promotionService: PromotionService) {}

  @Post()
  create(@Body() createPromotionDto: CreatePromotionDto) {
    return this.promotionService.create(createPromotionDto);
  }

  @Get() // GET /promotion
  getPromotion() {
    return this.promotionService.findAll();
  }

  @Get(':id') // GET /promotion/123
  getOnePromotion(@Param('id') id: string) {
    return this.promotionService.findOne(+id);
  }

  @Post(':id') // POST /promotion/123
  updatePromotion(@Param('id') id: string, @Body() updatePromotionDto: UpdatePromotionDto) {
    return this.promotionService.update(+id, updatePromotionDto);
  }

  @Delete(':id') // DELETE /promotion/123
  async deletePromotion(@Param('id') id: number): Promise<any> {
    await this.promotionService.delete(id);
    return { success: true };
  }
}
