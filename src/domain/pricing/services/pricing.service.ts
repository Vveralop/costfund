import { Injectable } from '@nestjs/common';
import { LoggerService } from 'src/adapter/Logger/logger.service';
import { PricingInputDto } from '../dto/pricing-request-bff.dto';
import { MetricsPricing } from 'src/shared/utils/constant-pricing';
import { MarketStoreRepository, PricingRepository } from '../repositories';
import { PricingLambda } from '../dto/pricing-response.dto';

@Injectable()
export class PricingService {
  constructor(
    private loggerService: LoggerService,
    private markerStoreRepository: MarketStoreRepository,
    private pricingRepository: PricingRepository
  ) { }

  async pricing(
    body: PricingInputDto,
    consumerId: string,
    transactionId: string,
    parentId: string,
    spanId: string,
  ): Promise<PricingLambda> {
    try {
      const resultSet = await this.markerStoreRepository.marketStore(
        {"source": body.source},
        consumerId,
        transactionId,
        parentId,
        spanId
      );

      const bodyPricing = {
        marketStore: { "exchangeRates": resultSet.exchangeRates,
                       "localCurrency": body.currency,
                       "curves": resultSet.curves,
                       "evalDate": resultSet.refDate },
        instruments: [body],
        metrics: MetricsPricing
      };

      const resultSetPricing = await this.pricingRepository.pricing(
        bodyPricing,
        consumerId,
        transactionId,
        parentId,
        spanId
      );

      return resultSetPricing[0];

    } catch (error) {
      if (!error.response) {
        this.loggerService.catchError(error.code, error.cause, error.message);
      }
      if (error.response.statusCode) {
        this.loggerService.catchError(
          String(error.response.statusCode),
          error.response.error,
          error.response.message,
        );
      } else {
        this.loggerService.catchError(
          error.response.data.httpCode,
          error.status,
          error.code,
        );
      }
    }
  }
}
