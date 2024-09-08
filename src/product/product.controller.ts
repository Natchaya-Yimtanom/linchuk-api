import { Controller, Get } from '@nestjs/common';
import { ProductService } from './product.service';
import { T_PRODUCT } from './entity/product.entity';

@Controller('product')
export class ProductController {
    constructor(private readonly productService: ProductService) {}

    @Get() // GET /product
    async getProduct(): Promise<T_PRODUCT[]> {
        return await this.productService.findAll();
    }
}
