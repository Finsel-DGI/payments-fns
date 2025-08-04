/* eslint-disable */

type PayStackPayload = {
  status: boolean
  message: string,
}

/**
 * Paystack integration
 */
export namespace Paystack {
  /**
   * User interface
   */
  export interface IUser {
    first_name?: string,
    last_name?: string,
    debug?: boolean,
    phone?: string,
    email: string
  }

  /**
   * Payment interface
   */
  export interface IPaymentInitializeRequest {
    amountMajor: number,
    payingUser: IUser
  }

  /**
   * Payment request interface
   */
  export interface IPaymentRequest {
    description: string,
    currency: string,
    amount: number,
    invoice_number?: number,
    send_notification?: boolean,
    line_items: IPaymentLineItem[],
    tax: IPaymentLineItem[],
    customer: string,
    /**
     * Use YYYY-MM-DD
     */
    due_date: string,
    debug?: boolean
  }

  /**
   * Payment request interface
   */
  export interface IPaymentLineItem {
    name: string,
    /**
     * In kobos
     */
    amount: number,
  }

  /**
   * Payment response
   */
  export interface IPaymentInitializeResponse {
    paymentProviderRedirectUrl: string
    paymentReference: string,
    accessCode: string
  }

  export interface ISplit {
    status: boolean;
    message: string;
    data: {
      id: number;
      name: string;
      type: string;
      currency: string;
      integration: number;
      domain: string;
      split_code: string;
      active: boolean;
      bearer_type: string;
      createdAt: Date;
      updatedAt: Date;
      is_dynamic: boolean;
      subaccounts: {
        subaccount: {
          id: number;
          subaccount_code: string;
          business_name: string;
          description: string;
          primary_contact_name: null;
          primary_contact_email: null;
          primary_contact_phone: null;
          metadata: null;
          settlement_bank: string;
          currency: string;
          account_number: string;
        },
        share: number;
      }[];
      total_subaccounts: number;
    };
  }

  export interface ICustomer {
    status: boolean;
    message: string;
    data: {
      email: string;
      integration: number;
      domain: string;
      customer_code: string;
      id: number;
      identified: boolean;
      identifications: null;
      createdAt: Date;
      updatedAt: Date;
    };
  }

  /**
   * Charge response
   */
  export interface IChargeResponse {
    status: boolean
    message: string,
    data: {
      amount: number;
      domain: string;
      status: string;
      reference: string;
      channel: string;
      customer: Customer;
      currency: string;
      gateway_response: string;
      authorization: IPaystackAuthorization;
      id: number;
    }
  }

  export interface ITransactionResponse {
    status: boolean,
    message: string,
    data: ChargeSuccess
  }

  export type IDirectDebitAuthorizationResponse = {
    data: {
      authorization_code: string;
      active: boolean;
      last4: string;
      channel: string;
      card_type: string;
      reference: string;
      bank: string;
      exp_month: number;
      exp_year: number;
      country_code: string;
      brand: string;
      reusable: boolean;
      signature: string;
      account_name: string;
      customer: {
        code: string;
        email: string;
        risk_action: string;
      };
    }
  } & PayStackPayload

  export type IVerifyAuthorizationResponse = {
    data: {
      authorization_code: string;
      channel: string;
      bank: string;
      active: string;
      customer: {
        code: string;
        email: string;
      }
    }
  } & PayStackPayload


  export type IResolveAccountResponse = {
    data: {
      account_number: string;
      account_name: string;
    }
  } & PayStackPayload

  export type INigerianBanksResponse = {
    data: {
      name: string;
      code: string;
      id: string;
      currency: string;
    }[]
  } & PayStackPayload

  export type IInitializeAuthorizationResponse = {
    data: {
      redirect_url: string;
      access_code: string;
      reference: string;
    }
  } & PayStackPayload

  export type IChargeAuthorizationResponse = {
    data: {
      transaction_date: Date;
      status: string;
      currency: string;
      amount: number;
      reference: string;
      authorization: Authorization;
      customer: Customer;
    }
  } & PayStackPayload


  export interface IChargeAttempted {
    amount: number;
    currency: string;
    transaction_date: Date;
    status: string;
    reference: string;
    domain: string; // live | test
    metadata: string;
    gateway_response: string;
    message: null;
    channel: string;
    ip_address: null;
    log: null;
    fees: number;
    authorization: Authorization;
    customer: Customer;
    plan: null;
    id: number;
  }


  /**
   * Customer creation response
   */
  export interface ICustomerResponse {
    status: boolean
    message: string,
    data: {
      email: string,
      createdAt: string,
      updatedAt: string,
      integration: string,
      authorizations: IPaystackAuthorization[],
      subscriptions: ISubscription[],
      domain: string,
      customer_code: string,
      total_transactions: number,
      id: number,
      identified: boolean,
    }
  }

  export interface Customer {
    id: number;
    first_name: null;
    last_name: null;
    email: string;
    customer_code: string;
    phone: null;
    metadata: null;
    risk_action: string;
    international_format_phone: null;
  }

  export interface InvoiceCreate {
    domain: string;
    invoice_code: string;
    amount: number;
    period_start: Date;
    period_end: Date;
    status: string;
    paid: boolean;
    paid_at: Date;
    authorization: Authorization;
    subscription: Subscription;
    customer: Customer;
    transaction: Transaction;
    created_at: Date;
  }

  export interface ChargeSuccess {
    id: number;
    domain: string;
    status: string;
    reference: string;
    ip_address: string;
    amount: number;
    gateway_response: string;
    paid_at: Date;
    created_at: Date;
    channel: string;
    currency: string;
    fees: number;
    fees_split: FeesSplit | null;
    authorization: Authorization;
    customer: Customer;
    plan: Plan;
    paidAt: Date;
    requested_amount: number;
    pos_transaction_data: null;
    source: Source;
    metadata?: Metadata;
  }

  interface FeesSplit {
    paystack: number;
    integration: number;
    subaccount: number;
    params: {
      bearer: string;
      transaction_charge: string;
      percentage_charge: string;
    };
  }

  export interface PaystackTransferEvent {
    amount: number;
    currency: string;
    domain: 'live' | 'test';
    failures: null | any; // Could be more specific if we knew possible failure structures
    id: number;
    integration: {
      id: number;
      is_live: boolean;
      business_name: string;
    };
    reason: string;
    reference: string;
    source: string;
    source_details: null | any; // Could be more specific if we knew possible structures
    status: 'reversed' | 'success' | 'failed';
    titan_code: null | string;
    transfer_code: string;
    transferred_at: string | null;
    recipient: {
      active: boolean;
      currency: string;
      description: string | null;
      domain: 'live' | 'test';
      email: string | null;
      id: number;
      integration: number;
      metadata: null | any; // Could be more specific if we knew possible structures
      name: string;
      recipient_code: string;
      type: string;
      is_deleted: boolean;
      details: {
        authorization_code: null | string;
        account_number: string;
        account_name: string | null;
        bank_code: string;
        bank_name: string;
      };
      created_at: string;
      updated_at: string;
    };
    session: {
      provider: string | null;
      id: string | null;
    };
    created_at: string;
    updated_at: string;
  }

  export interface Source {
    type: string;
    source: string;
    entry_point: string;
    identifier: null;
  }

  interface Metadata {
    referrer?: string;
  }

  interface Transaction {
    reference: string;
    status: string;
    amount: number;
    currency: string;
  }

  /**
   * Transaction response
   */
  export interface ITransactionRequest {
    status: boolean
    message: string,
    data: {
      authorization_url: string;
      access_code: string;
      reference: string;
    }
  }

  /**
   * Transaction response
   */
  export interface ISubscriptionResponse {
    status: boolean
    message: string,
    data: {
      authorization: Authorization;
      customer: Customer;
      id: number;
      domain: string;
      status: string;
      amount: number;
      subscription_code: string;
      createdAt: string;
      updatedAt: string;
      email_token: string;
    }
  }

  export interface SubscriptionEvent {
    id: number;
    domain: string;
    status: string;
    subscription_code: string;
    email_token: string;
    amount: number;
    cron_expression: string;
    next_payment_date: null;
    open_invoice: null;
    integration: number;
    plan: Plan;
    authorization: Authorization;
    customer: Customer;
    invoices: any[];
    invoices_history: any[];
    invoice_limit: number;
    split_code: null;
    most_recent_invoice: null;
    created_at: Date;
  }

  export interface ISubaccount {
    status: boolean
    message: string,
    data: {
      business_name: string;
      account_number: string;
      percentage_charge: number;
      settlement_bank: string;
      currency: string;
      bank: number;
      integration: number;
      domain: string;
      account_name: string;
      product: string;
      managed_by_integration: number;
      subaccount_code: string;
      is_verified: boolean;
      settlement_schedule: string;
      active: boolean;
      migrate: boolean;
      id: number;
      createdAt: Date;
      updatedAt: Date;
    }
  }

  export interface ITransfer {
    status: boolean;
    message: string;
    data: {
      reference: string;
      integration: number;
      domain: string;
      amount: number;
      currency: string;
      source: string;
      reason: string;
      recipient: number;
      status: string;
      transfer_code: string;
      id: number;
      createdAt: Date;
      updatedAt: Date;
    }
  }

  export interface ICreateTransferRecipient {
    status: boolean
    message: string,
    data: {
      active: boolean;
      createdAt: Date;
      currency: string;
      domain: string;
      id: number;
      integration: number;
      name: string;
      recipient_code: string;
      type: string;
      updatedAt: Date;
      is_deleted: boolean;
      isDeleted: boolean;
      details: Details;
    }
  }

  /**
   * Transaction status
   */
  export interface ITransactionStatus {
    status: boolean
    message: string,
    data: {
      id: number;
      domain: string;
      status: string;
      reference: string;
      paid_at: Date;
      created_at: Date;
      channel: string;
      amount: number;
      currency: string;
      message: string;
      ip_address: string;
      fees: number;
      authorization: Authorization;
      customer: Customer;
      fees_split: FeesSplit | null;
    }
  }

  export interface Authorization {
    authorization_code: string;
    bin: string;
    last4: string;
    exp_month: string;
    exp_year: string;
    channel: string;
    card_type: string;
    bank: string;
    country_code: string;
    brand: string;
    reusable: boolean;
    signature: string;
    account_name: null;
  }

  /**
   * Customer creation response
   */
  export interface IPaystackResponse {
    status: boolean
    message: string,
    data?: Record<string, unknown>
  }

  /**
   * Payment request response
   */
  export interface IPaymentRequestResponse {
    status: boolean
    message: string,
    data: {
      created_at: string,
      status: string,
      due_date: string,
      offline_reference: string,
      currency: string,
      request_code: string,
      /**
       * live or test
       */
      domain: string,
      customer: number,
      invoice_number: number,
      description: string,
      amount: number,
      id: number,
      paid: boolean,
    }
  }

  /**
   * Verify pay request response
   */
  export interface IVerifyPayRequestResponse {
    status: boolean
    message: string,
    data: {
      description: string,
      created_at: string,
      status: string,
      due_date: string,
      paid_at?: string,
      offline_reference: string,
      currency: string,
      pdf_url?: string,
      request_code: string,
      /**
       * live or test
       */
      domain: string,
      amount: number,
      pending_amount: number,
      id: number,
      paid: boolean,
    }
  }

  export interface IPaystackAuthorization {
    authorization_code: string;
    bin: string;
    last4: string;
    exp_month: string;
    exp_year: string;
    channel: string;
    card_type: string;
    bank: string;
    country_code: string;
    brand: string;
    reusable: boolean;
    signature: string;
    account_name: null;
  }

  interface Subscription {
    status: string;
    subscription_code: string;
    email_token: string;
    amount: number;
    cron_expression: string;
    next_payment_date: Date;
    open_invoice: null;
  }

  export interface InvoiceFailed {
    domain: string;
    invoice_code: string;
    amount: number;
    period_start: Date;
    period_end: Date;
    status: string;
    paid: boolean;
    paid_at?: Date;
    description?: string;
    authorization: Authorization;
    subscription: Subscription;
    customer: Customer;
    transaction: Transaction;
    created_at: Date;
  }

  export interface InvoiceUpdated {
    domain: string;
    invoice_code: string;
    amount: number;
    period_start: Date;
    period_end: Date;
    status: string;
    paid: boolean;
    paid_at?: Date;
    description?: string;
    authorization: Authorization;
    subscription: Subscription;
    customer: Customer;
    transaction: Transaction;
    created_at: Date;
  }

  export interface ISubscription {
    id: number;
    domain: string;
    status: string;
    subscription_code: string;
    email_token: string;
    amount: number;
    cron_expression: string;
    next_payment_date: Date;
    open_invoice: null;
    createdAt: Date;
    integration: number;
    plan: Plan;
    authorization: Authorization;
    customer: Customer;
    invoices: any[];
    invoices_history: any[];
    invoice_limit: number;
    split_code: null;
    most_recent_invoice: null;
  }

  export interface IVirtualAccount {
    status: boolean;
    message: string;
    data: {
      bank: Bank;
      account_name: string;
      account_number: string;
      assigned: boolean;
      currency: string;
      metadata: null;
      active: boolean;
      id: number;
      created_at: Date;
      updated_at: Date;
      assignment: Assignment;
      customer: Customer;
    }
  }

  export interface IVirtualAccountFetch {
    status: boolean;
    message: string;
    data: {
      customer: Customer;
      bank: Bank;
      id: number;
      account_name: string;
      account_number: string;
      created_at: Date;
      updated_at: Date;
      currency: string;
      split_config: string;
      active: boolean;
      assigned: boolean;
    };
  }

  export interface ISubscriptions {
    customer: Customer;
    plan: Plan;
    integration: number;
    authorization: Authorization;
    domain: string;
    start: number;
    status: string;
    quantity: number;
    amount: number;
    subscription_code: string;
    email_token: string;
    easy_cron_id: string;
    cron_expression: string;
    next_payment_date: Date;
    open_invoice: string;
    id: number;
    createdAt: Date;
    updatedAt: Date;
  }

  interface Assignment {
    integration: number;
    assignee_id: number;
    assignee_type: string;
    expired: boolean;
    account_type: string;
    assigned_at: Date;
  }

  interface Bank {
    name: string;
    id: number;
    slug: string;
  }

  interface Plan {
    domain: string;
    name: string;
    plan_code: string;
    description: string;
    amount: number;
    interval: string;
    send_invoices: boolean;
    send_sms: boolean;
    hosted_page: boolean;
    hosted_page_url: null;
    hosted_page_summary: null;
    currency: string;
    migrate: null;
    id: number;
    integration: number;
    createdAt: Date;
    updatedAt: Date;
  }

  /**
   * Customer creation response
   */
  export interface IResponse<T> {
    code: number,
    response: T
  }

  export interface IPayLog {
    start_time: number;
    time_spent: number;
    attempts: number;
    errors: number;
    success: boolean;
    mobile: boolean;
    input: any[];
    history: History[];
  }

  export interface History {
    type: string;
    message: string;
    time: number;
  }
}

interface Details {
  authorization_code: null;
  account_number: string;
  account_name: string;
  bank_code: string;
  bank_name: string;
}