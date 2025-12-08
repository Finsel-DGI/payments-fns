export namespace Flw {

  export interface SubaccountResponse {
    status: string;
    message: string;
    data: {
      id: number;
      account_number: string;
      account_bank: string;
      full_name: string;
      created_at: Date;
      split_type: string;
      split_value: number;
      subaccount_id: string;
      bank_name: string;
    };
  }

  export interface ListSubaccountResponse {
    status: string;
    message: string;
    meta: {
      page_info: {
        total: number;
        current_page: number;
        total_pages: number;
      };
    };
    data: {
      id: number;
      account_number: string;
      account_bank: string;
      business_name: string;
      full_name: string;
      created_at: Date;
      meta: {
        meta_name?: string;
        meta_value?: string;
        swift_code?: string;
      }[];
      account_id: number;
      split_ratio: number;
      split_type: string;
      split_value: number;
      subaccount_id: string;
      bank_name: string;
      country: string;
    }[];
  }

  export interface FetchSubaccountResponse {
    status: string;
    message: string;
    data: {
      id: number;
      account_number: string;
      account_bank: string;
      business_name: string;
      full_name: string;
      created_at: Date;
      meta: null;
      account_id: number;
      split_ratio: number;
      split_type: string;
      split_value: number;
      subaccount_id: string;
      bank_name: string;
      country: string;
    };
  }

  export interface UpdateSubaccountResponse {
    status: string;
    message: string;
    data: {
      id: number;
      account_number: string;
      account_bank: string;
      business_name: string;
      full_name: string;
      created_at: Date;
      meta: {
        meta_name: string;
        meta_value: string;
      }[];
      account_id: number;
      split_ratio: number;
      split_type: string;
      split_value: string;
      subaccount_id: string;
      bank_name: string;
      country: string;
    };
  }

  export interface CreateVirtualAccountResponse {
    status: string;
    message: string;
    data: {
      response_code: string;
      response_message: string;
      flw_ref: string;
      order_ref: string;
      account_number: string;
      frequency: string;
      bank_name: string;
      created_at: Date;
      expiry_date: Date;
      note: string;
      amount: string;
    };
  }

  export interface FetchVirtualAccountResponse {
    status: string;
    message: string;
    data: {
      response_code: string;
      response_message: string;
      flw_ref: string;
      order_ref: string;
      account_number: string;
      frequency: string;
      bank_name: string;
      created_at: Date;
      expiry_date: Date;
      note: string;
      amount: number;
    };
  }

  export interface DeleteVirtualAccountResponse {
    status: string;
    message: string;
    data: {
      status: string;
      status_desc: string;
    };
  }

  export interface PayoutSubaccountResponse {
    status: string;
    message: string;
    data: {
      id: number;
      account_reference: string;
      account_name: string;
      barter_id: string;
      email: string;
      mobilenumber: string;
      country: string;
      nuban: string;
      bank_name: string;
      bank_code: string;
      status: string;
      created_at: Date;
    };
  }

  export interface FlutterwaveResponse {
    status: string;
    message: string;
    data: Record<string, unknown>
  }

  export interface FetchPayoutSubaccountResponse {
    status: string;
    message: string;
    data: {
      payout_subaccounts: {
        id: number;
        account_reference: string;
        account_name: string;
        barter_id: string;
        email: string;
        mobilenumber: string;
        country: string;
        nuban: string;
        bank_name: string;
        bank_code: string;
        status: string;
        created_at: Date;
        meta?: {
          staff_strength: number;
          payroll_schedule: string;
        };
      },
      cursor: {
        next: number;
        limit: number;
        has_more_items: boolean;
      }
    };
  }

  export interface UpdatePayoutSubaccountResponse {
    status: string;
    message: string;
    data: {
      id: number;
      account_reference: string;
      account_name: string;
      barter_id: string;
      email: string;
      mobilenumber: string;
      country: string;
      nuban: string;
      bank_name: string;
      bank_code: string;
      status: string;
      created_at: Date;
    };
  }

  export interface RetrieveBVNInformation {
    status: string;
    message: string;
    data: {
      first_name: string;
      last_name: string;
      status: string;
      reference: string;
      callback_url: null;
      bvn_data: {
        bvn: string;
        nin: string;
        email: string;
        gender: string;
        surname: string;
        serialNo: string;
        faceImage: string;
        firstName: string;
        landmarks: string;
        branchName: string;
        middleName: string;
        nameOnCard: string;
        dateOfBirth: Date;
        lgaOfOrigin: string;
        watchlisted: string;
        lgaOfCapture: string;
        phoneNumber1: null;
        phoneNumber2: string;
        maritalStatus: string;
        stateOfOrigin: string;
        enrollBankCode: string;
        enrollUserName: string;
        enrollmentDate: string;
        lgaOfResidence: string;
        stateOfCapture: string;
        additionalInfo1: string;
        productReference: string;
        stateOfResidence: string;
      };
      created_at: Date;
      complete_message: string;
    };
  }

  export interface ResolveBankAccount {
    status: string;
    message: string;
    data: {
      account_number: string;
      account_name: string;
    };
  }


  export interface RetrieveBalances {
    status: string;
    message: string;
    data: {
      currency: string;
      available_balance: number;
      ledger_balance: number;
    }[];
  }

  export interface Banks {
    status: string;
    message: string;
    data: {
      id: number;
      code: string;
      name: string;
    }[];
  }

  export interface BVNVerificationRequest {
    status: string;
    message: string;
    data: {
      url: string;
      reference: string;
    };
  }

  export interface TransferResponse {
    status: string;
    message: string;
    data: {
      id: number;
      account_number: string;
      bank_code: string;
      full_name: string;
      created_at: Date;
      currency: string;
      debit_currency: string;
      amount: number;
      fee: number;
      status: string;
      reference: string;
      meta: null;
      narration: string;
      complete_message: string;
      requires_approval: number;
      is_approved: number;
      bank_name: string;
    };
  }

  export interface TransferResponseRetries {
    status: string;
    message: string;
    data: {
      id: number;
      account_number: string;
      bank_code: string;
      full_name: string;
      created_at: Date;
      currency: string;
      debit_currency: string;
      amount: number;
      fee: number;
      status: string;
      reference: string;
      meta: null;
      narration: string;
      complete_message: string;
      requires_approval: number;
      is_approved: number;
      bank_name: string;
    }[];
  }


  export interface PaymentLinkResponse {
    status: string;
    message: string;
    data: {
      link: string;
    }
  }


  export interface TransactionResponse {
    status: string;
    message: string;
    data: {
      id: number;
      tx_ref: string;
      flw_ref: string;
      device_fingerprint: string;
      amount: number;
      currency: string;
      charged_amount: number;
      app_fee: number;
      merchant_fee: number;
      processor_response: string;
      auth_model: string;
      ip: string;
      narration: string;
      status: string;
      payment_type: string;
      created_at: Date;
      account_id: number;
      card?: {
        first_6digits: string;
        last_4digits: string;
        issuer: string;
        country: string;
        type: string;
        token: string;
        expiry: string;
      };
      meta: null;
      amount_settled: number;
      customer: {
        id: number;
        name: string;
        phone_number: string;
        email: string;
        created_at: Date;
      };
    };
  }

  export interface RefundTransactionResponse {
    status: string;
    message: string;
    data: {
      id: number;
      account_id: number;
      tx_id: number;
      flw_ref: string;
      wallet_id: number;
      amount_refunded: number;
      status: string;
      destination: string;
      meta: {
        source: string;
      };
      created_at: Date;
    };
  }
  
}