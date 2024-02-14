
class ExchangeRates {
    weakCurrency: string;
    strongCurrency: string;
    value: number;
}

class RateDefinition {
    dayCounter: string;
    frequency: string;
    compounding: string;
}

class InterestRateIndex {
    tenor: string;
    rateDefinition: RateDefinition;
}

class Rate {
    dayCounter: string;
    compounding: string;
    frequency: string;
    value: number;
}

class Curves {
    refDate: string;
    curveType: string;
    curveName: string;
    currency: string;
    interestRateIndex: InterestRateIndex;
    rate: Rate;
    nodes: Nodes[]
}

class Nodes {
    date: string;
    value: number;
}

export class MarketStoreLambda {
    refDate: string;
    exchangeRates: [ExchangeRates];
    curves: [Curves];
  }

export class PricingLambda {
    evalDate: string;
    exchangeRates: [ExchangeRates];
    curves: [Curves];
  }