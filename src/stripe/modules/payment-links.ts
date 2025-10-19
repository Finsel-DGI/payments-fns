import { StripeService } from "..";
import { StripeTypes } from "../types";
import Stripe from "stripe";

export class PaymentLinks {
  constructor(private readonly stripe: StripeService) { }

  /**
   * Retrieve a stripe payment link
   * @param {string} link payment link id
   * @return {Promise<Stripe.Response<Stripe.PaymentLink>>}
   * returns stripe payment link
   */
  public async get(link: string): Promise<Stripe.Response<Stripe.PaymentLink>> {
    return this.stripe.stripe.paymentLinks.retrieve(link);
  }

  /**
   * Cancel a stripe payment link
   * @param {string} id what stripe link
   * @return {Promise<Stripe.Response<Stripe.PaymentLink>>}
   * returns stripe payment link
   */
  public async cancel(id: string): Promise<Stripe.Response<Stripe.PaymentLink>> {
    return this.stripe.stripe.paymentLinks.update(
      id,
      { active: false }
    );
  }

  /**
   * Create payment link
   * @param {StripeTypes.CreatePaymentLinkParams} params payment link parameters
   * @return {Promise<Stripe.Response<Stripe.PaymentLink>>}
   */
  public async create(params: StripeTypes.CreatePaymentLinkParams): Promise<Stripe.Response<Stripe.PaymentLink>> {
    const price = await this.stripe.stripe.prices.create({
      unit_amount: Math.round(params.amount) * 100,
      currency: (params.currency ?? "USD").toLowerCase(),
      tax_behavior: params.behaviour === 'inclusive' ? "inclusive" : "exclusive",
      product: params.product,
    });

    return await this.stripe.stripe.paymentLinks.create({
      line_items: [{ price: price.id, quantity: 1 }],
      after_completion: {
        type: "redirect",
        redirect: {
          url: params.redirect_url
        },
      },
      application_fee_amount: (Math.round(params.fee)) * 100,
      transfer_data: params.transfer_data,
    });
  }
}
