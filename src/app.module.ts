import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { Database } from './adapter/database/database.module';
import { HealthModule } from './domain/health/health.module';
import { InterceptorModule } from './shared/interceptor/interceptor.module';
import { UtilsModule } from './shared/utils/utils.module';
import { LoggerModule } from './adapter/Logger/logger.module';
//import { FundingModule } from './domain/funding/funding.module';
import { ProductModule } from './domain/product/product.module';
import { CfquoteModule } from './domain/cfquote/cfquote.module';
import { PricingModule } from './domain/pricing/pricing.module';

@Module({
  imports: [
    UtilsModule,
    ConfigModule.forRoot({isGlobal: true}),
    Database,
    InterceptorModule,
    LoggerModule,
    HealthModule,
    //FundingModule,
    ProductModule,
    CfquoteModule,
    PricingModule
  ],
  controllers: [],
})
export class AppModule {}

