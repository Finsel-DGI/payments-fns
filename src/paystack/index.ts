import { HttpClient, HttpMethod, HttpRequest } from '../utils/http-client';
import { Paystack } from './types';

export interface PayStackConfig {
  url?: string;
  testsk: string;
  prodsk: string;
}

type PaymentChannels = 'card' | 'bank' | 'ussd' | 'qr' | 'mobile_money' | 'bank_transfer';

export class PaystackService {
  private readonly config: PayStackConfig;
  private readonly secret: string;
  private readonly httpClient: HttpClient;

  /**
   * Initialize Paystack service
   * @param debug - Use test secret key when true
   * @param customConfig - Optional custom configuration
   */
  constructor(debug = false, customConfig: PayStackConfig) {
    this.config = {
      ...customConfig,
    };
    this.secret = debug ? this.config.testsk : this.config.prodsk;
    this.httpClient = new HttpClient({
      baseUrl: this.config.url || "https://api.paystack.co",
      defaultHeaders: this.getDefaultHeaders(),
    });
  }

  private getDefaultHeaders() {
    return {
      Authorization: `Bearer ${this.secret}`,
      'Content-Type': 'application/json',
      'user-agent': 'Rebat-Labs-Developers-Hub',
      'cache-control': 'no-cache',
    };
  }

  private async makeRequest<T>(
    method: HttpMethod,
    endpoint: string,
    config?: HttpRequest
  ): Promise<T> {
    const response = await this.httpClient.request<T>(method, endpoint, config);

    if (!response.success) {
      throw new Error(response.error?.message || 'Paystack API request failed');
    }

    return response.data!;
  }

  // Customer Methods
  public async verifyAuthorization(reference: string): Promise<Paystack.IVerifyAuthorizationResponse> {
    return this.makeRequest(
      'GET',
      `/customer/authorization/verify/${reference}`
    );
  }

  public async fetchCustomer(identifier: string): Promise<Paystack.ICustomerResponse> {
    return this.makeRequest(
      'GET',
      `/customer/${identifier}`
    );
  }

  public async createCustomer(params: {
    email: string;
    first_name: string;
    last_name: string;
    phone?: string; 
  }): Promise<Paystack.ICustomer> {
    return this.makeRequest(
      'POST',
      '/customer',
      {
        body: { 
        ...params
       } }
    );
  }

  public async deactivateAuthorization(code: string): Promise<Paystack.ITransactionStatus> {
    return this.makeRequest(
      'POST',
      '/customer/authorization/deactivate',
      { body: { authorization_code: code } }
    );
  }

  // Subscription Methods
  public async cancelSubscription(params: { code: string; token: string }): Promise<void> {
    await this.makeRequest(
      'POST',
      '/subscription/disable',
      { body: params }
    );
  }

  public async fetchCustomerSubscriptions(params: { customer: number }): Promise<Paystack.ISubscriptions[]> {
    return this.makeRequest(
      'GET',
      `/subscription?customer=${params.customer}`
    );
  }

  public async createSubscription(params: { customer: string; plan: string }): Promise<Paystack.ISubscriptionResponse> {
    return this.makeRequest(
      'POST',
      '/subscription',
      { body: params }
    );
  }

  // Transaction Methods
  public async verifyTransaction(reference: string): Promise<Paystack.ITransactionStatus> {
    return this.makeRequest(
      'GET',
      `/transaction/verify/${reference}`
    );
  }

  public async fetchTransaction(reference: string): Promise<Paystack.ITransactionResponse> {
    return this.makeRequest(
      'GET',
      `/transaction/${reference}`
    );
  }

  public async chargeAuthorization(
    email: string,
    amount: number,
    authorization: string,
    extra?: { subaccount?: string; fee?: number }
  ): Promise<Paystack.IChargeResponse> {
    return this.makeRequest(
      'POST',
      '/transaction/charge_authorization',
      {
        body: {
          email,
          amount,
          authorization_code: authorization,
          ...(extra?.subaccount && { subaccount: extra.subaccount }),
          ...(extra?.fee && { transaction_charge: extra.fee }),
        },
      }
    );
  }
  
  public async simpleCharge(
    params: {
      email: string,
      amount: number,
      split_code?: string,
      subaccount?: string,
    }
  ): Promise<Paystack.IChargeResponse> {
    return this.makeRequest(
      'POST',
      '/charge',
      {
        body: {
          ...params
        },
      }
    );
  }

  public async initiateTransaction(params: {
    email?: string;
    amount: number;
    plan?: string;
    customer?: string;
    channels?: PaymentChannels[];
  }): Promise<Paystack.ITransactionRequest> {
    if (!params.email && !params.customer) {
      throw new Error('Transaction requires either email or customer');
    }

    return this.makeRequest(
      'POST',
      '/transaction/initialize',
      { body: params }
    );
  }

  // Bank Account Methods
  public async resolveBankAccount(params: { account: string; code: string }): Promise<Paystack.IResolveAccountResponse> {
    return this.makeRequest(
      'GET',
      `/bank/resolve?account_number=${params.account}&bank_code=${params.code}`
    );
  }

  public async listNigerianBanks(): Promise<Paystack.INigerianBanksResponse> {
    return this.makeRequest(
      'GET',
      '/bank?country=nigeria'
    );
  }

  // Subaccount Methods
  public async fetchSubAccount(subaccount: string): Promise<Paystack.ISubaccount> {
    return this.makeRequest(
      'GET',
      `/subaccount/${subaccount}`
    );
  }

  public async createSubAccount(params: {
    name: string;
    bankCode: string;
    accountNumber: string;
    chargePercentage: number;
  }): Promise<Paystack.ISubaccount> {
    return this.makeRequest(
      'POST',
      '/subaccount',
      {
        body: {
          business_name: params.name,
          settlement_bank: params.bankCode,
          account_number: params.accountNumber,
          percentage_charge: params.chargePercentage,
        },
      }
    );
  }

  public async updateSubAccount(params: {
    subaccount: string;
    name?: string;
    bankCode?: string;
    accountNumber?: string;
    chargePercentage?: number;
    active?: boolean;
  }): Promise<Paystack.ISubaccount> {
    return this.makeRequest(
      'PUT',
      `/subaccount/${params.subaccount}`,
      {
        body: {
          ...(params.name && { business_name: params.name }),
          ...(params.bankCode && { settlement_bank: params.bankCode }),
          ...(params.accountNumber && { account_number: params.accountNumber }),
          ...(params.chargePercentage && { percentage_charge: params.chargePercentage }),
          ...(typeof params.active !== 'undefined' && { active: params.active }),
        },
      }
    );
  }

  // Transfer Methods
  public async createTransferRecipient(params: {
    name: string;
    bankCode: string;
    accountNumber: string;
  }): Promise<Paystack.ICreateTransferRecipient> {
    return this.makeRequest(
      'POST',
      '/transferrecipient',
      {
        body: {
          name: params.name,
          currency: 'NGN',
          bank_code: params.bankCode,
          account_number: params.accountNumber,
          type: 'nuban',
        },
      }
    );
  }

  public async transfer(params: {
    amount: number;
    reference: string;
    recipient: string;
    reason: string;
  }): Promise<Paystack.ITransfer> {
    return this.makeRequest(
      'POST',
      '/transfer',
      {
        body: {
          source: 'balance',
          amount: params.amount,
          reference: params.reference,
          recipient: params.recipient,
          reason: params.reason,
        },
      }
    );
  }

  // Virtual Accounts
  public async createDedicatedVirtualAccount(params: {
    customer: string,
    subaccount?: string,
    split_code?: string
    bank?: string
  }): Promise<Paystack.IVirtualAccount> {
    return await this.makeRequest(
      'POST',
      '/dedicated_account',
      {
        body: {
          ...params,
          subaccount: params.split_code ? null: params.subaccount,
          split_code: params.subaccount ? null : params.split_code,
          preferred_bank: params.bank ?? "wema-bank"
        },
      }
    );
  }
  
  public async splitDedicatedVirtualAccount(params: {
    split_code: string
  }): Promise<Paystack.IVirtualAccount> {
    return await this.makeRequest(
      'POST',
      '/dedicated_account',
      {
        body: {
          ...params,
        },
      }
    );
  }
  
  public async deactivateDedicatedVirtualAccount(reference: string): Promise<Paystack.IVirtualAccount> {
    return await this.makeRequest(
      'DELETE',
      `/dedicated_account/${reference}`,
    );
  }

  public async fetchDedicatedAccountProviders(): Promise<Paystack.IVirtualAccountProviders> {
    return await this.makeRequest(
      'GET',
      `/dedicated_account/available_providers`,
    );
  }

  public async removeSplitOnDedicatedVirtualAccount(account_number: string): Promise<Paystack.IVirtualAccount> {
    return await this.makeRequest(
      'DELETE',
      `/dedicated_account/split`,
      {
        body: {
          account_number,
        }
      }
    );
  }

  public async fetchVirtualAccount(reference: string): Promise<Paystack.IVirtualAccountFetch> {
    return this.makeRequest(
      'GET',
      `/dedicated_account/${reference}`
    );
  }


  // Bank connect stuff
  public async connectDirectDebit(params: {
    email: string, callback_url: string
  }): Promise<Paystack.IInitializeAuthorizationResponse> {
    return await this.makeRequest(
      'POST',
      '/customer/authorization/initialize',
      {
        body: {
          ...params,
          channel: "direct_debit",
        },
      }
    );
  }

  // splits
  public async createSplit(params: {
    name: string;
    type: "percentage" | "flat",
    currency: string;
    share: number;
    subaccount: string;
  }): Promise<Paystack.ISplit> {
    return await this.makeRequest(
      'POST',
      '/split',
      {
        body: {
          name: params.name,
          currency: params.currency,
          type: params.type,
          subaccounts: [{
            subaccount: params.subaccount,
            share: params.share
          }]
        },
      }
    );
  }

}