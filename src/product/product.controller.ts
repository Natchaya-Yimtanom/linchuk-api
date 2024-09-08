import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ProductService } from './product.service';
import { T_PRODUCT } from './entity/product.entity';
import { ProductDto } from './dto/product.dto';

@Controller('product')
export class ProductController {
    constructor(private readonly productService: ProductService) {}

    @Post()
    async create(
        @Body() productDto: ProductDto
    ){
        return await this.productService.create(productDto);
    }

    @Get() // GET /product
    async getProduct(): Promise<T_PRODUCT[]> {
        return await this.productService.findAll();
    }

    @Get(':id') // GET /product/123
    async findProduct(@Param('id') id: number): Promise<T_PRODUCT> {
        return await this.productService.findOne(id);
    }

    @Post(':id') // POST /product/123
    async updateProduct(
        @Param('id') id: number,
        @Body() productDto: ProductDto
    ){
        return await this.productService.update(id, productDto);
    }

    @Delete(':id')  // DELETE /product/123
    async deleteProduct(@Param('id') id: number): Promise<any> {
        await this.productService.delete(id);
        return { success: true };
    }

}
