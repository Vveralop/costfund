import { Controller, Delete, Param, UseFilters } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { DeleteCfQuoteService } from 'src/domain/cfquote/services';
import { HttpExceptionFilter } from '../../../shared/interceptor/http.exception.filter';

@UseFilters(HttpExceptionFilter)
@ApiTags('Cfquote')
@Controller('cfquote')
export class DeleteCfQuoteController {
  constructor(private readonly cfQuoteDeleteService: DeleteCfQuoteService) {}

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete Quotes',
  })
  async delete(@Param('id') id: number) {
    return await this.cfQuoteDeleteService.delete(+id);
  }
}
