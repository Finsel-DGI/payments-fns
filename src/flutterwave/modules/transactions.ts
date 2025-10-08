import { Flutterwave } from "..";
import { Flw } from "../types";

export class Transactions {
  constructor(private readonly flw: Flutterwave) { }

  /**
   * This endpoint helps developers to query the final status of a transaction.
   *  This can be used to check transactions of all payment types after they have been attempted.
   * @param {string} id This is the transaction unique identifier. It is returned in the initiate transaction call as data.id
   * @returns 
   */
  public async status(id: string): Promise<Flw.TransactionResponse> {
    return this.flw.makeRequest(
      'GET',
      `/transactions/${id}/verify`
    );
  }


  public async verify(params: { tx_ref: string }): Promise<Flw.TransactionResponse> {
    return this.flw.makeRequest(
      'GET',
      `/transactions/verify_by_reference`, { params }
    );
  }

  public async refund(id: string,
    params: {
      /**
       * The amount to refund, Set this to issue a partial refund.
       */
      amount: number,
      /**
       * Custom description for the refund.
       */
      comments: string,
      /**
       * The URL for refund response callbacks.
       */
      callbackurl: string,
    }): Promise<Flw.TransactionResponse> {
    return this.flw.makeRequest(
      'POST',
      `/transactions/${id}/refund`, { body: params }
    );
  }



}