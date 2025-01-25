import { Injectable } from '@nestjs/common';
import { C_UNIT } from './entities/unit.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UnitService {
  constructor(
    @InjectRepository(C_UNIT)
    private readonly unitRepo: Repository<C_UNIT>,
  ) {}

  async findAll() {
    return await this.unitRepo.find();
  }

  async findOne(id: number) {
    return await this.unitRepo.findOne({ where: { unit_id: id } });
  }
}
