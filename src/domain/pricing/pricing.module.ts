import { Module } from '@nestjs/common';
import { PricingController } from 'src/adapter/controllers/pricing';
import { PricingService } from './services';
import { LoggerService } from 'src/adapter/Logger/logger.service';
import { ConfigService } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { PricingRepository } from './repositories/pricing.repository';
import { MarketStoreRepository } from './repositories/marketstore.repository';

@Module({
    imports: [HttpModule],
    controllers: [PricingController],
    providers: [PricingService,     
        LoggerService,
        ConfigService,
        PricingRepository, MarketStoreRepository]})
export class PricingModule {}
