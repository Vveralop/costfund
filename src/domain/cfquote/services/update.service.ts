import { Injectable } from '@nestjs/common';
import { InjectModel, Model } from 'nestjs-dynamoose';
import { CfQuote } from '../models/cfquote.model';
import { UpdateCfQuoteInput } from '../dto/update-cfquote.dto';
import { ResponseUpdateToBff } from '../dto/response-update-bff.dto';
import { LoggerService } from 'src/adapter/Logger/logger.service';

@Injectable()
export class UpdateCfQuoteService {
  constructor(
    @InjectModel('cfquote')
    private readonly model: Model<CfQuote, number>,
    private loggerService: LoggerService
  ) { }

  async update(key: number, input: UpdateCfQuoteInput): Promise<ResponseUpdateToBff> {
    try {
      const statusAccepts = ['Rejected', 'Approved'];
      const validStat = statusAccepts.filter((e) => e == input.quote.status);
      const searchById = await this.model.get(key);
      if (searchById.quote.status === 'Pending' && validStat.length > 0) {
          const responseUpdate =  await this.model.update(key, input);
          return { 
            id: responseUpdate.id,
            status: responseUpdate.quote.status
          }     
      }else{
          return { 
            id: searchById.id,
            status: searchById.quote.status
          };
      }
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
