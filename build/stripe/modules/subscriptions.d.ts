import { StripeService } from "..";
import { StripeTypes } from "../types";
import Stripe from "stripe";
export declare class Subscriptions {
    private readonly stripe;
    constructor(stripe: StripeService);
    /**
     * Create a new subscription with optional free trial period
     * @param {StripeTypes.CreateSubscriptionParams} params subscription creation parameters
     * @return {Promise<Stripe.Response<Stripe.Subscription>>}
     * returns stripe subscription
     */
    create(params: StripeTypes.CreateSubscriptionParams): Promise<Stripe.Response<Stripe.Subscription>>;
    /**
     * Create a subscription with free trial period (convenience method)
     * @param {string} customer customer ID
     * @param {string} priceId price ID
     * @param {StripeTypes.TrialPeriod} trial trial period configuration
     * @param {Partial<StripeTypes.CreateSubscriptionParams>} options additional options
     * @return {Promise<Stripe.Response<Stripe.Subscription>>}
     */
    createWithTrial(customer: string, priceId: string, trial: StripeTypes.TrialPeriod, options?: Partial<StripeTypes.CreateSubscriptionParams>): Promise<Stripe.Response<Stripe.Subscription>>;
    /**
     * Retrieve a subscription
     * @param {string} subscriptionId subscription ID
     * @param {string[]} expand fields to expand
     * @return {Promise<Stripe.Response<Stripe.Subscription>>}
     * returns stripe subscription
     */
    get(subscriptionId: string, expand?: string[]): Promise<Stripe.Response<Stripe.Subscription>>;
    /**
     * List subscriptions
     * @param {Stripe.SubscriptionListParams} params list parameters
     * @return {Promise<Stripe.Response<Stripe.ApiList<Stripe.Subscription>>>}
     * returns stripe subscriptions list
     */
    list(params?: Stripe.SubscriptionListParams): Promise<Stripe.Response<Stripe.ApiList<Stripe.Subscription>>>;
    /**
     * Update a subscription
     * @param {StripeTypes.UpdateSubscriptionParams} params update parameters
     * @return {Promise<Stripe.Response<Stripe.Subscription>>}
     * returns updated stripe subscription
     */
    update(params: StripeTypes.UpdateSubscriptionParams): Promise<Stripe.Response<Stripe.Subscription>>;
    /**
     * Cancel a subscription
     * @param {StripeTypes.CancelSubscriptionParams} params cancel parameters
     * @return {Promise<Stripe.Response<Stripe.Subscription>>}
     * returns cancelled stripe subscription
     */
    cancel(params: StripeTypes.CancelSubscriptionParams): Promise<Stripe.Response<Stripe.Subscription>>;
    /**
     * Resume a cancelled subscription
     * @param {string} subscriptionId subscription ID
     * @return {Promise<Stripe.Response<Stripe.Subscription>>}
     * returns resumed stripe subscription
     */
    resume(subscriptionId: string): Promise<Stripe.Response<Stripe.Subscription>>;
    /**
     * Pause a subscription
     * @param {string} subscriptionId subscription ID
     * @param {number} pauseUntil timestamp to pause until
     * @return {Promise<Stripe.Response<Stripe.Subscription>>}
     * returns paused stripe subscription
     */
    pause(subscriptionId: string, pauseUntil: number): Promise<Stripe.Response<Stripe.Subscription>>;
    /**
     * Resume a paused subscription
     * @param {string} subscriptionId subscription ID
     * @return {Promise<Stripe.Response<Stripe.Subscription>>}
     * returns resumed stripe subscription
     */
    unpause(subscriptionId: string): Promise<Stripe.Response<Stripe.Subscription>>;
    /**
     * Create subscription item
     * @param {StripeTypes.CreateSubscriptionItemParams} params subscription item parameters
     * @return {Promise<Stripe.Response<Stripe.SubscriptionItem>>}
     * returns stripe subscription item
     */
    createItem(params: StripeTypes.CreateSubscriptionItemParams): Promise<Stripe.Response<Stripe.SubscriptionItem>>;
    /**
     * Update subscription item
     * @param {StripeTypes.UpdateSubscriptionItemParams} params subscription item parameters
     * @return {Promise<Stripe.Response<Stripe.SubscriptionItem>>}
     * returns updated stripe subscription item
     */
    updateItem(params: StripeTypes.UpdateSubscriptionItemParams): Promise<Stripe.Response<Stripe.SubscriptionItem>>;
    /**
     * Delete subscription item
     * @param {string} subscriptionItemId subscription item ID
     * @param {Stripe.SubscriptionItemDeleteParams} params delete parameters
     * @return {Promise<Stripe.Response<Stripe.DeletedSubscriptionItem>>}
     * returns deleted stripe subscription item
     */
    deleteItem(subscriptionItemId: string, params?: Stripe.SubscriptionItemDeleteParams): Promise<Stripe.Response<Stripe.DeletedSubscriptionItem>>;
    /**
     * List subscription items
     * @param {string} subscriptionId subscription ID
     * @param {Stripe.SubscriptionItemListParams} params list parameters
     * @return {Promise<Stripe.Response<Stripe.ApiList<Stripe.SubscriptionItem>>>}
     * returns stripe subscription items list
     */
    listItems(subscriptionId: string, params?: Stripe.SubscriptionItemListParams): Promise<Stripe.Response<Stripe.ApiList<Stripe.SubscriptionItem>>>;
    /**
     * Create subscription schedule
     * @param {StripeTypes.CreateSubscriptionScheduleParams} params schedule parameters
     * @return {Promise<Stripe.Response<Stripe.SubscriptionSchedule>>}
     * returns stripe subscription schedule
     */
    createSchedule(params: StripeTypes.CreateSubscriptionScheduleParams): Promise<Stripe.Response<Stripe.SubscriptionSchedule>>;
    /**
     * Retrieve subscription schedule
     * @param {string} scheduleId schedule ID
     * @return {Promise<Stripe.Response<Stripe.SubscriptionSchedule>>}
     * returns stripe subscription schedule
     */
    getSchedule(scheduleId: string): Promise<Stripe.Response<Stripe.SubscriptionSchedule>>;
    /**
     * Cancel subscription schedule
     * @param {string} scheduleId schedule ID
     * @param {Stripe.SubscriptionScheduleCancelParams} params cancel parameters
     * @return {Promise<Stripe.Response<Stripe.SubscriptionSchedule>>}
     * returns cancelled stripe subscription schedule
     */
    cancelSchedule(scheduleId: string, params?: Stripe.SubscriptionScheduleCancelParams): Promise<Stripe.Response<Stripe.SubscriptionSchedule>>;
}
