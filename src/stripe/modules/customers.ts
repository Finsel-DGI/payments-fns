import { StripeService } from "..";
import Stripe from "stripe";

export class Customers {
  constructor(private readonly stripe: StripeService) { }

  /**
   * Retrieve a stripe customer
   * @param {string} customerID query customer id
   * @return {Promise<Stripe.Response<Stripe.Customer | Stripe.DeletedCustomer>>}
   * returns stripe customer
   */
  public async get(customerID: string): Promise<Stripe.Response<Stripe.Customer | Stripe.DeletedCustomer>> {
    return this.stripe.stripe.customers.retrieve(customerID);
  }

  /**
   * Create a stripe customer
   * @param {string} email customer email
   * @param {string} name partner name
   * @return {Promise<Stripe.Response<Stripe.Customer | Stripe.DeletedCustomer>>} returns customer
   */
  public async createPartnerCustomer(email: string, name: string, description?: string): Promise<Stripe.Response<Stripe.Customer | Stripe.DeletedCustomer>> {
    const params: Stripe.CustomerCreateParams = {
      description: description ?? "Partner account",
      email: email,
      name: name,
    };
    return this.stripe.stripe.customers.create(params);
  }

  /**
   * Find and retrieve stripe customer using email
   * @param {string} email query email to find
   * @return {Promise<Stripe.Customer | undefined>}
   * returns stripe customer
   */
  public async find(email: string): Promise<Stripe.Customer | undefined> {
    const customers = await this.stripe.stripe.customers.list({
      limit: 2,
      email: email,
    });
    if (customers.data.length < 1) return;
    return customers.data[0];
  }

  /**
   * Manage customer - find existing or create new
   * @param {string} email customer email
   * @return {Promise<Stripe.Customer | Stripe.Response<Stripe.Customer | Stripe.DeletedCustomer>>}
   */
  public async manage(email: string): Promise<Stripe.Customer | Stripe.Response<Stripe.Customer | Stripe.DeletedCustomer>> {
    const found = await this.find(email);
    if (found) {
      return found;
    } else {
      const params: Stripe.CustomerCreateParams = {
        description: "Created on payment action",
        email: email,
      };
      return await this.stripe.stripe.customers.create(params);
    }
  }

  /**
   * Update default payment method
   * @param {string} id stripe account
   * @return {Promise<Stripe.Response<Stripe.Customer> | undefined>}
   * returns stripe customer
   */
  public async updateDefaultPaymentMethod(id: string): Promise<Stripe.Response<Stripe.Customer> | undefined> {
    const account = await this.get(id);

    if (account.deleted) return;

    if (account.invoice_settings.default_payment_method !== null) {
      console.log("Account already has a default payment method");
      return account;
    }
    const paymentMethods = await this.stripe.PaymentMethods.list(id);
    if (paymentMethods.data.length < 1) return;
    // grab the payment method from the retrieved
    // try setting a new payment method
    const updatedData = await this.stripe.stripe.customers.update(
      id,
      {
        invoice_settings: {
          default_payment_method: paymentMethods.data[0].id,
        },
      }
    );

    return updatedData;
  }

  /**
   * Check if customer has default payment method
   * @param {string} customer customer ID
   * @return {Promise<boolean>}
   */
  public async checkIfHasDefaultPaymentMethod(customer: string): Promise<boolean> {
    const account = await this.get(customer);

    if (account.deleted) return false;
    return (account.invoice_settings.default_payment_method !== null);
  }
}
