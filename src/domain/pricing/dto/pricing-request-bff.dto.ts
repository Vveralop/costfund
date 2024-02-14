import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';
import { PricingLambda } from './market-response.dto';

class Rate {
  @ApiProperty()
  @IsNotEmpty()
  dayCounter: string;
  @ApiProperty()
  @IsNotEmpty()
  compounding: string;
  @ApiProperty()
  @IsNotEmpty()
  frequency: string;
}

class CashFlows {
  @ApiProperty()
  @IsNotEmpty()
  date: Date;
  @ApiProperty()
  @IsNotEmpty()
  disbursement: number;
  @ApiProperty()
  @IsNotEmpty()
  redemption: number;
}

class ForecastCurve {
  @ApiProperty()
  @IsNotEmpty()
  curveName: string;
  @ApiProperty()
  @IsNotEmpty()
  forecastCurve: string;
  @ApiProperty()
  @IsNotEmpty()
  fixingFrequency: string;
}

export class marketStoreInputDto {
  @ApiProperty()
  @IsNotEmpty()
  source: string;
}

export class PricingInputDto {
  @ApiProperty()
  @IsNotEmpty()
  side: string;
  @ApiProperty()
  @IsNotEmpty()
  source: string;
  @ApiProperty()
  @IsOptional()
  refDate: string;
  @ApiProperty()
  @IsNotEmpty()
  structure: string;
  @ApiProperty()
  @IsNotEmpty()
  startTenor: string;
  @ApiProperty()
  @IsNotEmpty()
  endTenor: string;
  @ApiProperty()
  @IsNotEmpty()
  discountCurve: string;
  @ApiProperty()
  @IsNotEmpty()
  creditSpread: string;
  @ApiProperty()
  @IsNotEmpty()
  currency: string;
  @ApiProperty()
  @IsNotEmpty()
  notional: number;
  @ApiProperty()
  @IsNotEmpty()
  paymentFrequency: string;
  @ApiProperty()
  @IsNotEmpty()
  rateType: string;
  @ApiProperty()
  @IsNotEmpty()
  rate: Rate;
  @ApiProperty()
  @IsNotEmpty()
  forecastCurve: ForecastCurve;
  @ApiProperty()
  @IsNotEmpty()
  allowMultipleDisbursements: string;
  @ApiProperty()
  @IsNotEmpty()
  cashflows: [CashFlows];
}

export class Metrics {
  metricType: string;
  format: string;
}

export class PricingRequest {
  marketStore: PricingLambda;
  instruments: PricingInputDto[];
  metrics: Metrics[]
}