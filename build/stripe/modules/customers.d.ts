import { StripeService } from "..";
import Stripe from "stripe";
export declare class Customers {
    private readonly stripe;
    constructor(stripe: StripeService);
    /**
     * Retrieve a stripe customer
     * @param {string} customerID query customer id
     * @return {Promise<Stripe.Response<Stripe.Customer | Stripe.DeletedCustomer>>}
     * returns stripe customer
     */
    get(customerID: string): Promise<Stripe.Response<Stripe.Customer | Stripe.DeletedCustomer>>;
    /**
     * Create a stripe customer
     * @param {string} email customer email
     * @param {string} name partner name
     * @return {Promise<Stripe.Response<Stripe.Customer | Stripe.DeletedCustomer>>} returns customer
     */
    createPartnerCustomer(email: string, name: string, description?: string): Promise<Stripe.Response<Stripe.Customer | Stripe.DeletedCustomer>>;
    /**
     * Find and retrieve stripe customer using email
     * @param {string} email query email to find
     * @return {Promise<Stripe.Customer | undefined>}
     * returns stripe customer
     */
    find(email: string): Promise<Stripe.Customer | undefined>;
    /**
     * Manage customer - find existing or create new
     * @param {string} email customer email
     * @return {Promise<Stripe.Customer | Stripe.Response<Stripe.Customer | Stripe.DeletedCustomer>>}
     */
    manage(email: string): Promise<Stripe.Customer | Stripe.Response<Stripe.Customer | Stripe.DeletedCustomer>>;
    /**
     * Update default payment method
     * @param {string} id stripe account
     * @return {Promise<Stripe.Response<Stripe.Customer> | undefined>}
     * returns stripe customer
     */
    updateDefaultPaymentMethod(id: string): Promise<Stripe.Response<Stripe.Customer> | undefined>;
    /**
     * Check if customer has default payment method
     * @param {string} customer customer ID
     * @return {Promise<boolean>}
     */
    checkIfHasDefaultPaymentMethod(customer: string): Promise<boolean>;
}
