import { Injectable } from '@nestjs/common';
import { InjectModel, Model } from 'nestjs-dynamoose';
import { CfQuote } from '../models/cfquote.model';
import { LoggerService } from 'src/adapter/Logger/logger.service';

@Injectable()
export class SelectCfQuoteService {
  constructor(
    @InjectModel('cfquote')
    private readonly model: Model<CfQuote, number>,
    private loggerService: LoggerService
  ) { }

  async findOne(key: number) {
    try {
      return await this.model.get(key);
    } catch (error) {
      if (!error.response) {
        this.loggerService.catchError(error.code, error.cause, error.message);
      }
      if (error.response.status) {
        this.loggerService.catchError(
          String(error.response.status),
          error.response.error,
          error.response.message,
        );
      } else {
        this.loggerService.catchError(
          error.response.data.statusCode,
          error.status,
          error.code,
        );
      }

    }
  }
}
