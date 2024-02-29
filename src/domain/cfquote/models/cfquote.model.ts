
import { ProductKey } from 'src/domain/product/models/product.model';
import { CreateCfQuoteInput } from '../dto/create-cfquote.dto';

export class CfQuoteKey {
  id: number;
};

class ForecastCurve {
  curveName: string;
  forecastCurve: string;
  fixingFrequency: string;
}

class QuoteDetail {
  clientAssingedUser: string;
  quoteUser: string;
  quoteUserName: string;
  rut:string;
  name:string;
  segment:string;
  comment: string;
}

class cashflowsInstrument {
  date: string;
  disbursement: number;
  redemption: number;
}

class cashFlowsPricing {
  date: string;
  disbursement: number;
  redemption: number;
  fixedRateCoupon: number;
  floatingRateCoupon: number;
}

class Rate {
  dayCounter: string;
  compounding: string; 
  frequency: string;
}

class Instrument {
  side: string;
  source: string;
  structure: string;
  startTenor: string;
  endTenor: string;
  discountCurve: string;
  creditSpread: number;
  currency: string;
  notional: number;
  paymentFrequency: string;
  rateType: string;
  rate: Rate;
  forecastCurve: ForecastCurve;
  allowMultipleDisbursements: boolean;
  cashflows: [cashflowsInstrument];
}

class ParRate {
  type: string;
  value: number;
  forecastCurve: string;
}

class Sensitivity {
  couponSens: number;
  spreadSenstivity: number;
}

class pricingData {
  refDate: string;
  id: number;
  npv: number;
  parRate: ParRate;
  sensitivity: Sensitivity;
  cashflows: [cashFlowsPricing];
}

class Quote {
  status: string;
  validUntil: string;
  approvedBy: string;
  approvedByName: string;
  comment: string;
  reasons: [string];
}

export class CfQuote extends CreateCfQuoteInput {
  id: number;
  idCategory: ProductKey;
  idProduct: string;
  productName: string;
  category: string;
  quote: Quote;
  quoteDetails: QuoteDetail;
  instrument: Instrument;
  pricing: pricingData;
  updateAt: Date;
  createdAt: Date;
}
