import { Flutterwave } from "..";
import { Flw } from "../types";

export class PayoutSubaccount {
  constructor(private readonly flw: Flutterwave) { }

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
  public async create(params: {
    account_name: string;
    email: string;
    country: string;
    mobilenumber: string;
    bank_code: string; // 035(Wema) and 232(Sterling Bank), 090175(Test Bank)
    // bank_code: "035" | "232" | "090175" | "000"; // 035(Wema) and 232(Sterling Bank), 090175(Test Bank)
  }): Promise<Flw.PayoutSubaccountResponse> {
    return this.flw.makeRequest(
      'POST',
      '/payout-subaccounts',
      { body: { ...params } }
    );
  }


  public async update(account_reference: string, params: {
    account_name?: string;
    email?: string;
    country?: string;
    mobilenumber?: string;
  }): Promise<Flw.UpdatePayoutSubaccountResponse> {
    return this.flw.makeRequest(
      'POST',
      `/payout-subaccounts/${account_reference}`,
      { body: { ...params } }
    );
  }

  public async fetch(
    account_reference: string,
  ): Promise<Flw.FetchPayoutSubaccountResponse> {
    return this.flw.makeRequest(
      'GET',
      `/payout-subaccounts/${account_reference}`
    );
  }

  public async transactions(
    account_reference: string, params: {
      from: string, to: string, currency?: string, page?: string, fetch_limit: string
    }
  ): Promise<Flw.FlutterwaveResponse> {
    return this.flw.makeRequest(
      'GET',
      (`/payout-subaccounts/${account_reference}/transactions`), { params: params }
    );
  }

  public async balance(
    account_reference: string, params: {
      currency?: string,
    }
  ): Promise<Flw.FlutterwaveResponse> {
    return this.flw.makeRequest(
      'GET',
      `/payout-subaccounts/${account_reference}/balances`, { params: params }
    );
  }

  /**
   * 
   * @param account_reference 
   * @param params.currency The currency of the Virtual Account to be fetched. Only NGN virtual accounts are currently supported
   * @param params.verbose When the flag is set to 1, the API returns a list of all static virtual accounts associated with the PSA wallet, including the default primary account.
   * @returns 
   */
  public async getStaticVirtualAccount(
    account_reference: string, params: {
      currency?: string, verbose?: string
    }
  ): Promise<Flw.FlutterwaveResponse> {
    return this.flw.makeRequest(
      'GET',
      `/payout-subaccounts/${account_reference}/static-account`, { params: params }
    );
  }

  public async delete(
    account_reference: string,
  ): Promise<void> {
    return this.flw.makeRequest(
      'DELETE',
      `/payout-subaccounts/${account_reference}`
    );
  }
}