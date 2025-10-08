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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StripeService = void 0;
const stripe_1 = __importDefault(require("stripe"));
class StripeService {
    /**
     * Class main constructor
     * @param {string} apikey initialize with stripe keys
     */
    constructor(apikey) {
        this.key = apikey;
        this.stripe = new stripe_1.default(this.key, {
            apiVersion: "2025-08-27.basil",
        });
    }
    /**
     * Callable function to retrieve stripe customer
     * @param {string} customerID query customer id
     * @return {Promise<Stripe.Response<Stripe.Customer |
     *  Stripe.DeletedCustomer>>}
     returns stripe customer
    */
    getCustomer(customerID) {
        return __awaiter(this, void 0, void 0, function* () {
            const customer = yield this.stripe.customers.retrieve(customerID);
            return customer;
        });
    }
    manageCustomer(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const found = yield this.findCustomer(email);
            if (found) {
                return found;
            }
            else {
                const params = {
                    description: "Created on payment action",
                    email: email,
                };
                return yield this.stripe.customers.create(params);
            }
        });
    }
    /**
     * Create a stripe customer
     * @param {string} email customer email
     * @param {string} name partner name
     * @return {Promise<Stripe.Response<Stripe.Customer | Stripe.DeletedCustomer>>} returns customer
     */
    createPartnerCustomer(email, name) {
        return __awaiter(this, void 0, void 0, function* () {
            const params = {
                description: "akub partner account",
                email: email,
                name: name,
            };
            return yield this.stripe.customers.create(params);
        });
    }
    /**
    * Callable function to find and retrieve stripe customer using email
    * @param {string} email query email to find
    * @return {Promise<Stripe.Customer | undefined>}
     returns stripe customer
    */
    findCustomer(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const customers = yield this.stripe.customers.list({
                limit: 2,
                email: email,
            });
            if (customers.data.length < 1)
                return;
            return customers.data[0];
        });
    }
    /**
    * Create an Invoice Item with the Price, and Customer you want to charge
    * @param {string} price price data amount
    * @param {string} product stripe product data ID for the price item
    * @param {string} currency price currency
    * @param {boolean} includeTax let us know if the price is tax inclusive
    * @return {Promise<Stripe.Response<Stripe.Price>>}
    returns stripe invoice item
    */
    createPriceData(price_1, product_1, currency_1) {
        return __awaiter(this, arguments, void 0, function* (price, product, currency, includeTax = true) {
            const data = yield this.stripe.prices.create({
                unit_amount: Math.round(price) * 100,
                currency: currency.toLowerCase(),
                tax_behavior: includeTax ? "inclusive" : "exclusive",
                product: product,
            });
            return data;
        });
    }
    /**
    * Retrieve a stripe payment link
    * @param {string} link payment link id
    * @return {Promise<Stripe.Response<Stripe.PaymentLink>>}
     returns stripe invoice
    */
    getPaymentLink(link) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.stripe.paymentLinks.retrieve(link);
        });
    }
    /**
    * Retrieve a stripe payment session from checkout
    * @param {string} checkout payment link id
    * @return {Promise<Stripe.Response<Stripe.Checkout.Session>>}
     returns stripe invoice
    */
    getCheckoutSession(checkout) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.stripe.checkout.sessions.retrieve(checkout);
        });
    }
    /**
    * Retrieve a stripe payment method
    * @param {string} customer what stripe customer
    * @param {string} method what stripe customer payment method
    * @return {Promise<Stripe.Response<Stripe.PaymentMethod>>}
     returns stripe invoice
    */
    getPaymentMethod(customer, method) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.stripe.customers.
                retrievePaymentMethod(customer, method);
        });
    }
    /**
    * Get stripe payment methods
    * @param {string} id stripe account
    * @param {PaymentTypes} type stripe payment method type
    * @return {Promise<Stripe.Response<Stripe.ApiList<Stripe.PaymentMethod>>>}
     returns stripe invoice
    */
    getPaymentMethods(id_1) {
        return __awaiter(this, arguments, void 0, function* (id, type = "card") {
            return yield this.stripe.paymentMethods.list({
                customer: id,
                type: type,
            });
        });
    }
    /**
    * Retrieve a stripe payment intent
    * @param {string} id intent string
    * @return {Promise<Stripe.Response<Stripe.PaymentIntent>>}
     returns stripe invoice
    */
    paymentIntentData(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.stripe.paymentIntents.retrieve(id);
        });
    }
    cardSetupCheckout(params) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            if (params.setup) {
                return yield this.stripe.checkout.sessions.create({
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
                return yield this.stripe.checkout.sessions.create({
                    mode: "payment",
                    // payment_method_types: ['card'],
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
    checkout(params) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c, _d;
            const price = yield this.stripe.prices.create({
                unit_amount: Math.round(params.amount) * 100,
                currency: ((_a = params.currency) !== null && _a !== void 0 ? _a : 'USD').toLowerCase(),
                tax_behavior: "exclusive",
                product: params.product,
            });
            return yield this.stripe.checkout.sessions.create({
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
     * Creates a new Stripe Connect Express account and an account link for onboarding.
     * This function facilitates the creation of a new merchant account on Stripe Connect
     * and generates a URL for the merchant to complete their onboarding process.
     *
     * @param {object} params - The parameters for creating the Connect account and account link.
     * @param {string} params.refresh_url - The URL that Stripe will redirect the user to if their account link session expires.
     * @param {string} params.return_url - The URL that Stripe will redirect the user to after they complete the onboarding process.
     *                                     It can contain a `<<ACCOUNT_ID>>` placeholder which will be replaced with the actual account ID.
     * @param {object} params.company - Details about the company or business for the Connect account.
     * @param {string} params.company.name - The legal name of the company or business.
     * @param {string} params.company.email - The email address associated with the Connect account.
     * @param {Stripe.AccountCreateParams.BusinessType} params.company.business_type - The business type of the Connect account (e.g., 'individual', 'company').
     * @param {string} [params.company.country] - The country in which the account holder resides or the business is legally established (ISO 3166-1 alpha-2 country code).
     * @param {Stripe.AccountCreateParams.Capabilities} [params.capabilities] - Specific capabilities to request for the Connect account.
     *                                                                        Defaults to `card_payments` and `transfers` if not provided.
     * @returns {Promise<{connect: Stripe.Response<Stripe.AccountLink>, account: Stripe.Response<Stripe.Account>}>}
     *          A promise that resolves to an object containing the created Stripe AccountLink and the Stripe Account.
     */
    connectMerchantAfresh(params) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const account = yield this.stripe.accounts.create({
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
            const res = yield this.stripe.accountLinks.create({
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
     * Callable function to retrieve stripe connect user
     * @param {string} customerID query customer id
     * @return {Promise<Stripe.Response<Stripe.Account>>}
    */
    getConnectUser(customerID) {
        return __awaiter(this, void 0, void 0, function* () {
            const customer = yield this.stripe.accounts.retrieve(customerID);
            return customer;
        });
    }
    /**
   * Initiates a checkout session for processing payments.
   *
   * @param {Object} params - The parameters for the checkout session.
   * @param {string} params.currency - The currency in which the payment is to be made.
   * @param {string} params.product - The product identifier for which the payment is being made.
   * @param {string} params.email - The email address to which the receipt will be sent.
   * @param {number} params.amount - The amount to be charged, in the smallest currency unit.
   * @param {number} params.fee - The application fee amount to be charged, in the smallest currency unit.
   * @param {Object} params.redirects - URLs to redirect to after payment success or failure.
   * @param {string} params.redirects.success - The URL to redirect to after a successful payment.
   * @param {string} params.redirects.failed - The URL to redirect to after a failed payment.
   * @param {string} params.connectID - ID of the connected account on behalf of which the payment is taken.
   *
   * @return {Promise<Stripe.Response<Stripe.Checkout.Session>>} A promise that resolves to the created checkout session object.
   */
    connectCheckout(_a) {
        return __awaiter(this, arguments, void 0, function* ({ currency, amount, fee, redirects, connectID, product, email }) {
            const price = yield this.stripe.prices.create({
                unit_amount: Math.round(amount) * 100,
                currency: currency.toLowerCase(),
                tax_behavior: "exclusive",
                product: product,
            });
            return yield this.stripe.checkout.sessions.create({
                mode: "payment",
                currency: currency,
                line_items: [
                    {
                        price: price.id,
                        quantity: 1,
                    },
                ],
                success_url: redirects.success,
                cancel_url: redirects.failed,
                payment_intent_data: {
                    setup_future_usage: "off_session",
                    application_fee_amount: fee,
                    transfer_data: {
                        destination: connectID,
                    },
                    receipt_email: email,
                },
                billing_address_collection: "auto",
            });
        });
    }
    /**
    * Cancel a stripe payment link
    * @param {string} id what stripe link
    * @return {
    * Promise<Stripe.Response<Stripe.PaymentLink>>
    * }returns stripe invoice
    */
    cancelPayLink(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.stripe.paymentLinks.update(id, { active: false });
        });
    }
    createPortalSession(customerId, return_url) {
        return __awaiter(this, void 0, void 0, function* () {
            const session = yield this.stripe.billingPortal.sessions.create({
                customer: customerId,
                return_url: return_url,
            });
            return session;
        });
    }
    createCheckoutWithProductPrices(options) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            const session = yield this.stripe.checkout.sessions.create({
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
    /**
    * Refund a stripe payment
    * @param {string} checkout checkout ID from session
    * @param {number} amount stripe account
    * @return {Promise<Stripe.Response<Stripe.Refund> | undefined>}
     returns stripe refund object
    */
    refund(checkout, amount) {
        return __awaiter(this, void 0, void 0, function* () {
            const session = yield this.getCheckoutSession(checkout);
            const intent = session.payment_intent;
            if (!intent)
                return;
            const refund = yield this.stripe.refunds.create({
                payment_intent: intent,
                amount: amount,
            });
            return refund;
        });
    }
    /**
    * Update default payment method
    * @param {string} id stripe account
    * @return {Promise<Stripe.Response<Stripe.Customer> | undefined>}
     returns stripe invoice
    */
    updateDefaultPaymentMethod(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const account = yield this.getCustomer(id);
            if (account.deleted)
                return;
            if (account.invoice_settings.default_payment_method !== null) {
                console.log("Account already has a default payment method");
                return account;
            }
            const paymentMethods = yield this.getPaymentMethods(id);
            if ((paymentMethods).data.length < 1)
                return;
            // grab the payment method from the retrieved
            // try setting a new payment method
            const updatedData = yield this.stripe.customers.update(id, {
                invoice_settings: {
                    default_payment_method: (paymentMethods).data[0].id,
                },
            });
            return updatedData;
        });
    }
    checkIfCustomerHasDefaultPaymentMethod(customer) {
        return __awaiter(this, void 0, void 0, function* () {
            const account = yield this.getCustomer(customer);
            if (account.deleted)
                return false;
            return (account.invoice_settings.default_payment_method !== null);
        });
    }
    createPaymentLink(params) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const price = yield this.createPriceData((Math.round(params.amount)) * 100, params.product, (_a = params.currency) !== null && _a !== void 0 ? _a : "USD", params.behaviour === 'inclusive');
            return yield this.stripe.paymentLinks.create({
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
    chargeCustomerPaymentMethod(params) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            return yield this.stripe.paymentIntents.create({
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
    getDefaultPaymentMethod(cid) {
        return __awaiter(this, void 0, void 0, function* () {
            // Retrieve customer with default payment method
            const customer = yield this.stripe.customers.retrieve(cid, {
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
exports.StripeService = StripeService;
//# sourceMappingURL=index.js.map