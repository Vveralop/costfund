import { CreateProductInput } from '../dto/create-product.dto';

export type ProductKey = {
  id: string;
};

class ForecastCurve {
    curveName: string;
    forecastCurve: string;
    fixingFrequency: string;
}

class rate {
    compounding: string;
    dayCounter: string;
    frequency: string;
}

class _Options {
    id: string;
    productName: string;
    description: string;
    isActive: boolean;
    rateType: string;
    structure: string;
    allowMultipleDisbursements: boolean;
    currency: string;
    minNotional: number;
    maxNotional: number;
    minStartTenor: string;
    maxStartTenor: string;
    minEndTenor: string;
    maxEndTenor: string;
    discountCurve: string;
    forecastCurves: [ ForecastCurve ];
    paymentFrequencies: [ string ];
    rate: rate;
}

export class Product extends CreateProductInput {
    id: string;
    category: string;
    description: string;
    productType: string;
    options: [ _Options ];
    createAt: Date;
    updateAt: Date;
  }