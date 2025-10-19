import { StripeService } from "..";
import { StripeTypes } from "../types";
import Stripe from "stripe";

export class Prices {
  constructor(private readonly stripe: StripeService) { }

  /**
   * Create an Invoice Item with the Price, and Customer you want to charge
   * @param {StripeTypes.CreatePriceDataParams} params price creation parameters
   * @return {Promise<Stripe.Response<Stripe.Price>>}
   * returns stripe price
   */
  public async create(params: StripeTypes.CreatePriceDataParams): Promise<Stripe.Response<Stripe.Price>> {
    const data = await this.stripe.stripe.prices.create({
      unit_amount: Math.round(params.price) * 100,
      currency: params.currency.toLowerCase(),
      tax_behavior: params.includeTax ? "inclusive" : "exclusive",
      product: params.product,
    });

    return data;
  }
}
