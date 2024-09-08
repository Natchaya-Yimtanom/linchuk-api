import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { T_SWEET } from './entity/sweet.entity';

@Injectable()
export class SweetService {
    constructor(
        @InjectRepository(T_SWEET)
        private readonly sweetRepository: Repository<T_SWEET>,
    ) {}
    
    async findAll(): Promise<T_SWEET[]> {
        return await this.sweetRepository.find();
    }
}
