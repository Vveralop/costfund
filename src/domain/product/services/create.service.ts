import { Injectable } from '@nestjs/common';
import { InjectModel, Model } from 'nestjs-dynamoose';
import { Product, ProductKey } from '../models/product.model';
import { CreateProductInput } from '../dto/create-product.dto';
import { LoggerService } from 'src/adapter/Logger/logger.service';
import * as uuid from 'uuid';

@Injectable()
export class CreateProductService {
  constructor(
    @InjectModel('product')
    private readonly model: Model<Product, ProductKey>,
    private loggerService: LoggerService
  ) { }

  async create(input: CreateProductInput) {
    try {
      return await this.model.create({
        ...input,
        id: uuid.v4(),
        createAt: new Date(),
        updateAt: new Date()
      });
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
