import { StripeService } from "..";
import { StripeTypes } from "../types";
import Stripe from "stripe";
export declare class Checkout {
    private readonly stripe;
    constructor(stripe: StripeService);
    /**
     * Retrieve a stripe payment session from checkout
     * @param {string} checkout payment link id
     * @return {Promise<Stripe.Response<Stripe.Checkout.Session>>}
     * returns stripe checkout session
     */
    getSession(checkout: string): Promise<Stripe.Response<Stripe.Checkout.Session>>;
    /**
     * Create checkout session with card setup
     * @param {StripeTypes.CardSetupCheckoutParams} params checkout parameters
     * @return {Promise<Stripe.Response<Stripe.Checkout.Session>>}
     */
    cardSetupCheckout(params: StripeTypes.CardSetupCheckoutParams): Promise<Stripe.Response<Stripe.Checkout.Session>>;
    /**
     * Create checkout session
     * @param {StripeTypes.CheckoutSessionCreateParams} params checkout parameters
     * @return {Promise<Stripe.Response<Stripe.Checkout.Session>>}
     */
    create(params: StripeTypes.CheckoutSessionCreateParams): Promise<Stripe.Response<Stripe.Checkout.Session>>;
    /**
     * Create checkout session for connected account
     * @param {StripeTypes.ConnectCheckoutParams} params connect checkout parameters
     * @return {Promise<Stripe.Response<Stripe.Checkout.Session>>}
     */
    connectCheckout(params: StripeTypes.ConnectCheckoutParams): Promise<Stripe.Response<Stripe.Checkout.Session>>;
    /**
     * Create checkout session with product prices
     * @param {StripeTypes.CheckoutWithProductPricesParams} options checkout options
     * @return {Promise<Stripe.Response<Stripe.Checkout.Session>>}
     */
    createWithProductPrices(options: StripeTypes.CheckoutWithProductPricesParams): Promise<Stripe.Response<Stripe.Checkout.Session>>;
}
