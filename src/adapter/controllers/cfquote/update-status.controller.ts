import { Body, Controller, Param, Patch, UseFilters } from '@nestjs/common';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CfQuoteKey } from 'src/domain/cfquote/models/cfquote.model';
import { UpdateCfQuoteService } from 'src/domain/cfquote/services';
import { HttpExceptionFilter } from '../../../shared/interceptor/http.exception.filter';
import { UpdateCfQuoteInput } from 'src/domain/cfquote/dto/update-cfquote.dto';

@UseFilters(HttpExceptionFilter)
@ApiTags('Cfquote')
@Controller('cfquote/statusChange')
export class UpdateCfQuoteController {
  constructor(private readonly cfQuoteUpdateService: UpdateCfQuoteService) {}
  @ApiParam({ name: 'id', type: Number })
  @Patch('/:id')
  @ApiOperation({
    summary: 'Update quotes with its ID',
  })
  @ApiBody({
    type: UpdateCfQuoteInput,
  })
  @ApiResponse({ status: 200, description: 'when returns a record' })
  @ApiResponse({ status: 404, description: 'when record not found' })
  @ApiResponse({ status: 500, description: "500's when another error occurs." })
  @Patch(':id')
  async update(@Param('id') id: CfQuoteKey, @Body() body: UpdateCfQuoteInput) {
    return await this.cfQuoteUpdateService.update(+id, body);
  }
}
