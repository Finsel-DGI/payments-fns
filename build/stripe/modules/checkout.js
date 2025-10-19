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
exports.Checkout = void 0;
class Checkout {
    constructor(stripe) {
        this.stripe = stripe;
    }
    /**
     * Retrieve a stripe payment session from checkout
     * @param {string} checkout payment link id
     * @return {Promise<Stripe.Response<Stripe.Checkout.Session>>}
     * returns stripe checkout session
     */
    getSession(checkout) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.stripe.stripe.checkout.sessions.retrieve(checkout);
        });
    }
    /**
     * Create checkout session with card setup
     * @param {StripeTypes.CardSetupCheckoutParams} params checkout parameters
     * @return {Promise<Stripe.Response<Stripe.Checkout.Session>>}
     */
    cardSetupCheckout(params) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            if (params.setup) {
                return yield this.stripe.stripe.checkout.sessions.create({
                    mode: "payment",
                    payment_method_types: ['card'],
                    payment_intent_data: {
                        setup_future_usage: 'off_session',
                        receipt_email: params.receipt_email,
                    },
                    customer: params.customer,
                    line_items: params.lineItems,
                    metadata: params.metadata,
                    success_url: params.redirects.success,
                    cancel_url: params.redirects.cancel,
                    automatic_tax: {
                        enabled: true,
                    },
                    customer_update: {
                        address: "auto",
                        shipping: "auto",
                    },
                    billing_address_collection: (_a = params.billing) !== null && _a !== void 0 ? _a : 'auto'
                });
            }
            else {
                return yield this.stripe.stripe.checkout.sessions.create({
                    mode: "payment",
                    customer: params.customer,
                    line_items: params.lineItems,
                    metadata: params.metadata,
                    success_url: params.redirects.success,
                    cancel_url: params.redirects.cancel,
                    automatic_tax: {
                        enabled: true,
                    },
                });
            }
        });
    }
    /**
     * Create checkout session
     * @param {StripeTypes.CheckoutSessionCreateParams} params checkout parameters
     * @return {Promise<Stripe.Response<Stripe.Checkout.Session>>}
     */
    create(params) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c, _d;
            const price = yield this.stripe.stripe.prices.create({
                unit_amount: Math.round(params.amount) * 100,
                currency: ((_a = params.currency) !== null && _a !== void 0 ? _a : 'USD').toLowerCase(),
                tax_behavior: "exclusive",
                product: params.product,
            });
            return yield this.stripe.stripe.checkout.sessions.create({
                mode: params.mode,
                currency: params.currency,
                customer: params.customer,
                line_items: (_b = params.lineItems) !== null && _b !== void 0 ? _b : [
                    {
                        price: price.id,
                        quantity: 1,
                    },
                ],
                success_url: params.redirects.success,
                cancel_url: params.redirects.cancel,
                payment_intent_data: (_c = params.intent) !== null && _c !== void 0 ? _c : {
                    setup_future_usage: "off_session",
                    receipt_email: params.email,
                },
                automatic_tax: {
                    enabled: true,
                },
                customer_update: {
                    address: "auto",
                    shipping: "auto",
                },
                billing_address_collection: (_d = params.billing) !== null && _d !== void 0 ? _d : 'auto'
            });
        });
    }
    /**
     * Create checkout session for connected account
     * @param {StripeTypes.ConnectCheckoutParams} params connect checkout parameters
     * @return {Promise<Stripe.Response<Stripe.Checkout.Session>>}
     */
    connectCheckout(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const price = yield this.stripe.stripe.prices.create({
                unit_amount: Math.round(params.amount) * 100,
                currency: params.currency.toLowerCase(),
                tax_behavior: "exclusive",
                product: params.product,
            });
            return yield this.stripe.stripe.checkout.sessions.create({
                mode: "payment",
                currency: params.currency,
                line_items: [
                    {
                        price: price.id,
                        quantity: 1,
                    },
                ],
                success_url: params.redirects.success,
                cancel_url: params.redirects.failed,
                payment_intent_data: {
                    setup_future_usage: "off_session",
                    application_fee_amount: params.fee,
                    transfer_data: {
                        destination: params.connectID,
                    },
                    receipt_email: params.email,
                },
                billing_address_collection: "auto",
            });
        });
    }
    /**
     * Create checkout session with product prices
     * @param {StripeTypes.CheckoutWithProductPricesParams} options checkout options
     * @return {Promise<Stripe.Response<Stripe.Checkout.Session>>}
     */
    createWithProductPrices(options) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            const session = yield this.stripe.stripe.checkout.sessions.create({
                currency: options === null || options === void 0 ? void 0 : options.currency,
                customer: options === null || options === void 0 ? void 0 : options.customer,
                line_items: [
                    {
                        price: options.priceId,
                        quantity: 1,
                    },
                ],
                mode: 'subscription',
                success_url: (_a = options.redirects) === null || _a === void 0 ? void 0 : _a.success,
                cancel_url: (_b = options.redirects) === null || _b === void 0 ? void 0 : _b.cancel,
            });
            return session;
        });
    }
}
exports.Checkout = Checkout;
//# sourceMappingURL=checkout.js.map