import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDefined, IsNotEmpty, IsOptional, ValidateNested } from 'class-validator';
import { ProductKey } from 'src/domain/product/models/product.model';

class ForecastCurve {
    @ApiProperty()
    @IsOptional()
    curveName: string;
    @ApiProperty()
    @IsOptional()
    forecastCurve: string;
    @ApiProperty()
    @IsOptional()
    fixingFrequency: string;
  }
  
class QuoteDetail {
    @ApiProperty()
    @IsNotEmpty()
    @IsDefined()
    clientAssingedUser: string;
    @ApiProperty()
    @IsNotEmpty()
    @IsDefined()
    quoteUser: string;
    @ApiProperty()
    @IsNotEmpty()
    @IsDefined()
    quoteUserName: string;
    @ApiProperty()
    @IsNotEmpty()
    @IsDefined()
    rut: string;
    @ApiProperty()
    @IsNotEmpty()
    @IsDefined()
    name: string;
    @ApiProperty()
    @IsNotEmpty()
    @IsDefined()
    segment: string;
    @ApiProperty()
    @IsDefined()
    comment: string;
  }
  
  class cashflowsInstrument {
    @ApiProperty()
    @IsOptional()
    date: string;
    @ApiProperty()
    @IsOptional()
    disbursement: number;
    @ApiProperty()
    @IsOptional()
    redemption: number;
  }
  
  class cashFlowsPricing {
    @ApiProperty()
    @IsOptional()
    date: string;
    @ApiProperty()
    @IsOptional()
    disbursement: number;
    @ApiProperty()
    @IsOptional()
    redemption: number;
    @ApiProperty()
    @IsOptional()
    fixedRateCoupon: number;
    @ApiProperty()
    @IsOptional()
    floatingRateCoupon: number;
  }
  
  class Rate {
    @ApiProperty()
    @IsOptional()
    dayCounter: string;
    @ApiProperty()
    @IsOptional()
    compounding: string;
    @ApiProperty()
    @IsOptional()
    frequency: string;
  }
  
  class Instrument {
    @ApiProperty()
    @IsNotEmpty()
    @IsDefined()
    side: string;
    @ApiProperty()
    @IsNotEmpty()
    @IsDefined()
    source: string;
    @ApiProperty()
    @IsNotEmpty()
    @IsDefined()
    structure: string;
    @ApiProperty()
    @IsNotEmpty()
    @IsDefined()
    startTenor: string;
    @ApiProperty()
    @IsNotEmpty()
    @IsDefined()
    endTenor: string;
    @ApiProperty()
    @IsNotEmpty()
    @IsDefined()
    discountCurve: string;
    @ApiProperty()
    @IsNotEmpty()
    @IsDefined()
    creditSpread: number;
    @ApiProperty()
    @IsNotEmpty()
    @IsDefined()
    currency: string;
    @ApiProperty()
    @IsNotEmpty()
    @IsDefined()
    notional: number;
    @ApiProperty()
    @IsNotEmpty()
    @IsDefined()
    paymentFrequency: string;
    @ApiProperty()
    @IsNotEmpty()
    @IsDefined()
    rateType: string;
    @ApiProperty({
        type: Rate,
        isArray: false,
    })
    @IsNotEmpty()
    @ValidateNested()
    @Type(() => Rate)
    rate: Rate;

    @ApiProperty({
      type: ForecastCurve,
      isArray: false,
    })
    @IsNotEmpty()
    @ValidateNested()
    @Type(() => ForecastCurve)
    forecastCurve: ForecastCurve;
    @ApiProperty()
    @IsNotEmpty()
    @IsDefined()
    allowMultipleDisbursements: boolean;

    @ApiProperty({
        type: cashflowsInstrument,
        isArray: true,
    })
    @IsNotEmpty()
    @ValidateNested()
    @Type(() => cashflowsInstrument)
    cashflows: [ cashflowsInstrument ]
  }
  
  class ParRate {
    @ApiProperty()
    @IsNotEmpty()
    @IsDefined()
    type: string;
    @ApiProperty()
    @IsNotEmpty()
    @IsDefined()
    value: number;
    @ApiProperty()
    @IsOptional()
    forecastCurve: string;
  }
  
  class Sensitivity {
    @ApiProperty()
    @IsOptional()
    couponSens: number;
    @ApiProperty()
    @IsOptional()
    spreadSenstivity: number;
  }
  
  class pricingData {
    @ApiProperty()
    @IsOptional()
    refDate: string;
    @ApiProperty()
    @IsNotEmpty()
    @IsDefined()
    id: number;
    @ApiProperty()
    @IsNotEmpty()
    @IsDefined()
    npv: number;
    @ApiProperty()
    @IsNotEmpty()
    @IsDefined()
    @ValidateNested()
    @Type(() => ParRate)
    parRate: ParRate;
    @ApiProperty({
      type: Sensitivity,
      isArray: false,
    })
    @Type(() => Sensitivity)
    @ValidateNested()
    sensitivity: Sensitivity;
    @ApiProperty({
        type: cashFlowsPricing,
        isArray: true,
    })
    @ValidateNested()
    @IsOptional()
    @Type(() => cashFlowsPricing)
    cashflows: [
        cashFlowsPricing
    ]
  }
  
  class Quote {
    @ApiProperty()
    @IsNotEmpty()
    @IsDefined()
    status: string;
    @ApiProperty()
    @IsOptional()
    validUntil: string;
    @ApiProperty()
    @IsDefined()
    approvedBy: string;
    @ApiProperty()
    @IsDefined()
    approvedByName: string;
    @ApiProperty()
    @IsOptional()
    comment: string;
    @ApiProperty({
        type: String,
        isArray: true,
    })
    @IsOptional()
    reasons: [string];
  }
  
  export class UpdateCfQuoteInput {
    @ApiProperty()
    @IsNotEmpty()
    @IsDefined()
    idCategory: ProductKey;
  
    @ApiProperty()
    @IsNotEmpty()
    @IsDefined()
    idProduct: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsDefined()
    productName: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsDefined()
    category: string;

    @ApiProperty({
        type: Quote,
        isArray: false,
    })
    @IsNotEmpty()
    @ValidateNested()
    @Type(() => Quote)
    quote: Quote;
  
    @ApiProperty({
        type: QuoteDetail,
        isArray: false,
    })
    @IsNotEmpty()
    @ValidateNested()
    @Type(() => QuoteDetail)
    quoteDetails: QuoteDetail;
  
    @ApiProperty({
        type: Instrument,
        isArray: false,
    })
    @IsNotEmpty()
    @ValidateNested()
    @Type(() => Instrument)
    instrument: Instrument;
  
    @ApiProperty({
        type: pricingData,
        isArray: false,
    })
    @IsNotEmpty()
    @ValidateNested()
    @Type(() => pricingData)
    pricing: pricingData
  
    @ApiProperty()
    updateAt: Date;
    @ApiProperty()
    createdAt: Date;
  }