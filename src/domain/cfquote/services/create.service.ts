import { Injectable } from '@nestjs/common';
import { InjectModel, Model } from 'nestjs-dynamoose';
import { CfQuote, CfQuoteKey } from '../models/cfquote.model';
import { CreateCfQuoteInput } from '../dto/create-cfquote.dto';
import { ResponseCreateToBff } from '../dto/response-create-bff.dto';
import { LoggerService } from 'src/adapter/Logger/logger.service';

@Injectable()
export class CreateCfQuoteService {
  constructor(
    @InjectModel('cfquote')
    private readonly model: Model<CfQuote, CfQuoteKey>,
    private loggerService: LoggerService
  ) { }

  async create(input: CreateCfQuoteInput): Promise<ResponseCreateToBff> {
    try {
      const responseCreate =  await this.model.create({
        ...input,
        id: Date.now().valueOf(), //uuid.v4(),
        createdAt: new Date(),
        updateAt: new Date()
      });
      return { id: responseCreate.id,
               status: responseCreate.quote.status,
               reasons: responseCreate.quote.reasons
               };
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