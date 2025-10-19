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
exports.Payments = void 0;
class Payments {
    constructor(stripe) {
        this.stripe = stripe;
    }
    /**
     * Retrieve a stripe payment intent
     * @param {string} id intent string
     * @return {Promise<Stripe.Response<Stripe.PaymentIntent>>}
     * returns stripe payment intent
     */
    getPaymentIntent(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.stripe.stripe.paymentIntents.retrieve(id);
        });
    }
    /**
     * Charge customer payment method
     * @param {StripeTypes.ChargeCustomerParams} params charge parameters
     * @return {Promise<Stripe.Response<Stripe.PaymentIntent>>}
     */
    chargeCustomer(params) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            return this.stripe.stripe.paymentIntents.create({
                amount: params.amount,
                currency: (_a = params.currency) !== null && _a !== void 0 ? _a : 'NGN',
                payment_method: params.method,
                confirm: true,
                customer: params.customer,
                automatic_payment_methods: {
                    enabled: true,
                    allow_redirects: 'never',
                }
            });
        });
    }
    /**
     * Refund a stripe payment
     * @param {string} checkout checkout ID from session
     * @param {number} amount stripe account
     * @return {Promise<Stripe.Response<Stripe.Refund> | undefined>}
     * returns stripe refund object
     */
    refund(checkout, amount) {
        return __awaiter(this, void 0, void 0, function* () {
            const session = yield this.stripe.Checkout.getSession(checkout);
            const intent = session.payment_intent;
            if (!intent)
                return;
            const refund = yield this.stripe.stripe.refunds.create({
                payment_intent: intent,
                amount: amount,
            });
            return refund;
        });
    }
}
exports.Payments = Payments;
//# sourceMappingURL=payments.js.map