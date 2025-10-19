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
exports.Billing = void 0;
class Billing {
    constructor(stripe) {
        this.stripe = stripe;
    }
    /**
     * Create billing portal session
     * @param {string} customerId customer ID
     * @param {string} return_url return URL
     * @return {Promise<Stripe.Response<Stripe.BillingPortal.Session>>}
     */
    createPortalSession(customerId, return_url) {
        return __awaiter(this, void 0, void 0, function* () {
            const session = yield this.stripe.stripe.billingPortal.sessions.create({
                customer: customerId,
                return_url: return_url,
            });
            return session;
        });
    }
}
exports.Billing = Billing;
//# sourceMappingURL=billing.js.map