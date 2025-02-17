import { Injectable } from '@nestjs/common';
import { CreatePromotionDto } from './dto/create-promotion.dto';
import { UpdatePromotionDto } from './dto/update-promotion.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { T_PROMOTION } from './entities/promotion.entity';
import { DeleteResult, Repository } from 'typeorm';
import { T_PRODUCT } from 'src/product/entity/product.entity';

@Injectable()
export class PromotionService {
  constructor(
    @InjectRepository(T_PROMOTION)
    private readonly promotionRepo: Repository<T_PROMOTION>,

    @InjectRepository(T_PRODUCT)
    private readonly productRepo: Repository<T_PRODUCT>,
  ) {}

  async create(createPromotionDto: CreatePromotionDto) {
    const newPromotion = {
      promotion_name: createPromotionDto.promotion_name,
      discount_amount: createPromotionDto.discount_amount,
      start_date: createPromotionDto.start_date,
      end_date: createPromotionDto.end_date,
      product_id: createPromotionDto.product_id,
    };

    const savedPromotion = await this.promotionRepo.save(newPromotion);

    const product = await this.productRepo.findOne({ where: { product_id: createPromotionDto.product_id } });

    if (!product) {
      throw new Error('ไม่พบข้อมูลสินค้า');
    }

    product.promotion_id = savedPromotion.promotion_id;
    await this.productRepo.save(product);

    return savedPromotion;
  }

  async findOne(id: number): Promise<T_PROMOTION> {
      return await this.promotionRepo.findOne({ where: { promotion_id: id } });
  }

  async findAll(): Promise<T_PROMOTION[]> {
      return await this.promotionRepo.find();
  }

  async update(id: number, promotion: UpdatePromotionDto) {
      return await this.promotionRepo.update(id, promotion);
  }

  async delete(id: number): Promise<DeleteResult> {
      return await this.promotionRepo.delete({ promotion_id: id });
  }
}
