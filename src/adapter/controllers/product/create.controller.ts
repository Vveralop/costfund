import { Body, Controller, Post } from '@nestjs/common';
import { CreateProductInput } from 'src/domain/product/dto/createProduct.dto';
import { CreateProductService } from 'src/domain/product/service';

@Controller('product')
export class CreateProductController {
  constructor(private readonly productCreateService: CreateProductService) {}

  @Post()
  async createProduct(@Body() body: CreateProductInput) {
    return await this.productCreateService.createProduct(body);
  }
}
