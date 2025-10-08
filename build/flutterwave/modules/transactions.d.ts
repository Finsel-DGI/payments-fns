import { Flutterwave } from "..";
import { Flw } from "../types";
export declare class Transactions {
    private readonly flw;
    constructor(flw: Flutterwave);
    /**
     * This endpoint helps developers to query the final status of a transaction.
     *  This can be used to check transactions of all payment types after they have been attempted.
     * @param {string} id This is the transaction unique identifier. It is returned in the initiate transaction call as data.id
     * @returns
     */
    status(id: string): Promise<Flw.TransactionResponse>;
    verify(params: {
        tx_ref: string;
    }): Promise<Flw.TransactionResponse>;
    refund(id: string, params: {
        /**
         * The amount to refund, Set this to issue a partial refund.
         */
        amount: number;
        /**
         * Custom description for the refund.
         */
        comments: string;
        /**
         * The URL for refund response callbacks.
         */
        callbackurl: string;
    }): Promise<Flw.TransactionResponse>;
}
