import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Database } from './adapter/database/database.module';
import { ProductModule } from './domain/product/product.module';
import { CfquoteModule } from './domain/cfquote/cfquote.module';
import { HealthModule } from './domain/health/health.module';
import { ConfigModule } from '@nestjs/config';
import { PricingModule } from './domain/pricing/pricing.module';
import { LoggerModule } from './adapter/Logger/logger.module';
import { InterceptorModule } from './shared/interceptor/interceptor.module';
import { UtilsModule } from './shared/utils/utils.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    Database,
    InterceptorModule,
    HealthModule,
    UtilsModule,
    LoggerModule,
    PricingModule,
    ProductModule,
    CfquoteModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
