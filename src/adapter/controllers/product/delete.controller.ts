import { Controller, Delete, Param, UseFilters } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ProductKey } from 'src/domain/product/models/product.model';
import { DeleteProductService } from 'src/domain/product/services';
import { HttpExceptionFilter } from '../../../shared/interceptor/http.exception.filter';

@UseFilters(HttpExceptionFilter)
@ApiTags('Product')
@Controller('product')
export class DeleteProductController {
  constructor(private readonly productDeleteService: DeleteProductService) {}

  @ApiParam({ name: 'id', type: String })
  @Delete('/:id')
  @ApiOperation({
    summary: 'Delete some product with its ID',
  })
  @ApiResponse({ status: 200, description: 'when returns a record' })
  @ApiResponse({ status: 404, description: 'when record not found' })
  @ApiResponse({ status: 500, description: "500's when another error occurs." })

  async delete(@Param('id') id: ProductKey) {
    return await this.productDeleteService.delete(id);
  }
}
