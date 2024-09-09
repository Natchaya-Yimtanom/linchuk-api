import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { T_PRODUCT_TYPE } from './entity/product_type.entity';
import { ProductTypeService } from './product_type.service';
import { ProductType } from './dto/product_type.dto';

@Controller('productType')
export class ProductTypeController {
    constructor(private readonly productTypeService: ProductTypeService) {}

    @Post()
    async create(
        @Body() productTypeDto: ProductType
    ){
        return await this.productTypeService.create(productTypeDto);
    }

    @Post(':id') // POST /product/123
    async updateProduct(
        @Param('id') id: number,
        @Body() productTypeDto: ProductType
    ){
        return await this.productTypeService.update(id, productTypeDto);
    }

    @Get() // GET /productType
    async getProductType() {
        return await this.productTypeService.findAll();
    }

    @Delete(':id')  // DELETE /product/123
    async deleteProduct(@Param('id') id: number): Promise<any> {
        await this.productTypeService.delete(id);
        return { success: true };
    }
}
