import { PricingLambda } from './pricing-response.dto';

export class ResultBffPricing {
  statusCode: number;
  message: string;
  data:  PricingLambda ;
}