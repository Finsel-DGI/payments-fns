import { PaymentChannels } from '../types';
import { HttpClient, HttpMethod, HttpRequest } from '../utils/http-client';
import { KoraCustomer, Korapay } from './types';

export interface KoraConfig {
  testsk: string;
  prodsk: string;
  prodpk: string;
  testpk: string;
}

export const validChannels: PaymentChannels[] = [
  "card",
  "pay_with_bank",
  "mobile_money",
  "bank_transfer",
];

export class KorapayService {
  private readonly secret: string;
  private readonly key: string;
  private readonly httpClient: HttpClient;
  private readonly config: KoraConfig;

  /**
   * Initialize Paystack service
   * @param debug - Use test secret key when true
   * @param customConfig - Optional custom configuration
   */
  constructor(debug = false, customConfig: KoraConfig) {
    this.config = {
      ...customConfig,
    };
    this.secret = debug ? this.config.testsk : this.config.prodsk;
    this.key = debug ? this.config.testpk : this.config.prodpk;
    this.httpClient = new HttpClient({
      baseUrl: "https://api.korapay.com/merchant/api/v1",
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
      throw new Error(response.error?.message || 'Korapay API request failed');
    }

    return response.data!;
  }

  // pay-ins
  public async checkout(params: {
    amount: number;
    /**
     * The transaction reference will be appended as a query parameter to your redirect_url as well.
     * https://website_redirect_url/?reference=YOUR_REFERENCE
     */
    redirect_url?: string;
    currency?: string;
    channels?: PaymentChannels[];
    reference: string;
    merchant_bears_cost?: boolean;
    default_channel: PaymentChannels;
    narration: string;
    notification_url: string;
    customer: KoraCustomer
  }): Promise<Korapay.CheckoutRedirect> {

    console.log("Received this -- ", {
      ...params,
    })
    return this.makeRequest(
      'POST',
      '/charges/initialize',
      {
        body: {
          ...params,
          currency: ((params.currency) ?? 'NGN').toUpperCase(),
          merchant_bears_cost: params.merchant_bears_cost ?? true,
        }
      }
    );
  }

  public async payWithBank(params: {
    amount: number;
    redirect_url: string;
    bank_code: string;
    narration: string;
    notification_url: string;
    currency?: string;
    customer: KoraCustomer;
  }): Promise<Korapay.PayWithBankResponse> {
    return this.makeRequest(
      'POST',
      '/charges/pay-with-bank',
      {
        body: {
          ...params,
          currency: params.currency ?? 'NGN',
          merchant_bears_cost: false,
        }
      }
    );
  }

  // query
  public async verifyCharge(reference: string): Promise<Korapay.QueryCharge> {
    return this.makeRequest(
      'GET',
      `/charges/${reference}`
    );
  }
  
  public async queryBatchPayouts(reference: string): Promise<Korapay.QueryBulkPayouts> {
    return this.makeRequest(
      'GET',
      `/transactions/bulk/${reference}/payout`
    );
  }  

  public async queryBulkTransaction(reference: string): Promise<Korapay.BulkTransactionCheck> {
    return this.makeRequest(
      'GET',
      `/transactions/bulk/${reference}`
    );
  }
  
  public async getAllPayIns(params: {
    currency?: string;
    limit?: number;
    ending_before?: string;
    starting_after?: string;
    date_from: string; // 2021-04-23
    date_to: string; // 2021-04-23
  }): Promise<Korapay.PayinsResponse> {
    return this.makeRequest(
      'GET',
      `/pay-ins?limit=${params.limit ?? 10}${params.currency ?
        `&currency=${params.currency}` : ''}${params.ending_before ?
        `&ending_before=${params.ending_before}` : ''}${params.starting_after ?
          `&starting_after=${params.starting_after}` : ''}${params.date_from ?
        `&date_from=${params.date_from}` : ''}${params.date_to ?
        `&date_to=${params.date_to}` : ''}`
    );
  }


  // payouts
  
  public async singlePayout(params: {
    reference: string;
    destination: {
      amount: number;
      currency?: string; 
      narration: string;
      bank_account: {
        bank: string;
        account: string; // account number
      },
      customer: KoraCustomer
    }
  }): Promise<Korapay.SinglePayoutResponse> {
    return this.makeRequest(
      'POST',
      '/transactions/disburse',
      {
        body: {
          ...params,
          destination: {
            type: "bank_account",
            ...params.destination,
            currency: params.destination.currency ?? 'NGN',
          }
        }
      }
    );
  }
  
  public async bulkPayout(params: {
    batch_reference: string;
    description: string;
    merchant_bears_cost: boolean;
    currency?: string;
    payouts: {
      reference: string;
      amount: number;
      narration: string;
      type: "bank_account",
      bank_account: {
        bank: string;
        account: string; // account number
      },
      customer: KoraCustomer
    }
  }): Promise<Korapay.BulkPayouts> {
    return this.makeRequest(
      'POST',
      '/transactions/disburse/bulk',
      {
        body: {
          ...params,
          currency: params.currency ?? 'NGN',
        }
      }
    );
  }



  public async verifyPayout(reference: string): Promise<Korapay.VerifyPayoutResponse> {
    return this.makeRequest(
      'GET',
      `/transactions/${reference}`
    );
  }

  public async getAllPayouts(params: {
    limit?: number;
    ending_before?: string;
    starting_after?: string;
    date_from: string; // 2021-04-23
    date_to: string; // 2021-04-23
  }): Promise<Korapay.VerifyPayoutResponse> {
    return this.makeRequest(
      'GET',
      `/payouts?limit=${params.limit ?? 10}${params.ending_before ?
          `&ending_before=${params.ending_before}` : ''}${params.starting_after ?
            `&starting_after=${params.starting_after}` : ''}${params.date_from ?
              `&date_from=${params.date_from}` : ''}${params.date_to ?
                `&date_to=${params.date_to}` : ''}`
    );
  }

  // virtual account
  public async createVirtualAccount(params: {
    account_name: string;
    bank_code: string;
    kyc: {
      bvn?: string;
    }
    account_reference: string;
    customer: KoraCustomer;
  }): Promise<Korapay.CreateVirtualAccount> {
    return this.makeRequest(
      'POST',
      '/virtual-bank-account',
      {
        body: {
          ...params,
          permanent: !params.kyc.bvn ? false : true,
        }
      }
    );
  }

  public async fetchVirtualAccount(reference: string): Promise<Korapay.VirtualAccount> {
    return this.makeRequest(
      'GET',
      `/virtual-bank-account/${reference}`
    );
  }

  public async fetchVirtualAccountTransactions(account_number: string): Promise<Korapay.VirtualAccountTransactions> {
    return this.makeRequest(
      'GET',
      `/virtual-bank-account/transactions?account_number=${account_number}`
    );
  }

  // balance
  public async getBalances()
    : Promise<Korapay.Balances> {
    return this.makeRequest(
      'GET',
      `/balances`
    );
  }
  
  public async getBalanceHistory(params: {
    currency?: string;
    limit?: number;
    ending_before?: string;
    starting_after?: string;
    date_from?: string; // 2021-04-23
    date_to?: string; // 2021-04-23
  })
    : Promise<Korapay.Balances> {
    return this.makeRequest(
      'GET',
      `/balances/history?limit=${params.limit ?? 10}${params.currency ?
        `&currency=${params.currency}` : ''}${params.ending_before ?
          `&ending_before=${params.ending_before}` : ''}${params.starting_after ?
            `&starting_after=${params.starting_after}` : ''}${params.date_from ?
              `&date_from=${params.date_from}` : ''}${params.date_to ?
        `&date_to=${params.date_to}` : ''}&direction=credit`
    );
  }


  // misc
  public async listBanks(countryCode?: string):
    Promise<Korapay.ListOfBanks> {
    return this.makeRequest(
      'GET',
      `/misc/banks?countryCode=${countryCode ?? 'NG'}`,
      {
        headers: {
          Authorization: `Bearer ${this.key}`,
        }
      }
    );
  }
  
  public async resolveBankAccount(params: {
    bank: string;
    account: string;
  }):
    Promise<Korapay.ResolveBankAccount> {
    return this.makeRequest(
      'POST',
      `/misc/banks/resolve`,
      {
        headers: {
          Authorization: `Bearer ${this.key}`,
        },
        body: {
          ...params
        }
      }
    );
  }

}


export * from './types';
