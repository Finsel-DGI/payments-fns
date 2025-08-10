import { PaymentChannels } from '../types';
import { KoraCustomer, Korapay } from './types';
export interface KoraConfig {
    testsk: string;
    prodsk: string;
    prodpk: string;
    testpk: string;
}
export declare const validChannels: PaymentChannels[];
export declare class KorapayService {
    private readonly secret;
    private readonly key;
    private readonly httpClient;
    private readonly config;
    /**
     * Initialize Paystack service
     * @param debug - Use test secret key when true
     * @param customConfig - Optional custom configuration
     */
    constructor(debug: boolean | undefined, customConfig: KoraConfig);
    private getDefaultHeaders;
    private makeRequest;
    checkout(params: {
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
        customer: KoraCustomer;
    }): Promise<Korapay.CheckoutRedirect>;
    payWithBank(params: {
        amount: number;
        redirect_url: string;
        bank_code: string;
        narration: string;
        notification_url: string;
        currency?: string;
        customer: KoraCustomer;
    }): Promise<Korapay.PayWithBankResponse>;
    verifyCharge(reference: string): Promise<Korapay.QueryCharge>;
    queryBatchPayouts(reference: string): Promise<Korapay.QueryBulkPayouts>;
    queryBulkTransaction(reference: string): Promise<Korapay.BulkTransactionCheck>;
    getAllPayIns(params: {
        currency?: string;
        limit?: number;
        ending_before?: string;
        starting_after?: string;
        date_from: string;
        date_to: string;
    }): Promise<Korapay.PayinsResponse>;
    singlePayout(params: {
        reference: string;
        destination: {
            amount: number;
            currency?: string;
            narration: string;
            bank_account: {
                bank: string;
                account: string;
            };
            customer: KoraCustomer;
        };
    }): Promise<Korapay.SinglePayoutResponse>;
    bulkPayout(params: {
        batch_reference: string;
        description: string;
        merchant_bears_cost: boolean;
        currency?: string;
        payouts: {
            reference: string;
            amount: number;
            narration: string;
            type: "bank_account";
            bank_account: {
                bank: string;
                account: string;
            };
            customer: KoraCustomer;
        };
    }): Promise<Korapay.BulkPayouts>;
    verifyPayout(reference: string): Promise<Korapay.VerifyPayoutResponse>;
    getAllPayouts(params: {
        limit?: number;
        ending_before?: string;
        starting_after?: string;
        date_from: string;
        date_to: string;
    }): Promise<Korapay.VerifyPayoutResponse>;
    createVirtualAccount(params: {
        account_name: string;
        bank_code: string;
        kyc: {
            bvn?: string;
        };
        account_reference: string;
        customer: KoraCustomer;
    }): Promise<Korapay.CreateVirtualAccount>;
    fetchVirtualAccount(reference: string): Promise<Korapay.VirtualAccount>;
    fetchVirtualAccountTransactions(account_number: string): Promise<Korapay.VirtualAccountTransactions>;
    getBalances(): Promise<Korapay.Balances>;
    getBalanceHistory(params: {
        currency?: string;
        limit?: number;
        ending_before?: string;
        starting_after?: string;
        date_from?: string;
        date_to?: string;
    }): Promise<Korapay.Balances>;
    listBanks(countryCode?: string): Promise<Korapay.ListOfBanks>;
    resolveBankAccount(params: {
        bank: string;
        account: string;
    }): Promise<Korapay.ResolveBankAccount>;
}
export * from './types';
