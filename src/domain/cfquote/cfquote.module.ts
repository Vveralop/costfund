import { DynamooseModule } from 'nestjs-dynamoose'
import {
  CreateCfQuoteController,
  DeleteCfQuoteController,
  SelectAllCfQuoteController,
  SelectAllUserCfQuoteController,
  SelectCfQuoteController,
  UpdateCfQuoteController,
} from 'src/adapter/controllers/cfquote'

import { Module } from '@nestjs/common'

import { CfQuoteSchema } from './models/cfquote.schema'
import {
  CreateCfQuoteService,
  DeleteCfQuoteService,
  SelectAllCfQuoteService,
  SelectAllUserCfQuoteService,
  SelectCfQuoteService,
  UpdateCfQuoteService,
} from './services'
import { LoggerService } from 'src/adapter/Logger/logger.service'

@Module({
  imports: [
    DynamooseModule.forFeature([
      {
        name: 'cfquote',
        schema: CfQuoteSchema,
      },
    ]),
  ],
  controllers: [
    CreateCfQuoteController,
    DeleteCfQuoteController,
    UpdateCfQuoteController,
    SelectAllCfQuoteController,
    SelectAllUserCfQuoteController,
    SelectCfQuoteController,
  ],
  providers: [
    LoggerService,
    CreateCfQuoteService,
    DeleteCfQuoteService,
    UpdateCfQuoteService,
    SelectAllCfQuoteService,
    SelectAllUserCfQuoteService,
    SelectCfQuoteService,
  ],
})
export class CfquoteModule {}

