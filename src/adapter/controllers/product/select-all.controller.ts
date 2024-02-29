import { Controller, Get, UseFilters } from '@nestjs/common';
import {
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { SelectAllProductService } from 'src/domain/product/services';
import { HttpExceptionFilter } from '../../../shared/interceptor/http.exception.filter';
import { Product } from '../../../domain/product/models/product.model';

@UseFilters(HttpExceptionFilter)
@ApiTags('Product')
@Controller('product')
export class SelectAllProductController {
  constructor(private readonly productService: SelectAllProductService) {}

  @Get()
  @ApiOperation({
    summary: 'Returns all product parameters',
  })
  @ApiResponse({ status: 200, description: 'when returns a record' })
  @ApiResponse({ status: 404, description: 'when record not found' })
  @ApiResponse({ status: 500, description: "500's when another error occurs." })
  async findAll(): Promise<Product[]> {
    return await this.productService.findAll();
  }
}
