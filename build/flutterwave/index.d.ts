import { HttpMethod, HttpRequest } from "../utils/http-client";
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
}
export declare class Flutterwave {
    private readonly httpClient;
    private readonly config;
    readonly Transfers: Transfers;
    readonly Payments: Payments;
    readonly CollectionSubaccount: CollectionSubaccount;
    readonly PayoutSubaccount: PayoutSubaccount;
    readonly VirtualAccount: VirtualAccount;
    readonly Transactions: Transactions;
    readonly Misc: Misc;
    readonly Wallet: Wallet;
    /**
     * Class main constructor
     * @param {Record} keys initialize with keys
     */
    constructor(keys: Config);
    private getDefaultHeaders;
    makeRequest<T>(method: HttpMethod, endpoint: string, config?: HttpRequest): Promise<T>;
}
export {};
