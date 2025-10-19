import { StripeService } from "..";
import { StripeTypes } from "../types";
import Stripe from "stripe";

export class Checkout {
  constructor(private readonly stripe: StripeService) { }

  /**
   * Retrieve a stripe payment session from checkout
   * @param {string} checkout payment link id
   * @return {Promise<Stripe.Response<Stripe.Checkout.Session>>}
   * returns stripe checkout session
   */
  public async getSession(checkout: string): Promise<Stripe.Response<Stripe.Checkout.Session>> {
    return this.stripe.stripe.checkout.sessions.retrieve(checkout);
  }

  /**
   * Create checkout session with card setup
   * @param {StripeTypes.CardSetupCheckoutParams} params checkout parameters
   * @return {Promise<Stripe.Response<Stripe.Checkout.Session>>}
   */
  public async cardSetupCheckout(params: StripeTypes.CardSetupCheckoutParams): Promise<Stripe.Response<Stripe.Checkout.Session>> {
    if (params.setup) {
      return await this.stripe.stripe.checkout.sessions.create({
        mode: "payment",
        payment_method_types: ['card'],
        payment_intent_data: {
          setup_future_usage: 'off_session',
          receipt_email: params.receipt_email,
        },
        customer: params.customer,
        line_items: params.lineItems,
        metadata: params.metadata,
        success_url: params.redirects.success,
        cancel_url: params.redirects.cancel,
        automatic_tax: {
          enabled: true,
        },
        customer_update: {
          address: "auto",
          shipping: "auto",
        },
        billing_address_collection: params.billing ?? 'auto'
      });
    } else {
      return await this.stripe.stripe.checkout.sessions.create({
        mode: "payment",
        customer: params.customer,
        line_items: params.lineItems,
        metadata: params.metadata,
        success_url: params.redirects.success,
        cancel_url: params.redirects.cancel,
        automatic_tax: {
          enabled: true,
        },
      });
    }
  }

  /**
   * Create checkout session
   * @param {StripeTypes.CheckoutSessionCreateParams} params checkout parameters
   * @return {Promise<Stripe.Response<Stripe.Checkout.Session>>}
   */
  public async create(params: StripeTypes.CheckoutSessionCreateParams): Promise<Stripe.Response<Stripe.Checkout.Session>> {
    const price = await this.stripe.stripe.prices.create({
      unit_amount: Math.round(params.amount) * 100,
      currency: (params.currency ?? 'USD').toLowerCase(),
      tax_behavior: "exclusive",
      product: params.product,
    });

    return await this.stripe.stripe.checkout.sessions.create({
      mode: params.mode,
      currency: params.currency,
      customer: params.customer,
      line_items: params.lineItems ?? [
        {
          price: price.id,
          quantity: 1,
        },
      ],
      success_url: params.redirects.success,
      cancel_url: params.redirects.cancel,
      payment_intent_data: params.intent ?? {
        setup_future_usage: "off_session",
        receipt_email: params.email,
      },
      automatic_tax: {
        enabled: true,
      },
      customer_update: {
        address: "auto",
        shipping: "auto",
      },
      billing_address_collection: params.billing ?? 'auto'
    });
  }

  /**
   * Create checkout session for connected account
   * @param {StripeTypes.ConnectCheckoutParams} params connect checkout parameters
   * @return {Promise<Stripe.Response<Stripe.Checkout.Session>>}
   */
  public async connectCheckout(params: StripeTypes.ConnectCheckoutParams): Promise<Stripe.Response<Stripe.Checkout.Session>> {
    const price = await this.stripe.stripe.prices.create({
      unit_amount: Math.round(params.amount) * 100,
      currency: params.currency.toLowerCase(),
      tax_behavior: "exclusive",
      product: params.product,
    });
    return await this.stripe.stripe.checkout.sessions.create({
      mode: "payment",
      currency: params.currency,
      line_items: [
        {
          price: price.id,
          quantity: 1,
        },
      ],
      success_url: params.redirects.success,
      cancel_url: params.redirects.failed,
      payment_intent_data: {
        setup_future_usage: "off_session",
        application_fee_amount: params.fee,
        transfer_data: {
          destination: params.connectID,
        },
        receipt_email: params.email,
      },
      billing_address_collection: "auto",
    });
  }

  /**
   * Create checkout session with product prices
   * @param {StripeTypes.CheckoutWithProductPricesParams} options checkout options
   * @return {Promise<Stripe.Response<Stripe.Checkout.Session>>}
   */
  public async createWithProductPrices(options: StripeTypes.CheckoutWithProductPricesParams): Promise<Stripe.Response<Stripe.Checkout.Session>> {
    const session = await this.stripe.stripe.checkout.sessions.create({
      currency: options?.currency,
      customer: options?.customer,
      line_items: [
        {
          price: options.priceId,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: options.redirects?.success,
      cancel_url: options.redirects?.cancel,
    });

    return session;
  }
}
