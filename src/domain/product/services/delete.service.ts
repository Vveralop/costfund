import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel, Model } from 'nestjs-dynamoose';
import { Product, ProductKey } from '../../../domain/product/models/product.model';
import { LoggerService } from 'src/adapter/Logger/logger.service';

@Injectable()
export class DeleteProductService {
  constructor(
    @InjectModel('product')
    private readonly model: Model<Product, ProductKey>,
    private loggerService: LoggerService
  ) { }

  async delete(key: ProductKey) {
    try {
      const product = await this.model.get(key);
      if (!product){
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
         this.loggerService.catchError("404", 'Not found', 'Not found productos number: ' + key);

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
