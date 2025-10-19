import Stripe from "stripe";
import { Customers } from "./modules/customers";
import { PaymentMethods } from "./modules/payment-methods";
import { Payments } from "./modules/payments";
import { Checkout } from "./modules/checkout";
import { Prices } from "./modules/prices";
import { Connect } from "./modules/connect";
import { PaymentLinks } from "./modules/payment-links";
import { Billing } from "./modules/billing";
import { Subscriptions } from "./modules/subscriptions";
export declare class StripeService {
    private readonly config;
    readonly stripe: Stripe;
    readonly Customers: Customers;
    readonly PaymentMethods: PaymentMethods;
    readonly Payments: Payments;
    readonly Checkout: Checkout;
    readonly Prices: Prices;
    readonly Connect: Connect;
    readonly PaymentLinks: PaymentLinks;
    readonly Billing: Billing;
    readonly Subscriptions: Subscriptions;
    /**
     * Class main constructor
     * @param {string} apiKey initialize with stripe API key
     * @param {string} apiVersion optional API version
     */
    constructor(apiKey: string, apiVersion?: string);
}
