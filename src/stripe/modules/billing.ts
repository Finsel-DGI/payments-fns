import { StripeService } from "..";
import Stripe from "stripe";

export class Billing {
  constructor(private readonly stripe: StripeService) { }

  /**
   * Create billing portal session
   * @param {string} customerId customer ID
   * @param {string} return_url return URL
   * @return {Promise<Stripe.Response<Stripe.BillingPortal.Session>>}
   */
  public async createPortalSession(customerId: string, return_url: string): Promise<Stripe.Response<Stripe.BillingPortal.Session>> {
    const session = await this.stripe.stripe.billingPortal.sessions.create({
      customer: customerId,
      return_url: return_url,
    });

    return session;
  }
}
