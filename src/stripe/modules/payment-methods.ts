import { StripeService } from "..";
import Stripe from "stripe";

export class PaymentMethods {
  constructor(private readonly stripe: StripeService) { }

  /**
   * Retrieve a stripe payment method
   * @param {string} customer what stripe customer
   * @param {string} method what stripe customer payment method
   * @return {Promise<Stripe.Response<Stripe.PaymentMethod>>}
   * returns stripe payment method
   */
  public async get(customer: string, method: string): Promise<Stripe.Response<Stripe.PaymentMethod>> {
    return this.stripe.stripe.customers.retrievePaymentMethod(customer, method);
  }

  /**
   * Get stripe payment methods
   * @param {string} id stripe account
   * @param {Stripe.PaymentMethodListParams.Type} type stripe payment method type
   * @return {Promise<Stripe.Response<Stripe.ApiList<Stripe.PaymentMethod>>>}
   * returns stripe payment methods list
   */
  public async list(id: string, type: Stripe.PaymentMethodListParams.Type = "card"): Promise<Stripe.Response<Stripe.ApiList<Stripe.PaymentMethod>>> {
    return this.stripe.stripe.paymentMethods.list({
      customer: id,
      type: type,
    });
  }

  /**
   * Get default payment method for customer
   * @param {string} cid customer ID
   * @return {Promise<Stripe.PaymentMethod | null>}
   */
  public async getDefault(cid: string): Promise<Stripe.PaymentMethod | null> {
    // Retrieve customer with default payment method
    const customer = await this.stripe.stripe.customers.retrieve(cid, {
      expand: ['invoice_settings.default_payment_method']
    });

    if (customer.deleted) {
      return null;
    }
    const defaultPaymentMethod = customer.invoice_settings.default_payment_method;

    if (defaultPaymentMethod) {
      return defaultPaymentMethod as Stripe.PaymentMethod;
    } else {
      return null;
    }
  }
}
