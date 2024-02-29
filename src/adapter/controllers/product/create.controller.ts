import { Body, Controller, Post, UseFilters } from '@nestjs/common';
import {
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateProductInput } from 'src/domain/product/dto/create-product.dto';
import { CreateProductService } from 'src/domain/product/services';
import { HttpExceptionFilter } from '../../../shared/interceptor/http.exception.filter';

@UseFilters(HttpExceptionFilter)
@ApiTags('Product')
@Controller('product')
export class CreateProductController {
  constructor(private readonly productCreateService: CreateProductService) {}

  @Post()
  @ApiOperation({
    summary: 'Create product data',
  })
  @ApiBody({ type: CreateProductInput })
  @ApiResponse({ status: 201, description: 'When the record is created' })
  @ApiResponse({ status: 500, description: "500's when another error occurs." })
  async create(@Body() body: CreateProductInput) {
    return await this.productCreateService.create(body);
  }
}
