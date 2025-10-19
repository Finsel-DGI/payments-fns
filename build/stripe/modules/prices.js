"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Prices = void 0;
class Prices {
    constructor(stripe) {
        this.stripe = stripe;
    }
    /**
     * Create an Invoice Item with the Price, and Customer you want to charge
     * @param {StripeTypes.CreatePriceDataParams} params price creation parameters
     * @return {Promise<Stripe.Response<Stripe.Price>>}
     * returns stripe price
     */
    create(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield this.stripe.stripe.prices.create({
                unit_amount: Math.round(params.price) * 100,
                currency: params.currency.toLowerCase(),
                tax_behavior: params.includeTax ? "inclusive" : "exclusive",
                product: params.product,
            });
            return data;
        });
    }
}
exports.Prices = Prices;
//# sourceMappingURL=prices.js.map