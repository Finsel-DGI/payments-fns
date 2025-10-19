import { StripeService } from "..";
import { StripeTypes } from "../types";
import Stripe from "stripe";
export declare class Connect {
    private readonly stripe;
    constructor(stripe: StripeService);
    /**
     * Creates a new Stripe Connect Express account and an account link for onboarding.
     * This function facilitates the creation of a new merchant account on Stripe Connect
     * and generates a URL for the merchant to complete their onboarding process.
     *
     * @param {StripeTypes.ConnectMerchantParams} params - The parameters for creating the Connect account and account link.
     * @returns {Promise<{connect: Stripe.Response<Stripe.AccountLink>, account: Stripe.Response<Stripe.Account>}>}
     *          A promise that resolves to an object containing the created Stripe AccountLink and the Stripe Account.
     */
    createMerchant(params: StripeTypes.ConnectMerchantParams): Promise<{
        connect: Stripe.Response<Stripe.AccountLink>;
        account: Stripe.Response<Stripe.Account>;
    }>;
    /**
     * Retrieve stripe connect user
     * @param {string} customerID query customer id
     * @return {Promise<Stripe.Response<Stripe.Account>>}
     */
    getAccount(customerID: string): Promise<Stripe.Response<Stripe.Account>>;
}
