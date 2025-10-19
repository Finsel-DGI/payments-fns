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
exports.PaymentLinks = void 0;
class PaymentLinks {
    constructor(stripe) {
        this.stripe = stripe;
    }
    /**
     * Retrieve a stripe payment link
     * @param {string} link payment link id
     * @return {Promise<Stripe.Response<Stripe.PaymentLink>>}
     * returns stripe payment link
     */
    get(link) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.stripe.stripe.paymentLinks.retrieve(link);
        });
    }
    /**
     * Cancel a stripe payment link
     * @param {string} id what stripe link
     * @return {Promise<Stripe.Response<Stripe.PaymentLink>>}
     * returns stripe payment link
     */
    cancel(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.stripe.stripe.paymentLinks.update(id, { active: false });
        });
    }
    /**
     * Create payment link
     * @param {StripeTypes.CreatePaymentLinkParams} params payment link parameters
     * @return {Promise<Stripe.Response<Stripe.PaymentLink>>}
     */
    create(params) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const price = yield this.stripe.stripe.prices.create({
                unit_amount: Math.round(params.amount) * 100,
                currency: ((_a = params.currency) !== null && _a !== void 0 ? _a : "USD").toLowerCase(),
                tax_behavior: params.behaviour === 'inclusive' ? "inclusive" : "exclusive",
                product: params.product,
            });
            return yield this.stripe.stripe.paymentLinks.create({
                line_items: [{ price: price.id, quantity: 1 }],
                after_completion: {
                    type: "redirect",
                    redirect: {
                        url: params.redirect_url
                    },
                },
                application_fee_amount: (Math.round(params.fee)) * 100,
                transfer_data: params.transfer_data,
            });
        });
    }
}
exports.PaymentLinks = PaymentLinks;
//# sourceMappingURL=payment-links.js.map