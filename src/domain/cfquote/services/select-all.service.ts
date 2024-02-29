import { Injectable } from '@nestjs/common';
import { InjectModel, Model } from 'nestjs-dynamoose';
import { CfQuote, CfQuoteKey } from '../models/cfquote.model';
import { LoggerService } from 'src/adapter/Logger/logger.service';

@Injectable()
export class SelectAllCfQuoteService {
  constructor(
    @InjectModel('cfquote')
    private readonly model: Model<CfQuote, CfQuoteKey>,
    private loggerService: LoggerService
  ) { }

  async findAll(): Promise<CfQuote[]> {
    try {
      const initialDate = new Date();
      const fechaInicial = initialDate.setMonth(initialDate.getMonth()-2)

      const filter = {
        FilterExpression: '#createdAt >= :fechaInicial',
        ExpressionAttributeNames: {
          '#createdAt': 'createdAt'
        },
        ExpressionAttributeValues: {
          ':fechaInicial': fechaInicial
        }
      }
      const scanResponse =  await this.model.scan(filter).exec();
      //Orden descendente
      const salida = scanResponse.sort(function (a, b) {
        return b.id - a.id;
      })
      return salida
      //.query().startAt({"id": startkey}).sort(SortOrder.descending).exec();
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
