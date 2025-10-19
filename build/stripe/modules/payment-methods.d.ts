import { StripeService } from "..";
import Stripe from "stripe";
export declare class PaymentMethods {
    private readonly stripe;
    constructor(stripe: StripeService);
    /**
     * Retrieve a stripe payment method
     * @param {string} customer what stripe customer
     * @param {string} method what stripe customer payment method
     * @return {Promise<Stripe.Response<Stripe.PaymentMethod>>}
     * returns stripe payment method
     */
    get(customer: string, method: string): Promise<Stripe.Response<Stripe.PaymentMethod>>;
    /**
     * Get stripe payment methods
     * @param {string} id stripe account
     * @param {Stripe.PaymentMethodListParams.Type} type stripe payment method type
     * @return {Promise<Stripe.Response<Stripe.ApiList<Stripe.PaymentMethod>>>}
     * returns stripe payment methods list
     */
    list(id: string, type?: Stripe.PaymentMethodListParams.Type): Promise<Stripe.Response<Stripe.ApiList<Stripe.PaymentMethod>>>;
    /**
     * Get default payment method for customer
     * @param {string} cid customer ID
     * @return {Promise<Stripe.PaymentMethod | null>}
     */
    getDefault(cid: string): Promise<Stripe.PaymentMethod | null>;
}
