import { Flutterwave } from "..";
import { Flw } from "../types";

export class Transfers {
  constructor(private readonly flw: Flutterwave) { }

  public async create(params: {
    /**
     * The recipient's bank code. You can query all available banks and their corresponding codes from the get banks endpoint.
     */
    account_bank: string;
    /**
     * This is the recipient account number.
     */
    account_number: string;
    amount: number;
    /**
     * In capital letters always i.e NGN
     */
    currency: string;
    /**
     * The id of a payout subaccount wallet. This is required if you choose to use the PSA as the source of funds for your transfer.
     */
    debit_subaccount: string;
    /**
     * This is a merchant's unique reference for the transfer, it can be used to query for the status of the transfer.
     */
    reference: string;
    /**
     * The URL for transfer response callbacks.
     */
    callback_url: string;
    /**
     * This is the narration for the transfer e.g. payments for x services provided.
     */
    narration: string;

    beneficiary?: string;
    beneficiary_name?: string;
  }): Promise<Flw.TransferResponse> {
    return this.flw.makeRequest(
      'POST',
      '/transfers',
      {
        body: {
          ...params
        }
      }
    );
  }

  public async fetch(
    /**
     * This is the numeric ID of the transfer you want to fetch. It is returned in the call to create a transfer as data.id
     */
    id: string,
  ): Promise<Flw.TransferResponse> {
    return this.flw.makeRequest(
      'GET',
      `/transfers/${id}`
    );
  }

  public async fetchRetries(
    /**
     * This is the numeric ID of the transfer you want to fetch. It is returned in the call to create a transfer as data.id
     */
    id: string,
  ): Promise<Flw.TransferResponseRetries> {
    return this.flw.makeRequest(
      'GET',
      `/transfers/${id}/retries`
    );
  }

  public async retry(id: string): Promise<Flw.TransferResponse> {
    return this.flw.makeRequest(
      'POST',
      `/transfers/${id}/retries`,
    );
  }

  public async queryFee(params: {
    amount: number, currency: string, type: "mobilemoney" | "account"
  }): Promise<Flw.FlutterwaveResponse> {
    return this.flw.makeRequest(
      'GET',
      `/transfers/fee`, {params}
    );
  }

}