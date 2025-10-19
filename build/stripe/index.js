"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StripeService = void 0;
const stripe_1 = __importDefault(require("stripe"));
const customers_1 = require("./modules/customers");
const payment_methods_1 = require("./modules/payment-methods");
const payments_1 = require("./modules/payments");
const checkout_1 = require("./modules/checkout");
const prices_1 = require("./modules/prices");
const connect_1 = require("./modules/connect");
const payment_links_1 = require("./modules/payment-links");
const billing_1 = require("./modules/billing");
const subscriptions_1 = require("./modules/subscriptions");
class StripeService {
    /**
     * Class main constructor
     * @param {string} apiKey initialize with stripe API key
     * @param {string} apiVersion optional API version
     */
    constructor(apiKey, apiVersion) {
        this.config = {
            apiKey,
            apiVersion: apiVersion || "2025-08-27.basil",
        };
        this.stripe = new stripe_1.default(this.config.apiKey, {
            apiVersion: this.config.apiVersion,
        });
        // Initialize submodules
        this.Customers = new customers_1.Customers(this);
        this.PaymentMethods = new payment_methods_1.PaymentMethods(this);
        this.Payments = new payments_1.Payments(this);
        this.Checkout = new checkout_1.Checkout(this);
        this.Prices = new prices_1.Prices(this);
        this.Connect = new connect_1.Connect(this);
        this.PaymentLinks = new payment_links_1.PaymentLinks(this);
        this.Billing = new billing_1.Billing(this);
        this.Subscriptions = new subscriptions_1.Subscriptions(this);
    }
}
exports.StripeService = StripeService;
//# sourceMappingURL=index.js.map