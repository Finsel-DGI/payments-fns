import Stripe from "stripe";
export declare class StripeService {
    private readonly key;
    readonly stripe: Stripe;
    /**
     * Class main constructor
     * @param {string} apikey initialize with stripe keys
     */
    constructor(apikey: string);
    /**
     * Callable function to retrieve stripe customer
     * @param {string} customerID query customer id
     * @return {Promise<Stripe.Response<Stripe.Customer |
     *  Stripe.DeletedCustomer>>}
     returns stripe customer
    */
    getCustomer(customerID: string): Promise<Stripe.Response<Stripe.Customer | Stripe.DeletedCustomer>>;
    manageCustomer(email: string): Promise<Stripe.Customer | Stripe.Response<Stripe.Customer | Stripe.DeletedCustomer>>;
    /**
     * Create a stripe customer
     * @param {string} email customer email
     * @param {string} name partner name
     * @return {Promise<Stripe.Response<Stripe.Customer | Stripe.DeletedCustomer>>} returns customer
     */
    createPartnerCustomer(email: string, name: string): Promise<Stripe.Response<Stripe.Customer | Stripe.DeletedCustomer>>;
    /**
    * Callable function to find and retrieve stripe customer using email
    * @param {string} email query email to find
    * @return {Promise<Stripe.Customer | undefined>}
     returns stripe customer
    */
    findCustomer(email: string): Promise<Stripe.Customer | undefined>;
    /**
    * Create an Invoice Item with the Price, and Customer you want to charge
    * @param {string} price price data amount
    * @param {string} product stripe product data ID for the price item
    * @param {string} currency price currency
    * @param {boolean} includeTax let us know if the price is tax inclusive
    * @return {Promise<Stripe.Response<Stripe.Price>>}
    returns stripe invoice item
    */
    createPriceData(price: number, product: string, currency: string, includeTax?: boolean): Promise<Stripe.Response<Stripe.Price>>;
    /**
    * Retrieve a stripe payment link
    * @param {string} link payment link id
    * @return {Promise<Stripe.Response<Stripe.PaymentLink>>}
     returns stripe invoice
    */
    getPaymentLink(link: string): Promise<Stripe.Response<Stripe.PaymentLink>>;
    /**
    * Retrieve a stripe payment session from checkout
    * @param {string} checkout payment link id
    * @return {Promise<Stripe.Response<Stripe.Checkout.Session>>}
     returns stripe invoice
    */
    getCheckoutSession(checkout: string): Promise<Stripe.Response<Stripe.Checkout.Session>>;
    /**
    * Retrieve a stripe payment method
    * @param {string} customer what stripe customer
    * @param {string} method what stripe customer payment method
    * @return {Promise<Stripe.Response<Stripe.PaymentMethod>>}
     returns stripe invoice
    */
    getPaymentMethod(customer: string, method: string): Promise<Stripe.Response<Stripe.PaymentMethod>>;
    /**
    * Get stripe payment methods
    * @param {string} id stripe account
    * @param {PaymentTypes} type stripe payment method type
    * @return {Promise<Stripe.Response<Stripe.ApiList<Stripe.PaymentMethod>>>}
     returns stripe invoice
    */
    getPaymentMethods(id: string, type?: Stripe.PaymentMethodListParams.Type): Promise<Stripe.Response<Stripe.ApiList<Stripe.PaymentMethod>>>;
    /**
    * Retrieve a stripe payment intent
    * @param {string} id intent string
    * @return {Promise<Stripe.Response<Stripe.PaymentIntent>>}
     returns stripe invoice
    */
    paymentIntentData(id: string): Promise<Stripe.Response<Stripe.PaymentIntent>>;
    cardSetupCheckout(params: {
        customer: string;
        lineItems?: {
            price_data: {
                currency: string;
                product_data: {
                    name: string;
                    description: string;
                };
                unit_amount: number;
            };
            quantity: number;
        }[];
        receipt_email: string;
        billing?: "auto" | "required";
        metadata: Record<string, string | number | null>;
        redirects: {
            success: string;
            cancel: string;
        };
        setup: boolean;
    }): Promise<Stripe.Response<Stripe.Checkout.Session>>;
    checkout(params: {
        currency?: string;
        product?: string;
        email?: string;
        amount: number;
        customer: string;
        lineItems?: {
            price: string;
            quantity: number;
        }[];
        redirects: {
            success: string;
            cancel: string;
        };
        intent?: Stripe.Checkout.SessionCreateParams.PaymentIntentData;
        billing?: "auto" | "required";
        mode: "setup" | "payment" | "subscription";
    }): Promise<Stripe.Response<Stripe.Checkout.Session>>;
    /**
     * Callable function to retrieve stripe connect user
     * @param {string} customerID query customer id
     * @return {Promise<Stripe.Response<Stripe.Account>>}
    */
    getConnectUser(customerID: string): Promise<Stripe.Response<Stripe.Account>>;
    /**
   * Initiates a checkout session for processing payments.
   *
   * @param {Object} params - The parameters for the checkout session.
   * @param {string} params.currency - The currency in which the payment is to be made.
   * @param {string} params.product - The product identifier for which the payment is being made.
   * @param {string} params.email - The email address to which the receipt will be sent.
   * @param {number} params.amount - The amount to be charged, in the smallest currency unit.
   * @param {number} params.fee - The application fee amount to be charged, in the smallest currency unit.
   * @param {Object} params.redirects - URLs to redirect to after payment success or failure.
   * @param {string} params.redirects.success - The URL to redirect to after a successful payment.
   * @param {string} params.redirects.failed - The URL to redirect to after a failed payment.
   * @param {string} params.connectID - ID of the connected account on behalf of which the payment is taken.
   *
   * @return {Promise<Stripe.Response<Stripe.Checkout.Session>>} A promise that resolves to the created checkout session object.
   */
    connectCheckout({ currency, amount, fee, redirects, connectID, product, email }: {
        currency: string;
        product: string;
        email: string;
        amount: number;
        fee: number;
        redirects: {
            success: string;
            failed: string;
        };
        /**
         * ID of connected account -- we are taking payments on behalf
         */
        connectID: string;
    }): Promise<Stripe.Response<Stripe.Checkout.Session>>;
    /**
    * Cancel a stripe payment link
    * @param {string} id what stripe link
    * @return {
    * Promise<Stripe.Response<Stripe.PaymentLink>>
    * }returns stripe invoice
    */
    cancelPayLink(id: string): Promise<Stripe.Response<Stripe.PaymentLink>>;
    createPortalSession(customerId: string, return_url: string): Promise<Stripe.Response<Stripe.BillingPortal.Session>>;
    createCheckoutWithProductPrices(options: {
        currency?: string;
        customer?: string;
        email?: string;
        product: string;
        priceId: string;
        redirects?: {
            success: string;
            cancel: string;
        };
    }): Promise<Stripe.Response<Stripe.Checkout.Session>>;
    /**
    * Refund a stripe payment
    * @param {string} checkout checkout ID from session
    * @param {number} amount stripe account
    * @return {Promise<Stripe.Response<Stripe.Refund> | undefined>}
     returns stripe refund object
    */
    refund(checkout: string, amount?: number): Promise<Stripe.Response<Stripe.Refund> | undefined>;
    /**
    * Update default payment method
    * @param {string} id stripe account
    * @return {Promise<Stripe.Response<Stripe.Customer> | undefined>}
     returns stripe invoice
    */
    updateDefaultPaymentMethod(id: string): Promise<Stripe.Response<Stripe.Customer> | undefined>;
    checkIfCustomerHasDefaultPaymentMethod(customer: string): Promise<boolean>;
    createPaymentLink(params: {
        amount: number;
        product: string;
        customer: string;
        fee: number;
        currency?: string;
        behaviour: "inclusive" | "exclusive";
        redirect_url: string;
        transfer_data?: Stripe.PaymentLinkCreateParams.TransferData;
    }): Promise<Stripe.Response<Stripe.PaymentLink>>;
    chargeCustomerPaymentMethod(params: {
        amount: number;
        currency?: string;
        customer: string;
        method: string;
    }): Promise<Stripe.Response<Stripe.PaymentIntent>>;
    getDefaultPaymentMethod(cid: string): Promise<Stripe.PaymentMethod | null>;
}
