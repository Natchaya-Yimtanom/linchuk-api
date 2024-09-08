import { Controller, Get } from '@nestjs/common';
import { T_PRODUCT_TYPE } from './entity/product_type.entity';
import { ProductTypeService } from './product_type.service';

@Controller('productType')
export class ProductTypeController {
    constructor(private readonly productTypeService: ProductTypeService) {}

    @Get() // GET /productType
    async getProductType(): Promise<T_PRODUCT_TYPE[]> {
        return await this.productTypeService.findAll();
    }
}
