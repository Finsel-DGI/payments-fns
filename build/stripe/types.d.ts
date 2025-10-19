import Stripe from "stripe";
export declare namespace StripeTypes {
    interface CustomerResponse {
        customer: Stripe.Customer;
    }
    interface CustomerListResponse {
        customers: Stripe.ApiList<Stripe.Customer>;
    }
    interface PaymentIntentResponse {
        paymentIntent: Stripe.PaymentIntent;
    }
    interface CheckoutSessionResponse {
        session: Stripe.Checkout.Session;
    }
    interface CheckoutSessionCreateParams {
        currency?: string;
        product?: string;
        email?: string;
        amount: number;
        customer: string;
        lineItems?: {
            price: string;
            quantity: number;
        }[];
        redirects: {
            success: string;
            cancel: string;
        };
        intent?: Stripe.Checkout.SessionCreateParams.PaymentIntentData;
        billing?: "auto" | "required";
        mode: "setup" | "payment" | "subscription";
    }
    interface CardSetupCheckoutParams {
        customer: string;
        lineItems?: {
            price_data: {
                currency: string;
                product_data: {
                    name: string;
                    description: string;
                };
                unit_amount: number;
            };
            quantity: number;
        }[];
        receipt_email: string;
        billing?: "auto" | "required";
        metadata: Record<string, string | number | null>;
        redirects: {
            success: string;
            cancel: string;
        };
        setup: boolean;
    }
    interface PaymentMethodResponse {
        paymentMethod: Stripe.PaymentMethod;
    }
    interface PaymentMethodListResponse {
        paymentMethods: Stripe.ApiList<Stripe.PaymentMethod>;
    }
    interface PriceResponse {
        price: Stripe.Price;
    }
    interface CreatePriceDataParams {
        price: number;
        product: string;
        currency: string;
        includeTax?: boolean;
    }
    interface ConnectAccountResponse {
        account: Stripe.Account;
    }
    interface ConnectAccountLinkResponse {
        accountLink: Stripe.AccountLink;
    }
    interface ConnectMerchantParams {
        refresh_url: string;
        return_url: string;
        company: {
            name: string;
            email: string;
            business_type: Stripe.AccountCreateParams.BusinessType;
            country?: string;
        };
        capabilities?: Stripe.AccountCreateParams.Capabilities;
    }
    interface ConnectCheckoutParams {
        currency: string;
        product: string;
        email: string;
        amount: number;
        fee: number;
        redirects: {
            success: string;
            failed: string;
        };
        connectID: string;
    }
    interface PaymentLinkResponse {
        paymentLink: Stripe.PaymentLink;
    }
    interface CreatePaymentLinkParams {
        amount: number;
        product: string;
        customer: string;
        fee: number;
        currency?: string;
        behaviour: "inclusive" | "exclusive";
        redirect_url: string;
        transfer_data?: Stripe.PaymentLinkCreateParams.TransferData;
    }
    interface RefundResponse {
        refund: Stripe.Refund;
    }
    interface BillingPortalSessionResponse {
        session: Stripe.BillingPortal.Session;
    }
    interface ChargeCustomerParams {
        amount: number;
        currency?: string;
        customer: string;
        method: string;
    }
    interface CheckoutWithProductPricesParams {
        currency?: string;
        customer?: string;
        email?: string;
        product: string;
        priceId: string;
        redirects?: {
            success: string;
            cancel: string;
        };
    }
    interface SubscriptionResponse {
        subscription: Stripe.Subscription;
    }
    interface SubscriptionListResponse {
        subscriptions: Stripe.ApiList<Stripe.Subscription>;
    }
    interface CreateSubscriptionParams {
        customer: string;
        priceId: string;
        trialPeriodDays?: number;
        trialEnd?: number;
        metadata?: Record<string, string>;
        paymentBehavior?: Stripe.SubscriptionCreateParams.PaymentBehavior;
        collectionMethod?: Stripe.SubscriptionCreateParams.CollectionMethod;
        defaultPaymentMethod?: string;
        prorationBehavior?: Stripe.SubscriptionCreateParams.ProrationBehavior;
        billingCycleAnchor?: number;
        cancelAtPeriodEnd?: boolean;
        daysUntilDue?: number;
        description?: string;
        expand?: string[];
        items?: Stripe.SubscriptionCreateParams.Item[];
        offSession?: boolean;
        paymentSettings?: Stripe.SubscriptionCreateParams.PaymentSettings;
        pendingInvoiceItemInterval?: Stripe.SubscriptionCreateParams.PendingInvoiceItemInterval;
        quantity?: number;
        taxBehavior?: 'unspecified' | 'inclusive' | 'exclusive';
        transferData?: Stripe.SubscriptionCreateParams.TransferData;
    }
    interface UpdateSubscriptionParams {
        subscriptionId: string;
        priceId?: string;
        quantity?: number;
        metadata?: Record<string, string>;
        prorationBehavior?: Stripe.SubscriptionUpdateParams.ProrationBehavior;
        billingCycleAnchor?: 'now' | number;
        cancelAtPeriodEnd?: boolean;
        daysUntilDue?: number;
        defaultPaymentMethod?: string;
        description?: string;
        expand?: string[];
        items?: Stripe.SubscriptionUpdateParams.Item[];
        offSession?: boolean;
        paymentSettings?: Stripe.SubscriptionUpdateParams.PaymentSettings;
        pendingInvoiceItemInterval?: Stripe.SubscriptionUpdateParams.PendingInvoiceItemInterval;
        taxBehavior?: 'unspecified' | 'inclusive' | 'exclusive';
        transferData?: Stripe.SubscriptionUpdateParams.TransferData;
    }
    interface CancelSubscriptionParams {
        subscriptionId: string;
        cancelAtPeriodEnd?: boolean;
        invoiceNow?: boolean;
        prorate?: boolean;
    }
    interface SubscriptionItemResponse {
        subscriptionItem: Stripe.SubscriptionItem;
    }
    interface SubscriptionItemListResponse {
        subscriptionItems: Stripe.ApiList<Stripe.SubscriptionItem>;
    }
    interface CreateSubscriptionItemParams {
        subscriptionId: string;
        priceId: string;
        quantity?: number;
        metadata?: Record<string, string>;
        prorationBehavior?: Stripe.SubscriptionItemCreateParams.ProrationBehavior;
        taxRates?: string[];
    }
    interface UpdateSubscriptionItemParams {
        subscriptionItemId: string;
        priceId?: string;
        quantity?: number;
        metadata?: Record<string, string>;
        prorationBehavior?: Stripe.SubscriptionItemUpdateParams.ProrationBehavior;
        taxRates?: string[];
    }
    interface SubscriptionScheduleResponse {
        schedule: Stripe.SubscriptionSchedule;
    }
    interface CreateSubscriptionScheduleParams {
        customer: string;
        startDate?: number;
        endBehavior?: Stripe.SubscriptionScheduleCreateParams.EndBehavior;
        metadata?: Record<string, string>;
        phases: Stripe.SubscriptionScheduleCreateParams.Phase[];
        fromSubscription?: string;
    }
    interface TrialPeriod {
        days?: number;
        end?: number;
    }
}
