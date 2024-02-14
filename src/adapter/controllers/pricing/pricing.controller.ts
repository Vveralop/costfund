import { Headers, Body, Controller, Post, UseFilters, HttpCode } from '@nestjs/common';
import {
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags
} from '@nestjs/swagger';
import { PricingService } from 'src/domain/pricing/services';
import { HttpExceptionFilter } from '../../../shared/interceptor/http.exception.filter';
import {
    SPAN_ID,
    TRANSACTION_ID,
    PARENT_ID,
    CONSUMER_ID,
  } from '../../../shared/utils/constants';
import { ValidateHeaderDto } from 'src/shared/utils/paramGeneral.entity';
import { PricingInputDto } from 'src/domain/pricing/dto/pricing-request-bff.dto';
import { PricingLambda } from 'src/domain/pricing/dto/pricing-response.dto';

@UseFilters(HttpExceptionFilter)
@ApiTags('PricingSimulations')
@Controller('pricingSimulations')
export class PricingController {
  constructor(private readonly pricingService: PricingService) {}

  @Post()
  @HttpCode(200)
  @ApiOperation({
    summary: 'Pricing simulation',
  })
  @ApiBody({ type: PricingInputDto })
  @ApiResponse({ status: 200, description: 'When the record is created' })
  @ApiResponse({ status: 404, description: 'When the marketstore record does not exist' })
  @ApiResponse({ status: 500, description: "500's when another error occurs." })
  async create(
    @Body() body: PricingInputDto,
    @Headers() headers: ValidateHeaderDto): Promise<PricingLambda> {
    const consumer = headers[CONSUMER_ID];
    const transaction = headers[TRANSACTION_ID];
    const parent = headers[PARENT_ID];
    const span = headers[SPAN_ID];

    return await this.pricingService.pricing(body, consumer, transaction, parent, span );
  }
}
