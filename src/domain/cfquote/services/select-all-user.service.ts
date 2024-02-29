import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel, Model } from 'nestjs-dynamoose';
import { CfQuote, CfQuoteKey } from '../models/cfquote.model';
import { LoggerService } from 'src/adapter/Logger/logger.service';

@Injectable()
export class SelectAllUserCfQuoteService {
  constructor(
    @InjectModel('cfquote')
    private readonly model: Model<CfQuote, CfQuoteKey>,
    private loggerService: LoggerService
  ) { }

  async findAllUser(user: string): Promise<CfQuote[]> {
    try {
      const fechaInicial = Date.now()
      const filter = {
          FilterExpression: "#quoteDetails.#quoteUser = :user AND #createdAt <= :fechaInicial",
          ExpressionAttributeNames: {
              '#quoteDetails': 'quoteDetails',
              '#quoteUser': 'quoteUser',
              '#createdAt': 'createdAt'
          },
          ExpressionAttributeValues: {
            ':user': user,
            ':fechaInicial': fechaInicial
          }
      }
      const scanResponse =  await this.model.scan(filter).exec();
      //Orden descendente
      const salida = scanResponse.sort(function (a, b) {
              return b.id - a.id;
      })
      return salida
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
