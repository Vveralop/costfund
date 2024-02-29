import { Controller, Get, NotFoundException, Param, UseFilters } from '@nestjs/common';
import {
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiParam,
} from '@nestjs/swagger';
import { ProductKey } from 'src/domain/product/models/product.model';
import { SelectProductService } from 'src/domain/product/services';
import { HttpExceptionFilter } from '../../../shared/interceptor/http.exception.filter';

@UseFilters(HttpExceptionFilter)
@ApiTags('Product')
@Controller('product')
export class SelectProductController {
  constructor(private readonly productService: SelectProductService) {}

  @ApiParam({ name: 'id', type: String })
  @Get('/:id')
  @ApiOperation({
    summary: 'Returns parameters of a product with its ID',
  })
  @ApiResponse({ status: 200, description: 'when returns a record' })
  @ApiResponse({ status: 404, description: 'when record not found' })
  @ApiResponse({ status: 500, description: "500's when another error occurs." })
  async findOne(@Param('id') id: ProductKey) {
    const product = await this.productService.findOne(id);
    if (!product) {
      throw new NotFoundException();
    }
    return product;
  }
}
