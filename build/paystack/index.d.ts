import { Paystack } from './types';
export interface PayStackConfig {
    url?: string;
    testsk: string;
    prodsk: string;
}
type PaymentChannels = 'card' | 'bank' | 'ussd' | 'qr' | 'mobile_money' | 'bank_transfer';
export declare class PaystackService {
    private readonly config;
    private readonly secret;
    private readonly httpClient;
    /**
     * Initialize Paystack service
     * @param debug - Use test secret key when true
     * @param customConfig - Optional custom configuration
     */
    constructor(debug: boolean | undefined, customConfig: PayStackConfig);
    private getDefaultHeaders;
    private makeRequest;
    verifyAuthorization(reference: string): Promise<Paystack.IVerifyAuthorizationResponse>;
    fetchCustomer(identifier: string): Promise<Paystack.ICustomerResponse>;
    createCustomer(params: {
        email: string;
        first_name: string;
        last_name: string;
        phone?: string;
    }): Promise<Paystack.ICustomer>;
    deactivateAuthorization(code: string): Promise<Paystack.ITransactionStatus>;
    cancelSubscription(params: {
        code: string;
        token: string;
    }): Promise<void>;
    fetchCustomerSubscriptions(params: {
        customer: number;
    }): Promise<Paystack.ISubscriptions[]>;
    createSubscription(params: {
        customer: string;
        plan: string;
    }): Promise<Paystack.ISubscriptionResponse>;
    verifyTransaction(reference: string): Promise<Paystack.ITransactionStatus>;
    fetchTransaction(reference: string): Promise<Paystack.ITransactionResponse>;
    chargeAuthorization(email: string, amount: number, authorization: string, extra?: {
        subaccount?: string;
        fee?: number;
    }): Promise<Paystack.IChargeResponse>;
    simpleCharge(params: {
        email: string;
        amount: number;
        split_code?: string;
        subaccount?: string;
    }): Promise<Paystack.IChargeResponse>;
    initiateTransaction(params: {
        email?: string;
        amount: number;
        plan?: string;
        customer?: string;
        channels?: PaymentChannels[];
    }): Promise<Paystack.ITransactionRequest>;
    resolveBankAccount(params: {
        account: string;
        code: string;
    }): Promise<Paystack.IResolveAccountResponse>;
    listNigerianBanks(): Promise<Paystack.INigerianBanksResponse>;
    fetchSubAccount(subaccount: string): Promise<Paystack.ISubaccount>;
    createSubAccount(params: {
        name: string;
        bankCode: string;
        accountNumber: string;
        chargePercentage: number;
    }): Promise<Paystack.ISubaccount>;
    updateSubAccount(params: {
        subaccount: string;
        name?: string;
        bankCode?: string;
        accountNumber?: string;
        chargePercentage?: number;
        active?: boolean;
    }): Promise<Paystack.ISubaccount>;
    createTransferRecipient(params: {
        name: string;
        bankCode: string;
        accountNumber: string;
    }): Promise<Paystack.ICreateTransferRecipient>;
    transfer(params: {
        amount: number;
        reference: string;
        recipient: string;
        reason: string;
    }): Promise<Paystack.ITransfer>;
    createDedicatedVirtualAccount(params: {
        customer: string;
        subaccount?: string;
        split_code?: string;
        bank?: string;
    }): Promise<Paystack.IVirtualAccount>;
    splitDedicatedVirtualAccount(params: {
        split_code: string;
    }): Promise<Paystack.IVirtualAccount>;
    deactivateDedicatedVirtualAccount(reference: string): Promise<Paystack.IVirtualAccount>;
    fetchDedicatedAccountProviders(): Promise<Paystack.IVirtualAccountProviders>;
    removeSplitOnDedicatedVirtualAccount(account_number: string): Promise<Paystack.IVirtualAccount>;
    fetchVirtualAccount(reference: string): Promise<Paystack.IVirtualAccountFetch>;
    connectDirectDebit(params: {
        email: string;
        callback_url: string;
    }): Promise<Paystack.IInitializeAuthorizationResponse>;
    createSplit(params: {
        name: string;
        type: "percentage" | "flat";
        currency: string;
        share: number;
        subaccount: string;
    }): Promise<Paystack.ISplit>;
}
export {};
