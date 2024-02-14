import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { LoggerService } from 'src/adapter/Logger/logger.service';
import { ConfigService } from '@nestjs/config';
import { marketStoreInputDto } from '../dto/pricing-request-bff.dto';
import { lastValueFrom } from 'rxjs';
import { MarketStoreLambda } from '../dto/market-response.dto';

@Injectable()
export class MarketStoreRepository {
  constructor(
    private readonly httpService: HttpService,
    private loggerService: LoggerService,
    private configService: ConfigService,
  ) { }

  async marketStore(
    body: marketStoreInputDto,
    consumerId: string,
    transactionId: string,
    parentId: string,
    spanId: string,
  ): Promise<MarketStoreLambda> {
    try {
      const path_inner_bcl = this.configService.get<string>('PATH_INNER_BCL');
      const inner_bcl_client_id = this.configService.get<string>('INNER_BCL_CLIENT_ID');
      const inner_bcl_client_secret = this.configService.get<string>('INNER_BCL_CLIENT_SECRET');

      const urlMarketStore = `${path_inner_bcl}/marketstore`;
      //const urlMarketStore = `${path_inner_bcl}:81`;
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
        urlMarketStore,
        body,
        axiosRequestConfig,
      );

      const responseMarketStore = await lastValueFrom(resultSet);
      return responseMarketStore.data;

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
