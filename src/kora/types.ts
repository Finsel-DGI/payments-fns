
type KoraPayload = {
  status: boolean;
  message: string;
  error?: string;
}

export type KoraHookPayload = {
  event: string;
  data: Record<string, unknown>
}

export interface KoraCustomer {
  email: string;
  name?: string;
}

export namespace Korapay {


  export type CheckoutRedirect = {
    data: {
      reference: string;
      checkout_url: string;
    }
  } & KoraPayload;

  export type BulkPayouts = {
    data: {
      status: string;
      total_chargeable_amount: number;
      merchant_bears_cost: boolean;
      currency: string;
      reference: string;
      description: string;
      created_at: Date;
    }
  } & KoraPayload;

  export type Balances = {
    data: {
      NGN: {
        pending_balance: number;
        available_balance: number;
      }
    }
  } & KoraPayload;

  export type ListOfBanks = {
    data: {
      name: string;
      slug: string;
      code: string;
      nibss_bank_code: null | string;
      country: string;
    }[]
  } & KoraPayload;

  export type ResolveBankAccount = {
    data: {
      bank_name: string;
      bank_code: string;
      account_number: string;
      account_name: string;
    }
  } & KoraPayload;

  export type SinglePayoutResponse = {
    data: {
      amount: number;
      fee: number;
      currency: string;
      status: string;
      reference: string;
      narration: string;
      customer: KoraCustomer;
    }
  } & KoraPayload;


  export type VirtualAccount = {
    data: {
      account_name: string;
      account_number: string;
      account_status: string;
      account_reference: string;
      unique_id: string;
      bank_name: string;
      bank_code: string;
      currency: string;
      created_at: Date;
      customer: KoraCustomer;
    }
  } & KoraPayload;
  

  export type VirtualAccountTransactions = {
    data: {
      total_amount_received: number;
      account_number: string;
      currency: string;
      transactions: {
        reference: string;
        status: string;
        amount: number;
        fee: number;
        currency: string;
        description: string;
        payer_bank_account: PayerBankAccount;
      }[];
      pagination: Pagination;
    }
  } & KoraPayload;
  
  export type CreateVirtualAccount = {
    data: {
      account_name: string;
      account_number: string;
      bank_code: string;
      bank_name: string;
      account_reference: string;
      unique_id: string;
      account_status: string;
      created_at: Date;
      currency: string;
      customer: KoraCustomer;
    }
  } & KoraPayload;
  
  interface PayerBankAccount {
    account_number: string;
    account_name: string;
    bank_name: string;
  }
  
  interface CardDetails {
    card_type: string;
    first_six: string;
    last_four: string;
    expiry: string;
  }

  interface Pagination {
    page: number;
    total: number;
    pageCount: number;
    totalPages: number;
  }

  interface PaymentSources {
    amount_paid: string;
    narration: string;
    payment_source_type: string;
    message: string;
    status: string;
  }

  export type QueryCharge = {
    data: {
      reference: string;
      status: string;
      amount: number;
      amount_paid: number;
      fee: number;
      currency: string;
      description: string;
      payment_method?: string;
      payer_bank_account?: PayerBankAccount;
      card?: CardDetails;
    }
  } & KoraPayload;

  export type BulkTransactionCheck = {
    data: {
      amount: string;
      currency: string;
      reference: string;
      status: string;
      description: string;
      failed_transactions: number;
      successful_transactions: number;
      pending_transactions: number;
      processing_transactions: number;
    }
  } & KoraPayload;

  export type QueryBulkPayouts = {
    data: {
      data: {
        reference: string;
        amount: string;
        currency: string;
        narration: string;
        status: string;
        batch_reference: string;
        type: string;
        customer: KoraCustomer;
        bank_account: {
          bank_code: null | string;
          account_number: null | string;
        };
      }[],
      paging: {
        total_items: number;
        page_size: number;
        current: number;
        count: number;
      };
    }
  } & KoraPayload;

  export type PayWithBankResponse = {
    data: {
      currency: string;
      amount: number;
      fee: number;
      vat: number;
      transaction_reference: string;
      payment_reference: string;
      status: string;
      merchant_bears_cost: boolean;
      customer: KoraCustomer;
      narration: string;
      authorization: {
        redirect_url: string;
      };
      bank_account: {
        bank_name: string;
      };
      message: string;
    }
  } & KoraPayload;


  export type VerifyPayoutResponse = {
    data: {
      reference: string;
      status: string;
      amount: number;
      fee: number;
      currency: string;
      narration: string;
      trace_id: string;
      message: string;
      customer: KoraCustomer;
    }
  } & KoraPayload;


  export type ListPayoutsResponse = {
    data: {
      has_more: boolean;
      payouts: {
        pointer: string;
        reference: string;
        status: string;
        amount: number;
        fee: number;
        currency: string;
        narration: string;
        trace_id: string;
        message: string;
        payment_destination: string;
        customer_name: string;
        customer_email: string;
        date_created: Date;
        date_completed: Date;
      }
    }
  } & KoraPayload;

  export type PayinsResponse = {
    data: {
      has_more: boolean;
      payins: {
        pointer: string;
        reference: string;
        status: string;
        amount: number;
        amount_paid: number;
        fee: null | number;
        currency: string;
        description: string;
        payment_method: string;
        message: string;
        date_created: Date;
        date_completed: null;
        payment_sources: PaymentSources;
      }[];
    }
  } & KoraPayload;

  export type ChargeEvent =  {
    reference: string;
    payment_reference: string;
    currency: string;
    amount: number;
    fee: number;
    payment_method: string;
    status: string;
  }
  
  export type TransferEvent = {
    reference: string;
    currency: string;
    amount: number;
    fee: number;
    status: string;
  }

}