import { Injectable } from '@nestjs/common';
import { InjectModel, Model } from 'nestjs-dynamoose';
import { Product, ProductKey } from '../models/product.model';
import { LoggerService } from 'src/adapter/Logger/logger.service';

@Injectable()
export class SelectAllProductService {
  constructor(
    @InjectModel('product')
    private readonly model: Model<Product, ProductKey>,
    private loggerService: LoggerService
  ) { }

  async findAll() {
    try {
      return  await this.model.scan().exec()
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
