import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel, Model } from 'nestjs-dynamoose';
import { CfQuote } from '../models/cfquote.model';
import { LoggerService } from 'src/adapter/Logger/logger.service';

@Injectable()
export class DeleteCfQuoteService {
  constructor(
    @InjectModel('cfquote')
    private readonly model: Model<CfQuote, number>,
    private loggerService: LoggerService
  ) { }

  async delete(key: number) {
    try {
      const cfQuote = await this.model.get(key);
      if (!cfQuote){
        throw new NotFoundException;
      } else {
        await this.model.delete(key);
        return {
          statusCode: 200,
          message: 'OK',
          data: {}
        };
      }
    } catch (error) {
      if (NotFoundException)
         this.loggerService.catchError("404", 'Not found', 'Not found quote number: ' + key);

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
          error.response.statusCode,
          error.response.message,
          error.code,
        );
      }
    }
  }
}
