import { StripeService } from "..";
import { StripeTypes } from "../types";
import Stripe from "stripe";
export declare class Payments {
    private readonly stripe;
    constructor(stripe: StripeService);
    /**
     * Retrieve a stripe payment intent
     * @param {string} id intent string
     * @return {Promise<Stripe.Response<Stripe.PaymentIntent>>}
     * returns stripe payment intent
     */
    getPaymentIntent(id: string): Promise<Stripe.Response<Stripe.PaymentIntent>>;
    /**
     * Charge customer payment method
     * @param {StripeTypes.ChargeCustomerParams} params charge parameters
     * @return {Promise<Stripe.Response<Stripe.PaymentIntent>>}
     */
    chargeCustomer(params: StripeTypes.ChargeCustomerParams): Promise<Stripe.Response<Stripe.PaymentIntent>>;
    /**
     * Refund a stripe payment
     * @param {string} checkout checkout ID from session
     * @param {number} amount stripe account
     * @return {Promise<Stripe.Response<Stripe.Refund> | undefined>}
     * returns stripe refund object
     */
    refund(checkout: string, amount?: number): Promise<Stripe.Response<Stripe.Refund> | undefined>;
}
