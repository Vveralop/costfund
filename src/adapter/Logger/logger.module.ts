import { LoggerModule as LM } from 'nestjs-pino';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { IncomingMessage } from 'http';
import { DateTime } from 'luxon';
import {
  SPAN_ID,
  TRANSACTION_ID,
  PARENT_ID,
  CONSUMER_ID,
} from '../../shared/utils/constants';
import { HeadersMiddleware } from '../../shared/middleware/headers.middleware';
import { LoggerService } from './logger.service';
import { randomUUID } from 'crypto';

@Module({
  imports: [
    LM.forRoot({
      pinoHttp: {
        transport:
          process.env.ENVIRONMENT === 'dev'
            ? {
                target: 'pino-pretty',
                options: {
                  ignore: 'time',
                },
              }
            : undefined,
        useLevel: process.env.ENVIRONMENT === 'dev' ? 'debug' : 'info',
        messageKey: 'message',
        autoLogging: true,
        base: null,
        customProps: (req: IncomingMessage) => {
          return {
            consumer: req.headers[CONSUMER_ID] ?? randomUUID(),
            spanID: req.headers[SPAN_ID] ?? randomUUID(),
            payload: '{req.body}',
            parentID: req.headers[PARENT_ID] ?? randomUUID(),
            transactionID: req.headers[TRANSACTION_ID] ?? randomUUID(),
            type: process.env.TYPE,
            env: process.env.ENVIRONMENT,
            timestamp: DateTime.local().setZone('America/Santiago').toISO(),
            component: process.env.COMPONENT,
            method: req.method,
          };
        },
        formatters: {
          level: (label: any) => ({
            level: undefined,
            severity: label.toUpperCase(),
          }),
        },
        serializers: {
          req: (_req: any) => () => {
            return undefined;
          },
          res: (_res: any) => {
            return undefined;
          },
        },
      },
    }),
  ],
  providers: [LoggerService],
  exports: [LoggerService],
})
export class LoggerModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(HeadersMiddleware).forRoutes('');
  }
}
