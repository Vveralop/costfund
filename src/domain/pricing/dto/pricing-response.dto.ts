class CashFlows {
    date: string;
    disbursement: number; 
    redemption: number; 
    fixedRateCoupons: number; 
    floatingRateCoupons: number;
}

export class PricingLambda {
    refDate: string;
    id: number;
    npv: number;
    parRate: {
        type: string;
        value: number;
        forecastCurve: string;
    }
    sensitivity: {
        couponSens: number;
        spreadSenstivity: number;
    };
    cashflows: 
        CashFlows[]
  }