import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { LoggerService } from 'src/adapter/Logger/logger.service';
import { ConfigService } from '@nestjs/config';
import { lastValueFrom } from 'rxjs';
import { PricingLambda } from '../dto/pricing-response.dto';
import { PricingRequest } from '../dto/pricing-request-bff.dto';

@Injectable()
export class PricingRepository {
  constructor(
    private readonly httpService: HttpService,
    private loggerService: LoggerService,
    private configService: ConfigService,
  ) { }

  async pricing(
    body: PricingRequest,
    consumerId: string,
    transactionId: string,
    parentId: string,
    spanId: string,
  ): Promise<PricingLambda> {
    try {
      const path_inner_bcl = this.configService.get<string>('PATH_INNER_BCL'); 
      const inner_bcl_client_id = this.configService.get<string>('INNER_BCL_CLIENT_ID');
      const inner_bcl_client_secret = this.configService.get<string>('INNER_BCL_CLIENT_SECRET');
      const urlPricing = `${path_inner_bcl}/pricing`;
      //const urlPricing = `${path_inner_bcl}:80`;
      const axiosRequestConfig = {
        headers: {
          'Content-Type': 'application/json',
          Accept: '*/*',
          'x-client-id': inner_bcl_client_id,
          'x-client-secret': inner_bcl_client_secret,
          'x-consumer-id': consumerId,
          'x-transaction-id': transactionId,
          'x-parent-id': parentId,
          'x-span-id': spanId,
          application: this.configService.get<string>('APP_ID'),
          timestamp: String(new Date()),
        },
      };

      const resultSet = this.httpService.post(
        urlPricing,
        body,
        axiosRequestConfig,
      );
      const responsePricing = await lastValueFrom(resultSet);

      return responsePricing.data;

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
          error.response.status,
          error.response.statusText,
          error.response.data,
        );
      }
    }
  }
}
