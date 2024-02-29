import { PricingLambda } from "src/domain/pricing/dto/pricing-response.dto";

export const PricingMock: PricingLambda = {
  refDate: '2023-10-26',
  id: 0,
  npv: 100,
  parRate: {
    type: 'Spread',
    value: 0.03,
    forecastCurve: 'SOFR',
  },
  sensitivity: {
    couponSens: 3.2,
    spreadSenstivity: 3.2,
  },
  cashflows: [
    {
        "date": "2023-05-25",
        "disbursement": 100,
        "redemption": 0,
        "fixedRateCoupons": 0,
        "floatingRateCoupons": 0
    },
    {
        "date": "2023-06-25",
        "disbursement": 0,
        "redemption": 25,
        "fixedRateCoupons": 0,
        "floatingRateCoupons": 0
    },
    {
        "date": "2023-07-25",
        "disbursement": 0,
        "redemption": 25,
        "fixedRateCoupons": 0,
        "floatingRateCoupons": 0
    },
    {
        "date": "2023-08-25",
        "disbursement": 0,
        "redemption": 25,
        "fixedRateCoupons": 0,
        "floatingRateCoupons": 0
    },
    {
        "date": "2023-09-25",
        "disbursement": 0,
        "redemption": 25,
        "fixedRateCoupons": 0,
        "floatingRateCoupons": 0
    },
    {
        "date": "2023-10-25",
        "disbursement": 0,
        "redemption": 25,
        "fixedRateCoupons": 0,
        "floatingRateCoupons": 0
    },
    {
        "date": "2023-11-25",
        "disbursement": 0,
        "redemption": 25,
        "fixedRateCoupons": 0,
        "floatingRateCoupons": 0
    },
    {
        "date": "2023-12-25",
        "disbursement": 0,
        "redemption": 25,
        "fixedRateCoupons": 0,
        "floatingRateCoupons": 0
    },
    {
        "date": "2024-01-25",
        "disbursement": 0,
        "redemption": 25,
        "fixedRateCoupons": 0,
        "floatingRateCoupons": 0
    },
    {
        "date": "2024-02-25",
        "disbursement": 0,
        "redemption": 25,
        "fixedRateCoupons": 0,
        "floatingRateCoupons": 0
    },
    {
      "date": "2024-03-25",
      "disbursement": 0,
      "redemption": 25,
      "fixedRateCoupons": 0,
      "floatingRateCoupons": 0
    },
    {
      "date": "2024-04-25",
      "disbursement": 0,
      "redemption": 25,
      "fixedRateCoupons": 0,
      "floatingRateCoupons": 0
    }
],
};
