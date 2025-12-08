import { HttpClient, HttpMethod, HttpRequest } from "../utils/http-client";
import { CollectionSubaccount } from "./modules/collection-subaccount";
import { Misc } from "./modules/misc";
import { PayoutSubaccount } from "./modules/payout-subaccount";
import { Transfers } from "./modules/transfers";
import { VirtualAccount } from "./modules/virtual-account";
import { Transactions } from './modules/transactions';
import { Wallet } from "./modules/wallet";
import { Payments } from './modules/payments';

interface Config {
  pk: string;
  sk: string;
  url?: string;
};


export class Flutterwave {
  private readonly httpClient: HttpClient;
  private readonly config: Config;

  public readonly Transfers: Transfers;
  public readonly Payments: Payments;
  public readonly CollectionSubaccount: CollectionSubaccount;
  public readonly PayoutSubaccount: PayoutSubaccount;
  public readonly VirtualAccount: VirtualAccount;
  public readonly Transactions: Transactions;
  public readonly Misc: Misc;
  public readonly Wallet: Wallet;

  /**
   * Class main constructor
   * @param {Record} keys initialize with keys
   */
  constructor(keys: Config) {
    this.config = {
      ...keys,
    };
    this.httpClient = new HttpClient({
      baseUrl: this.config.url || "https://api.flutterwave.com/v3",
      defaultHeaders: this.getDefaultHeaders(),
    });

    // Initialize submodules
    this.Transfers = new Transfers(this);
    this.Payments = new Payments(this);
    this.CollectionSubaccount = new CollectionSubaccount(this);
    this.PayoutSubaccount = new PayoutSubaccount(this);
    this.VirtualAccount = new VirtualAccount(this);
    this.Transactions = new Transactions(this);
    this.Misc = new Misc(this);
    this.Wallet = new Wallet(this);
  }

  private getDefaultHeaders() {
    return {
      Authorization: `Bearer ${this.config.sk}`,
      'Content-Type': 'application/json',
      'user-agent': 'Rebat-Labs-Developers-Hub',
      'cache-control': 'no-cache',
      accept: 'application/json',
    };
  }

  async makeRequest<T>(
    method: HttpMethod,
    endpoint: string,
    config?: HttpRequest
  ): Promise<T> {
    const response = await this.httpClient.request<T>(method, endpoint, config);

    if (!response.success) {
      throw new Error(response.error?.message || 'Flutterwave API request failed');
    }
    return response.data!;
  }

}