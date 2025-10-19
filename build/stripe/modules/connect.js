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
exports.Connect = void 0;
class Connect {
    constructor(stripe) {
        this.stripe = stripe;
    }
    /**
     * Creates a new Stripe Connect Express account and an account link for onboarding.
     * This function facilitates the creation of a new merchant account on Stripe Connect
     * and generates a URL for the merchant to complete their onboarding process.
     *
     * @param {StripeTypes.ConnectMerchantParams} params - The parameters for creating the Connect account and account link.
     * @returns {Promise<{connect: Stripe.Response<Stripe.AccountLink>, account: Stripe.Response<Stripe.Account>}>}
     *          A promise that resolves to an object containing the created Stripe AccountLink and the Stripe Account.
     */
    createMerchant(params) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const account = yield this.stripe.stripe.accounts.create({
                type: "express",
                country: params.company.country,
                company: {
                    name: params.company.name,
                },
                capabilities: (_a = params.capabilities) !== null && _a !== void 0 ? _a : {
                    card_payments: { requested: true },
                    transfers: { requested: true }
                },
                business_type: params.company.business_type,
                email: params.company.email
            });
            const res = yield this.stripe.stripe.accountLinks.create({
                account: account.id,
                refresh_url: params.refresh_url,
                return_url: params.return_url.replace("<<ACCOUNT_ID>>", account.id),
                type: "account_onboarding",
            });
            return {
                connect: res,
                account,
            };
        });
    }
    /**
     * Retrieve stripe connect user
     * @param {string} customerID query customer id
     * @return {Promise<Stripe.Response<Stripe.Account>>}
     */
    getAccount(customerID) {
        return __awaiter(this, void 0, void 0, function* () {
            const customer = yield this.stripe.stripe.accounts.retrieve(customerID);
            return customer;
        });
    }
}
exports.Connect = Connect;
//# sourceMappingURL=connect.js.map