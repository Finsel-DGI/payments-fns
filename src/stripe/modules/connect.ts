import { StripeService } from "..";
import { StripeTypes } from "../types";
import Stripe from "stripe";

export class Connect {
  constructor(private readonly stripe: StripeService) { }

  /**
   * Creates a new Stripe Connect Express account and an account link for onboarding.
   * This function facilitates the creation of a new merchant account on Stripe Connect
   * and generates a URL for the merchant to complete their onboarding process.
   *
   * @param {StripeTypes.ConnectMerchantParams} params - The parameters for creating the Connect account and account link.
   * @returns {Promise<{connect: Stripe.Response<Stripe.AccountLink>, account: Stripe.Response<Stripe.Account>}>}
   *          A promise that resolves to an object containing the created Stripe AccountLink and the Stripe Account.
   */
  public async createMerchant(params: StripeTypes.ConnectMerchantParams): Promise<{connect: Stripe.Response<Stripe.AccountLink>, account: Stripe.Response<Stripe.Account>}> {
    const account = await this.stripe.stripe.accounts.create({
      type: "express",
      country: params.company.country,
      company: {
        name: params.company.name,
      },
      capabilities: params.capabilities ?? {
        card_payments: { requested: true },
        transfers: { requested: true }
      },
      business_type: params.company.business_type,
      email: params.company.email
    });

    const res = await this.stripe.stripe.accountLinks.create({
      account: account.id,
      refresh_url: params.refresh_url,
      return_url: params.return_url.replace("<<ACCOUNT_ID>>", account.id),
      type: "account_onboarding",
    });
    
    return {
      connect: res,
      account,
    }
  }

  /**
   * Retrieve stripe connect user
   * @param {string} customerID query customer id
   * @return {Promise<Stripe.Response<Stripe.Account>>}
   */
  public async getAccount(customerID: string): Promise<Stripe.Response<Stripe.Account>> {
    const customer = await this.stripe.stripe.accounts.retrieve(customerID);
    return customer;
  }
}
