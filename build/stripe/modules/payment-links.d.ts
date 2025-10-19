import { StripeService } from "..";
import { StripeTypes } from "../types";
import Stripe from "stripe";
export declare class PaymentLinks {
    private readonly stripe;
    constructor(stripe: StripeService);
    /**
     * Retrieve a stripe payment link
     * @param {string} link payment link id
     * @return {Promise<Stripe.Response<Stripe.PaymentLink>>}
     * returns stripe payment link
     */
    get(link: string): Promise<Stripe.Response<Stripe.PaymentLink>>;
    /**
     * Cancel a stripe payment link
     * @param {string} id what stripe link
     * @return {Promise<Stripe.Response<Stripe.PaymentLink>>}
     * returns stripe payment link
     */
    cancel(id: string): Promise<Stripe.Response<Stripe.PaymentLink>>;
    /**
     * Create payment link
     * @param {StripeTypes.CreatePaymentLinkParams} params payment link parameters
     * @return {Promise<Stripe.Response<Stripe.PaymentLink>>}
     */
    create(params: StripeTypes.CreatePaymentLinkParams): Promise<Stripe.Response<Stripe.PaymentLink>>;
}
