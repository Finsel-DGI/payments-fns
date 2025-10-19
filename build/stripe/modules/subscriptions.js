"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Subscriptions = void 0;
class Subscriptions {
    constructor(stripe) {
        this.stripe = stripe;
    }
    /**
     * Create a new subscription with optional free trial period
     * @param {StripeTypes.CreateSubscriptionParams} params subscription creation parameters
     * @return {Promise<Stripe.Response<Stripe.Subscription>>}
     * returns stripe subscription
     */
    create(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const subscriptionParams = {
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
            }
            else if (params.trialEnd) {
                subscriptionParams.trial_end = params.trialEnd;
            }
            return this.stripe.stripe.subscriptions.create(subscriptionParams);
        });
    }
    /**
     * Create a subscription with free trial period (convenience method)
     * @param {string} customer customer ID
     * @param {string} priceId price ID
     * @param {StripeTypes.TrialPeriod} trial trial period configuration
     * @param {Partial<StripeTypes.CreateSubscriptionParams>} options additional options
     * @return {Promise<Stripe.Response<Stripe.Subscription>>}
     */
    createWithTrial(customer_1, priceId_1, trial_1) {
        return __awaiter(this, arguments, void 0, function* (customer, priceId, trial, options = {}) {
            return this.create(Object.assign({ customer,
                priceId, trialPeriodDays: trial.days, trialEnd: trial.end }, options));
        });
    }
    /**
     * Retrieve a subscription
     * @param {string} subscriptionId subscription ID
     * @param {string[]} expand fields to expand
     * @return {Promise<Stripe.Response<Stripe.Subscription>>}
     * returns stripe subscription
     */
    get(subscriptionId, expand) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.stripe.stripe.subscriptions.retrieve(subscriptionId, {
                expand: expand
            });
        });
    }
    /**
     * List subscriptions
     * @param {Stripe.SubscriptionListParams} params list parameters
     * @return {Promise<Stripe.Response<Stripe.ApiList<Stripe.Subscription>>>}
     * returns stripe subscriptions list
     */
    list(params) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.stripe.stripe.subscriptions.list(params);
        });
    }
    /**
     * Update a subscription
     * @param {StripeTypes.UpdateSubscriptionParams} params update parameters
     * @return {Promise<Stripe.Response<Stripe.Subscription>>}
     * returns updated stripe subscription
     */
    update(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const { subscriptionId } = params, updateParams = __rest(params, ["subscriptionId"]);
            const subscriptionUpdateParams = {
                items: updateParams.items || (updateParams.priceId ? [{ price: updateParams.priceId, quantity: updateParams.quantity || 1 }] : undefined),
                metadata: updateParams.metadata,
                proration_behavior: updateParams.prorationBehavior || 'create_prorations',
                billing_cycle_anchor: updateParams.billingCycleAnchor,
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
        });
    }
    /**
     * Cancel a subscription
     * @param {StripeTypes.CancelSubscriptionParams} params cancel parameters
     * @return {Promise<Stripe.Response<Stripe.Subscription>>}
     * returns cancelled stripe subscription
     */
    cancel(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const { subscriptionId, cancelAtPeriodEnd, invoiceNow, prorate } = params;
            if (cancelAtPeriodEnd) {
                // If cancelling at period end, update the subscription instead
                return this.stripe.stripe.subscriptions.update(subscriptionId, {
                    cancel_at_period_end: true
                });
            }
            else {
                // Immediate cancellation
                return this.stripe.stripe.subscriptions.cancel(subscriptionId, {
                    invoice_now: invoiceNow,
                    prorate: prorate
                });
            }
        });
    }
    /**
     * Resume a cancelled subscription
     * @param {string} subscriptionId subscription ID
     * @return {Promise<Stripe.Response<Stripe.Subscription>>}
     * returns resumed stripe subscription
     */
    resume(subscriptionId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.stripe.stripe.subscriptions.update(subscriptionId, {
                cancel_at_period_end: false
            });
        });
    }
    /**
     * Pause a subscription
     * @param {string} subscriptionId subscription ID
     * @param {number} pauseUntil timestamp to pause until
     * @return {Promise<Stripe.Response<Stripe.Subscription>>}
     * returns paused stripe subscription
     */
    pause(subscriptionId, pauseUntil) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.stripe.stripe.subscriptions.update(subscriptionId, {
                pause_collection: {
                    behavior: 'void',
                    resumes_at: pauseUntil
                }
            });
        });
    }
    /**
     * Resume a paused subscription
     * @param {string} subscriptionId subscription ID
     * @return {Promise<Stripe.Response<Stripe.Subscription>>}
     * returns resumed stripe subscription
     */
    unpause(subscriptionId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.stripe.stripe.subscriptions.update(subscriptionId, {
                pause_collection: null
            });
        });
    }
    /**
     * Create subscription item
     * @param {StripeTypes.CreateSubscriptionItemParams} params subscription item parameters
     * @return {Promise<Stripe.Response<Stripe.SubscriptionItem>>}
     * returns stripe subscription item
     */
    createItem(params) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.stripe.stripe.subscriptionItems.create({
                subscription: params.subscriptionId,
                price: params.priceId,
                quantity: params.quantity || 1,
                metadata: params.metadata,
                proration_behavior: params.prorationBehavior || 'create_prorations',
                tax_rates: params.taxRates
            });
        });
    }
    /**
     * Update subscription item
     * @param {StripeTypes.UpdateSubscriptionItemParams} params subscription item parameters
     * @return {Promise<Stripe.Response<Stripe.SubscriptionItem>>}
     * returns updated stripe subscription item
     */
    updateItem(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const { subscriptionItemId } = params, updateParams = __rest(params, ["subscriptionItemId"]);
            return this.stripe.stripe.subscriptionItems.update(subscriptionItemId, {
                price: updateParams.priceId,
                quantity: updateParams.quantity,
                metadata: updateParams.metadata,
                proration_behavior: updateParams.prorationBehavior || 'create_prorations',
                tax_rates: updateParams.taxRates
            });
        });
    }
    /**
     * Delete subscription item
     * @param {string} subscriptionItemId subscription item ID
     * @param {Stripe.SubscriptionItemDeleteParams} params delete parameters
     * @return {Promise<Stripe.Response<Stripe.DeletedSubscriptionItem>>}
     * returns deleted stripe subscription item
     */
    deleteItem(subscriptionItemId, params) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.stripe.stripe.subscriptionItems.del(subscriptionItemId, params);
        });
    }
    /**
     * List subscription items
     * @param {string} subscriptionId subscription ID
     * @param {Stripe.SubscriptionItemListParams} params list parameters
     * @return {Promise<Stripe.Response<Stripe.ApiList<Stripe.SubscriptionItem>>>}
     * returns stripe subscription items list
     */
    listItems(subscriptionId, params) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.stripe.stripe.subscriptionItems.list(Object.assign({ subscription: subscriptionId }, params));
        });
    }
    /**
     * Create subscription schedule
     * @param {StripeTypes.CreateSubscriptionScheduleParams} params schedule parameters
     * @return {Promise<Stripe.Response<Stripe.SubscriptionSchedule>>}
     * returns stripe subscription schedule
     */
    createSchedule(params) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.stripe.stripe.subscriptionSchedules.create({
                customer: params.customer,
                start_date: params.startDate,
                end_behavior: params.endBehavior || 'release',
                metadata: params.metadata,
                phases: params.phases,
                from_subscription: params.fromSubscription
            });
        });
    }
    /**
     * Retrieve subscription schedule
     * @param {string} scheduleId schedule ID
     * @return {Promise<Stripe.Response<Stripe.SubscriptionSchedule>>}
     * returns stripe subscription schedule
     */
    getSchedule(scheduleId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.stripe.stripe.subscriptionSchedules.retrieve(scheduleId);
        });
    }
    /**
     * Cancel subscription schedule
     * @param {string} scheduleId schedule ID
     * @param {Stripe.SubscriptionScheduleCancelParams} params cancel parameters
     * @return {Promise<Stripe.Response<Stripe.SubscriptionSchedule>>}
     * returns cancelled stripe subscription schedule
     */
    cancelSchedule(scheduleId, params) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.stripe.stripe.subscriptionSchedules.cancel(scheduleId, params);
        });
    }
}
exports.Subscriptions = Subscriptions;
//# sourceMappingURL=subscriptions.js.map