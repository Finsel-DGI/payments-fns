import { Flutterwave } from "..";
import { Flw } from "../types";
export declare class PayoutSubaccount {
    private readonly flw;
    constructor(flw: Flutterwave);
    /**
     * Creates a payout subaccount on Flutterwave.
     * Payout subaccounts are used for disbursing funds.
     *
     * @param params - The parameters for creating the payout subaccount.
     * @param params.account_name - The name of the account.
     * @param params.email - The email address associated with the subaccount.
     * @param params.country - The country of the subaccount (e.g., 'NG' for Nigeria).
     * @param params.mobilenumber - The mobile number associated with the subaccount.
     * @param params.bank_code - This is the bank code for the primary default bank linked to the customer's PSA wallet - The bank code for the subaccount. Supported codes include "035" (Wema Bank) and "232" (Sterling Bank).
     * @returns A Promise that resolves to void on successful creation.
     */
    create(params: {
        account_name: string;
        email: string;
        country: string;
        mobilenumber: string;
        bank_code: string;
    }): Promise<Flw.PayoutSubaccountResponse>;
    /**
     * Creates a payout subaccount on Flutterwave.
     * Payout subaccounts are used for disbursing funds.
     *
     * @param params - The parameters for creating the payout subaccount.
     * @param params.account_name - The name of the account.
     * @param params.email - The email address associated with the subaccount.
     * @param params.country - The country of the subaccount (e.g., 'NG' for Nigeria).
     * @param params.mobilenumber - The mobile number associated with the subaccount.
     * @returns A Promise that resolves to void on successful creation.
     */
    createBasicPayoutSubaccount(params: {
        account_name: string;
        email: string;
        country: string;
        mobilenumber: string;
    }): Promise<Flw.PayoutSubaccountResponse>;
    update(account_reference: string, params: {
        account_name?: string;
        email?: string;
        country?: string;
        mobilenumber?: string;
    }): Promise<Flw.UpdatePayoutSubaccountResponse>;
    fetch(account_reference: string): Promise<Flw.FetchPayoutSubaccountResponse>;
    transactions(account_reference: string, params: {
        from: string;
        to: string;
        currency?: string;
        page?: string;
        fetch_limit: string;
    }): Promise<Flw.FlutterwaveResponse>;
    balance(account_reference: string, params: {
        currency?: string;
    }): Promise<Flw.FlutterwaveResponse>;
    /**
     *
     * @param account_reference
     * @param params.currency The currency of the Virtual Account to be fetched. Only NGN virtual accounts are currently supported
     * @param params.verbose When the flag is set to 1, the API returns a list of all static virtual accounts associated with the PSA wallet, including the default primary account.
     * @returns
     */
    getStaticVirtualAccount(account_reference: string, params: {
        currency?: string;
        verbose?: string;
    }): Promise<Flw.FlutterwaveResponse>;
    delete(account_reference: string): Promise<void>;
}
