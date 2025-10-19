import { StripeService } from "..";
import { StripeTypes } from "../types";
import Stripe from "stripe";

export class Payments {
  constructor(private readonly stripe: StripeService) { }

  /**
   * Retrieve a stripe payment intent
   * @param {string} id intent string
   * @return {Promise<Stripe.Response<Stripe.PaymentIntent>>}
   * returns stripe payment intent
   */
  public async getPaymentIntent(id: string): Promise<Stripe.Response<Stripe.PaymentIntent>> {
    return this.stripe.stripe.paymentIntents.retrieve(id);
  }

  /**
   * Charge customer payment method
   * @param {StripeTypes.ChargeCustomerParams} params charge parameters
   * @return {Promise<Stripe.Response<Stripe.PaymentIntent>>}
   */
  public async chargeCustomer(params: StripeTypes.ChargeCustomerParams): Promise<Stripe.Response<Stripe.PaymentIntent>> {
    return this.stripe.stripe.paymentIntents.create({
      amount: params.amount,
      currency: params.currency ?? 'NGN',
      payment_method: params.method,
      confirm: true,
      customer: params.customer,
      automatic_payment_methods: {
        enabled: true,
        allow_redirects: 'never',
      }
    });
  }

  /**
   * Refund a stripe payment
   * @param {string} checkout checkout ID from session
   * @param {number} amount stripe account
   * @return {Promise<Stripe.Response<Stripe.Refund> | undefined>}
   * returns stripe refund object
   */
  public async refund(checkout: string, amount?: number): Promise<Stripe.Response<Stripe.Refund> | undefined> {
    const session = await this.stripe.Checkout.getSession(checkout);
    const intent = session.payment_intent;

    if (!intent) return;

    const refund = await this.stripe.stripe.refunds.create({
      payment_intent: intent as string,
      amount: amount,
    });
    return refund;
  }
}
