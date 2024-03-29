import { Schema } from 'dynamoose';

export const ProductSchema = new Schema({
    id: {
        type: String,
        hashKey: true
      },
    category: {
        type: String
    },
    description:  {
        type: String,
    },
    productType: {
        type: String,
    },
    options: {
        type: Array,
        schema: [{
          type: Object,
          schema: {
            id: {
                type: String,
            },
            productName: {
                type: String,
            },
            description: {
                type: String,
            },
            isActive: {
                type: Boolean,
            },
            rateType: {
                type: String,
            },
            structure: {
                type: String,
            },
            allowMultipleDisbursements: {
                type: Boolean,
            },
            currency: {
                type: String,
            },
            minNotional: {
                type: Number,
            },
            maxNotional: {
                type: Number,
            },
            minStartTenor: {
                type: String,
            },
            maxStartTenor: {
                type: String,
            },
            minEndTenor: {
                type: String,
            },
            maxEndTenor: {
                type: String,
            },
            discountCurve: {
                type: String,
            },
            forecastCurves: {
                type: Array,
                schema: [{
                  type: Object,
                  schema: {
                    curveName: {
                        type: String,
                    },
                    forecastCurve: {
                        type: String,
                    },
                    fixingFrequency: {
                        type: String,
                    },
                  }
                }]
            },
            paymentFrequencies: {
                type: Array,
                schema: [String]
            },
            rate: {
                type: Object,
                schema: {
                    compounding: {
                        type: String,
                    },
                    dayCounter: {
                        type: String,
                    },
                    frequency: {
                        type: String,
                    }
                }
            }
          }
        }]
    },
    createAt: {
        type: Date,
      },
    updateAt: {
        type: Date,
      },
});