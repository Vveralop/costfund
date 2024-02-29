import { Controller, Get, Param, UseFilters } from '@nestjs/common';
import {
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { SelectAllUserCfQuoteService } from 'src/domain/cfquote/services';
import { HttpExceptionFilter } from '../../../shared/interceptor/http.exception.filter';
import { CfQuote } from '../../../domain/cfquote/models/cfquote.model';

@UseFilters(HttpExceptionFilter)
@ApiTags('Cfquote')
@Controller('cfquote/listuser')
export class SelectAllUserCfQuoteController {
  constructor(private readonly cfQuoteService: SelectAllUserCfQuoteService) {}

  @ApiParam({ name: 'user', type: String })
  @Get('/:user')
  @ApiOperation({
    summary: 'Returns quotes by user',
  })
  @ApiResponse({ status: 200, description: 'when returns a record' })
  @ApiResponse({ status: 404, description: 'when record not found' })
  @ApiResponse({ status: 500, description: "500's when another error occurs." })
  async findAll(@Param('user') user: string): Promise<CfQuote[]> {
    return await this.cfQuoteService.findAllUser(user);
  }
}

