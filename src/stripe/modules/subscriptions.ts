import { StripeService } from "..";
import { StripeTypes } from "../types";
import Stripe from "stripe";

export class Subscriptions {
  constructor(private readonly stripe: StripeService) { }

  /**
   * Create a new subscription with optional free trial period
   * @param {StripeTypes.CreateSubscriptionParams} params subscription creation parameters
   * @return {Promise<Stripe.Response<Stripe.Subscription>>}
   * returns stripe subscription
   */
  public async create(params: StripeTypes.CreateSubscriptionParams): Promise<Stripe.Response<Stripe.Subscription>> {
    const subscriptionParams: Stripe.SubscriptionCreateParams = {
      customer: params.customer,
      items: params.items || [{ price: params.priceId, quantity: params.quantity || 1 }],
      metadata: params.metadata,
      payment_behavior: params.paymentBehavior || 'default_incomplete',
      collection_method: params.collectionMethod || 'charge_automatically',
      default_payment_method: params.defaultPaymentMethod,
      proration_behavior: params.prorationBehavior || 'create_prorations',
      billing_cycle_anchor: params.billingCycleAnchor,
      cancel_at_period_end: params.cancelAtPeriodEnd || false,
      days_until_due: params.daysUntilDue,
      description: params.description,
      expand: params.expand,
      off_session: params.offSession || false,
      payment_settings: params.paymentSettings,
      pending_invoice_item_interval: params.pendingInvoiceItemInterval,
      transfer_data: params.transferData,
    };

    // Handle trial period
    if (params.trialPeriodDays) {
      subscriptionParams.trial_period_days = params.trialPeriodDays;
    } else if (params.trialEnd) {
      subscriptionParams.trial_end = params.trialEnd;
    }

    return this.stripe.stripe.subscriptions.create(subscriptionParams);
  }

  /**
   * Create a subscription with free trial period (convenience method)
   * @param {string} customer customer ID
   * @param {string} priceId price ID
   * @param {StripeTypes.TrialPeriod} trial trial period configuration
   * @param {Partial<StripeTypes.CreateSubscriptionParams>} options additional options
   * @return {Promise<Stripe.Response<Stripe.Subscription>>}
   */
  public async createWithTrial(
    customer: string, 
    priceId: string, 
    trial: StripeTypes.TrialPeriod,
    options: Partial<StripeTypes.CreateSubscriptionParams> = {}
  ): Promise<Stripe.Response<Stripe.Subscription>> {
    return this.create({
      customer,
      priceId,
      trialPeriodDays: trial.days,
      trialEnd: trial.end,
      ...options
    });
  }

  /**
   * Retrieve a subscription
   * @param {string} subscriptionId subscription ID
   * @param {string[]} expand fields to expand
   * @return {Promise<Stripe.Response<Stripe.Subscription>>}
   * returns stripe subscription
   */
  public async get(subscriptionId: string, expand?: string[]): Promise<Stripe.Response<Stripe.Subscription>> {
    return this.stripe.stripe.subscriptions.retrieve(subscriptionId, {
      expand: expand
    });
  }

  /**
   * List subscriptions
   * @param {Stripe.SubscriptionListParams} params list parameters
   * @return {Promise<Stripe.Response<Stripe.ApiList<Stripe.Subscription>>>}
   * returns stripe subscriptions list
   */
  public async list(params?: Stripe.SubscriptionListParams): Promise<Stripe.Response<Stripe.ApiList<Stripe.Subscription>>> {
    return this.stripe.stripe.subscriptions.list(params);
  }

  /**
   * Update a subscription
   * @param {StripeTypes.UpdateSubscriptionParams} params update parameters
   * @return {Promise<Stripe.Response<Stripe.Subscription>>}
   * returns updated stripe subscription
   */
  public async update(params: StripeTypes.UpdateSubscriptionParams): Promise<Stripe.Response<Stripe.Subscription>> {
    const { subscriptionId, ...updateParams } = params;
    
    const subscriptionUpdateParams: Stripe.SubscriptionUpdateParams = {
      items: updateParams.items || (updateParams.priceId ? [{ price: updateParams.priceId, quantity: updateParams.quantity || 1 }] : undefined),
      metadata: updateParams.metadata,
      proration_behavior: updateParams.prorationBehavior || 'create_prorations',
      billing_cycle_anchor: updateParams.billingCycleAnchor as any,
      cancel_at_period_end: updateParams.cancelAtPeriodEnd,
      days_until_due: updateParams.daysUntilDue,
      default_payment_method: updateParams.defaultPaymentMethod,
      description: updateParams.description,
      expand: updateParams.expand,
      off_session: updateParams.offSession,
      payment_settings: updateParams.paymentSettings,
      pending_invoice_item_interval: updateParams.pendingInvoiceItemInterval,
      transfer_data: updateParams.transferData,
    };

    return this.stripe.stripe.subscriptions.update(subscriptionId, subscriptionUpdateParams);
  }

  /**
   * Cancel a subscription
   * @param {StripeTypes.CancelSubscriptionParams} params cancel parameters
   * @return {Promise<Stripe.Response<Stripe.Subscription>>}
   * returns cancelled stripe subscription
   */
  public async cancel(params: StripeTypes.CancelSubscriptionParams): Promise<Stripe.Response<Stripe.Subscription>> {
    const { subscriptionId, cancelAtPeriodEnd, invoiceNow, prorate } = params;
    
    if (cancelAtPeriodEnd) {
      // If cancelling at period end, update the subscription instead
      return this.stripe.stripe.subscriptions.update(subscriptionId, {
        cancel_at_period_end: true
      });
    } else {
      // Immediate cancellation
      return this.stripe.stripe.subscriptions.cancel(subscriptionId, {
        invoice_now: invoiceNow,
        prorate: prorate
      });
    }
  }

  /**
   * Resume a cancelled subscription
   * @param {string} subscriptionId subscription ID
   * @return {Promise<Stripe.Response<Stripe.Subscription>>}
   * returns resumed stripe subscription
   */
  public async resume(subscriptionId: string): Promise<Stripe.Response<Stripe.Subscription>> {
    return this.stripe.stripe.subscriptions.update(subscriptionId, {
      cancel_at_period_end: false
    });
  }

  /**
   * Pause a subscription
   * @param {string} subscriptionId subscription ID
   * @param {number} pauseUntil timestamp to pause until
   * @return {Promise<Stripe.Response<Stripe.Subscription>>}
   * returns paused stripe subscription
   */
  public async pause(subscriptionId: string, pauseUntil: number): Promise<Stripe.Response<Stripe.Subscription>> {
    return this.stripe.stripe.subscriptions.update(subscriptionId, {
      pause_collection: {
        behavior: 'void',
        resumes_at: pauseUntil
      }
    });
  }

  /**
   * Resume a paused subscription
   * @param {string} subscriptionId subscription ID
   * @return {Promise<Stripe.Response<Stripe.Subscription>>}
   * returns resumed stripe subscription
   */
  public async unpause(subscriptionId: string): Promise<Stripe.Response<Stripe.Subscription>> {
    return this.stripe.stripe.subscriptions.update(subscriptionId, {
      pause_collection: null
    });
  }

  /**
   * Create subscription item
   * @param {StripeTypes.CreateSubscriptionItemParams} params subscription item parameters
   * @return {Promise<Stripe.Response<Stripe.SubscriptionItem>>}
   * returns stripe subscription item
   */
  public async createItem(params: StripeTypes.CreateSubscriptionItemParams): Promise<Stripe.Response<Stripe.SubscriptionItem>> {
    return this.stripe.stripe.subscriptionItems.create({
      subscription: params.subscriptionId,
      price: params.priceId,
      quantity: params.quantity || 1,
      metadata: params.metadata,
      proration_behavior: params.prorationBehavior || 'create_prorations',
      tax_rates: params.taxRates
    });
  }

  /**
   * Update subscription item
   * @param {StripeTypes.UpdateSubscriptionItemParams} params subscription item parameters
   * @return {Promise<Stripe.Response<Stripe.SubscriptionItem>>}
   * returns updated stripe subscription item
   */
  public async updateItem(params: StripeTypes.UpdateSubscriptionItemParams): Promise<Stripe.Response<Stripe.SubscriptionItem>> {
    const { subscriptionItemId, ...updateParams } = params;
    
    return this.stripe.stripe.subscriptionItems.update(subscriptionItemId, {
      price: updateParams.priceId,
      quantity: updateParams.quantity,
      metadata: updateParams.metadata,
      proration_behavior: updateParams.prorationBehavior || 'create_prorations',
      tax_rates: updateParams.taxRates
    });
  }

  /**
   * Delete subscription item
   * @param {string} subscriptionItemId subscription item ID
   * @param {Stripe.SubscriptionItemDeleteParams} params delete parameters
   * @return {Promise<Stripe.Response<Stripe.DeletedSubscriptionItem>>}
   * returns deleted stripe subscription item
   */
  public async deleteItem(subscriptionItemId: string, params?: Stripe.SubscriptionItemDeleteParams): Promise<Stripe.Response<Stripe.DeletedSubscriptionItem>> {
    return this.stripe.stripe.subscriptionItems.del(subscriptionItemId, params);
  }

  /**
   * List subscription items
   * @param {string} subscriptionId subscription ID
   * @param {Stripe.SubscriptionItemListParams} params list parameters
   * @return {Promise<Stripe.Response<Stripe.ApiList<Stripe.SubscriptionItem>>>}
   * returns stripe subscription items list
   */
  public async listItems(subscriptionId: string, params?: Stripe.SubscriptionItemListParams): Promise<Stripe.Response<Stripe.ApiList<Stripe.SubscriptionItem>>> {
    return this.stripe.stripe.subscriptionItems.list({
      subscription: subscriptionId,
      ...params
    });
  }

  /**
   * Create subscription schedule
   * @param {StripeTypes.CreateSubscriptionScheduleParams} params schedule parameters
   * @return {Promise<Stripe.Response<Stripe.SubscriptionSchedule>>}
   * returns stripe subscription schedule
   */
  public async createSchedule(params: StripeTypes.CreateSubscriptionScheduleParams): Promise<Stripe.Response<Stripe.SubscriptionSchedule>> {
    return this.stripe.stripe.subscriptionSchedules.create({
      customer: params.customer,
      start_date: params.startDate,
      end_behavior: params.endBehavior || 'release',
      metadata: params.metadata,
      phases: params.phases,
      from_subscription: params.fromSubscription
    });
  }

  /**
   * Retrieve subscription schedule
   * @param {string} scheduleId schedule ID
   * @return {Promise<Stripe.Response<Stripe.SubscriptionSchedule>>}
   * returns stripe subscription schedule
   */
  public async getSchedule(scheduleId: string): Promise<Stripe.Response<Stripe.SubscriptionSchedule>> {
    return this.stripe.stripe.subscriptionSchedules.retrieve(scheduleId);
  }

  /**
   * Cancel subscription schedule
   * @param {string} scheduleId schedule ID
   * @param {Stripe.SubscriptionScheduleCancelParams} params cancel parameters
   * @return {Promise<Stripe.Response<Stripe.SubscriptionSchedule>>}
   * returns cancelled stripe subscription schedule
   */
  public async cancelSchedule(scheduleId: string, params?: Stripe.SubscriptionScheduleCancelParams): Promise<Stripe.Response<Stripe.SubscriptionSchedule>> {
    return this.stripe.stripe.subscriptionSchedules.cancel(scheduleId, params);
  }
}
