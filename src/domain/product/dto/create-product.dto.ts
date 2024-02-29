import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

class ForecastCurve {
  @ApiProperty()
  curveName: string;
  @ApiProperty()
  forecastCurve: string;
  @ApiProperty()
  fixingFrequency: string;
}

class rate {
  @ApiProperty()
  compounding: string;
  @ApiProperty()
  dayCounter: string;
  @ApiProperty()
  frequency: string;
}

class _Options {
  @ApiProperty()
  @IsNotEmpty()
  id: string;

  @ApiProperty()
  @IsNotEmpty()
  productName: string;

  @ApiProperty()
  @IsNotEmpty()
  description: string;

  @ApiProperty()
  @IsNotEmpty()
  rateType: string;

  @IsNotEmpty()
  isActive: boolean;

  @ApiProperty()
  @IsNotEmpty()
  structure: string;

  @ApiProperty()
  @IsNotEmpty()
  allowMultipleDisbursements: boolean;

  @ApiProperty()
  @IsNotEmpty()
  currency: string;

  @ApiProperty()
  @IsNotEmpty()
  minNotional: number;

  @ApiProperty()
  @IsNotEmpty()
  maxNotional: number;

  @IsNotEmpty()
  minStartTenor: string;

  @ApiProperty()
  @IsNotEmpty()
  maxStartTenor: string;

  @ApiProperty()
  @IsNotEmpty()
  minEndTenor: string;

  @ApiProperty()
  @IsNotEmpty()
  maxEndTenor: string;

  @ApiProperty()
  @IsNotEmpty()
  discountCurve: string;

  @ApiProperty({
    type: ForecastCurve,
    isArray: true,
  })
  forecastCurves: [ ForecastCurve ];

  @ApiProperty()
  @IsNotEmpty()
  paymentFrequencies: [ string ];

  @ApiProperty()
  @IsNotEmpty()
  rate: rate;
}

export class CreateProductInput {
  @ApiProperty()
  @IsNotEmpty()
  category: string;

  @ApiProperty()
  @IsNotEmpty()
  description: string;
  
  @ApiProperty()
  @IsNotEmpty()
  productType: string;

  @ApiProperty({
    type: _Options,
    isArray: true,
  })
  @IsNotEmpty()
  options: [ _Options ];
}