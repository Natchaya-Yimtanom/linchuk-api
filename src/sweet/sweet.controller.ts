import { Controller, Get } from '@nestjs/common';
import { T_SWEET } from './entity/sweet.entity';
import { SweetService } from './sweet.service';

@Controller('sweet')
export class SweetController {
    constructor(private readonly albumService: SweetService) {}

    @Get() // GET /sweet
    async getSweets(): Promise<T_SWEET[]> {
        return await this.albumService.findAll();
    }
}
