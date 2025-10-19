import { StripeService } from "..";
import Stripe from "stripe";
export declare class Billing {
    private readonly stripe;
    constructor(stripe: StripeService);
    /**
     * Create billing portal session
     * @param {string} customerId customer ID
     * @param {string} return_url return URL
     * @return {Promise<Stripe.Response<Stripe.BillingPortal.Session>>}
     */
    createPortalSession(customerId: string, return_url: string): Promise<Stripe.Response<Stripe.BillingPortal.Session>>;
}
