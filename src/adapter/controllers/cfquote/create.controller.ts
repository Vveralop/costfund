import { Body, Controller, Post, UseFilters } from '@nestjs/common';
import {
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateCfQuoteInput } from 'src/domain/cfquote/dto/create-cfquote.dto';
import { CreateCfQuoteService } from 'src/domain/cfquote/services';
import { HttpExceptionFilter } from '../../../shared/interceptor/http.exception.filter';
import { ResponseCreateToBff } from 'src/domain/cfquote/dto/response-create-bff.dto';

@UseFilters(HttpExceptionFilter)
@ApiTags('Cfquote')
@Controller('cfquote')
export class CreateCfQuoteController {
  constructor(private readonly cfQuoteCreateService: CreateCfQuoteService) {}

  @Post()
  @ApiOperation({
    summary: 'Create Quotes',
  })
  @ApiBody({ type: CreateCfQuoteInput })
  @ApiResponse({ status: 201, description: 'When the record is created' })
  @ApiResponse({ status: 500, description: "500's when another error occurs." })
  async create(@Body() body: CreateCfQuoteInput): Promise<ResponseCreateToBff> {
    return await this.cfQuoteCreateService.create(body);
  }
}
