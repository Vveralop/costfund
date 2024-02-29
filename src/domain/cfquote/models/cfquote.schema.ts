import { Schema } from 'dynamoose';

//Ajuste hecho con objeto definido al 14-09-2023
export const CfQuoteSchema = new Schema({
    id: {
        type: Number,
        hashKey: true,
    },
    idCategory: String,
    idProduct: String,
    productName: String,
    category: String,
    quote: {
        type: Object,
        schema: {
            status: String,
            validUntil: String,
            approvedBy: String,
            approvedByName: String,
            comment: String,
            reasons: {
                type: Array,
                schema: [String]
            }
        }
    },
    quoteDetails: {
        type: Object,
        schema: {
        clientAssingedUser: String,
        quoteUser: String,
        quoteUserName: String,
        rut:String,
        name:String,
        segment:String,
        comment: String
      }
    },
    instrument: {
        type: Object,
        schema: {
            side: String,
            source: String,
            structure: String,
            startTenor: String,
            endTenor: String,
            discountCurve: String,
            creditSpread: Number,
            currency: String,
            notional: Number,
            paymentFrequency: String,
            rateType: String,
            rate: { 
                type: Object,
                schema: {
                    dayCounter: String,
                    compounding: String,
                    frequency: String
                }
            },
            forecastCurve: {
                type: Object,
                schema: {
                    curveName: String,
                    forecastCurve: String,
                    fixingFrequency: String
                }
            },
            allowMultipleDisbursements: Boolean,
            cashflows: {
                type: Array,
                schema: [{
                    type: Object,
                    schema: {
                        date: String,
                        disbursement: Number,
                        redemption: Number
                    }
                }]
            }
        }
    },
    pricing: {
        type: Object,
        schema: {
            refDate: String,
            id: Number,
            npv: Number,
            parRate: {
                type: Object,
                schema: {
                    type: String,
                    value: Number,
                    forecastCurve: String
                }
            },
            sensitivity: {
                type: Object,
                schema: {
                    couponSens: Number,
                    spreadSenstivity: Number
                }
            },
            cashflows: {
                type: Array,
                schema: [{
                type: Object,
                schema: {
                    date: String,
                    disbursement: Number,
                    redemption: Number,
                    fixedRateCoupons: Number,
                    floatingRateCoupons: Number
                } 
                }]
            }
        }
    },
    updateAt: Date,
    createdAt: Date
});