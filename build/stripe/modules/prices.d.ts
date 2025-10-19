import { StripeService } from "..";
import { StripeTypes } from "../types";
import Stripe from "stripe";
export declare class Prices {
    private readonly stripe;
    constructor(stripe: StripeService);
    /**
     * Create an Invoice Item with the Price, and Customer you want to charge
     * @param {StripeTypes.CreatePriceDataParams} params price creation parameters
     * @return {Promise<Stripe.Response<Stripe.Price>>}
     * returns stripe price
     */
    create(params: StripeTypes.CreatePriceDataParams): Promise<Stripe.Response<Stripe.Price>>;
}
