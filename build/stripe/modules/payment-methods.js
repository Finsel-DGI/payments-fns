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
exports.PaymentMethods = void 0;
class PaymentMethods {
    constructor(stripe) {
        this.stripe = stripe;
    }
    /**
     * Retrieve a stripe payment method
     * @param {string} customer what stripe customer
     * @param {string} method what stripe customer payment method
     * @return {Promise<Stripe.Response<Stripe.PaymentMethod>>}
     * returns stripe payment method
     */
    get(customer, method) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.stripe.stripe.customers.retrievePaymentMethod(customer, method);
        });
    }
    /**
     * Get stripe payment methods
     * @param {string} id stripe account
     * @param {Stripe.PaymentMethodListParams.Type} type stripe payment method type
     * @return {Promise<Stripe.Response<Stripe.ApiList<Stripe.PaymentMethod>>>}
     * returns stripe payment methods list
     */
    list(id_1) {
        return __awaiter(this, arguments, void 0, function* (id, type = "card") {
            return this.stripe.stripe.paymentMethods.list({
                customer: id,
                type: type,
            });
        });
    }
    /**
     * Get default payment method for customer
     * @param {string} cid customer ID
     * @return {Promise<Stripe.PaymentMethod | null>}
     */
    getDefault(cid) {
        return __awaiter(this, void 0, void 0, function* () {
            // Retrieve customer with default payment method
            const customer = yield this.stripe.stripe.customers.retrieve(cid, {
                expand: ['invoice_settings.default_payment_method']
            });
            if (customer.deleted) {
                return null;
            }
            const defaultPaymentMethod = customer.invoice_settings.default_payment_method;
            if (defaultPaymentMethod) {
                return defaultPaymentMethod;
            }
            else {
                return null;
            }
        });
    }
}
exports.PaymentMethods = PaymentMethods;
//# sourceMappingURL=payment-methods.js.map