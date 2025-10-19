import Stripe from "stripe";

export namespace StripeTypes {
  // Customer related types
  export interface CustomerResponse {
    customer: Stripe.Customer;
  }

  export interface CustomerListResponse {
    customers: Stripe.ApiList<Stripe.Customer>;
  }

  // Payment Intent related types
  export interface PaymentIntentResponse {
    paymentIntent: Stripe.PaymentIntent;
  }

  // Checkout Session related types
  export interface CheckoutSessionResponse {
    session: Stripe.Checkout.Session;
  }

  export interface CheckoutSessionCreateParams {
    currency?: string;
    product?: string;
    email?: string;
    amount: number;
    customer: string;
    lineItems?: { price: string; quantity: number }[];
    redirects: { success: string; cancel: string };
    intent?: Stripe.Checkout.SessionCreateParams.PaymentIntentData;
    billing?: "auto" | "required";
    mode: "setup" | "payment" | "subscription";
  }

  export interface CardSetupCheckoutParams {
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
    redirects: { success: string; cancel: string };
    setup: boolean;
  }

  // Payment Method related types
  export interface PaymentMethodResponse {
    paymentMethod: Stripe.PaymentMethod;
  }

  export interface PaymentMethodListResponse {
    paymentMethods: Stripe.ApiList<Stripe.PaymentMethod>;
  }

  // Price related types
  export interface PriceResponse {
    price: Stripe.Price;
  }

  export interface CreatePriceDataParams {
    price: number;
    product: string;
    currency: string;
    includeTax?: boolean;
  }

  // Connect related types
  export interface ConnectAccountResponse {
    account: Stripe.Account;
  }

  export interface ConnectAccountLinkResponse {
    accountLink: Stripe.AccountLink;
  }

  export interface ConnectMerchantParams {
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

  export interface ConnectCheckoutParams {
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

  // Payment Link related types
  export interface PaymentLinkResponse {
    paymentLink: Stripe.PaymentLink;
  }

  export interface CreatePaymentLinkParams {
    amount: number;
    product: string;
    customer: string;
    fee: number;
    currency?: string;
    behaviour: "inclusive" | "exclusive";
    redirect_url: string;
    transfer_data?: Stripe.PaymentLinkCreateParams.TransferData;
  }

  // Refund related types
  export interface RefundResponse {
    refund: Stripe.Refund;
  }

  // Billing Portal related types
  export interface BillingPortalSessionResponse {
    session: Stripe.BillingPortal.Session;
  }

  // Charge related types
  export interface ChargeCustomerParams {
    amount: number;
    currency?: string;
    customer: string;
    method: string;
  }

  // Product related types
  export interface CheckoutWithProductPricesParams {
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

  // Subscription related types
  export interface SubscriptionResponse {
    subscription: Stripe.Subscription;
  }

  export interface SubscriptionListResponse {
    subscriptions: Stripe.ApiList<Stripe.Subscription>;
  }

  export interface CreateSubscriptionParams {
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

  export interface UpdateSubscriptionParams {
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

  export interface CancelSubscriptionParams {
    subscriptionId: string;
    cancelAtPeriodEnd?: boolean;
    invoiceNow?: boolean;
    prorate?: boolean;
  }

  export interface SubscriptionItemResponse {
    subscriptionItem: Stripe.SubscriptionItem;
  }

  export interface SubscriptionItemListResponse {
    subscriptionItems: Stripe.ApiList<Stripe.SubscriptionItem>;
  }

  export interface CreateSubscriptionItemParams {
    subscriptionId: string;
    priceId: string;
    quantity?: number;
    metadata?: Record<string, string>;
    prorationBehavior?: Stripe.SubscriptionItemCreateParams.ProrationBehavior;
    taxRates?: string[];
  }

  export interface UpdateSubscriptionItemParams {
    subscriptionItemId: string;
    priceId?: string;
    quantity?: number;
    metadata?: Record<string, string>;
    prorationBehavior?: Stripe.SubscriptionItemUpdateParams.ProrationBehavior;
    taxRates?: string[];
  }

  export interface SubscriptionScheduleResponse {
    schedule: Stripe.SubscriptionSchedule;
  }

  export interface CreateSubscriptionScheduleParams {
    customer: string;
    startDate?: number;
    endBehavior?: Stripe.SubscriptionScheduleCreateParams.EndBehavior;
    metadata?: Record<string, string>;
    phases: Stripe.SubscriptionScheduleCreateParams.Phase[];
    fromSubscription?: string;
  }

  export interface TrialPeriod {
    days?: number;
    end?: number;
  }
}
