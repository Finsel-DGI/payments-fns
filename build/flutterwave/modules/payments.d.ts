import { Flutterwave } from "..";
import { Flw } from "../types";
export declare class Payments {
    private readonly flw;
    constructor(flw: Flutterwave);
    create(params: {
        amount: number;
        /**
         * In capital letters always i.e NGN
         */
        currency: string;
        tx_ref: string;
        customer: {
            email: string;
            phone_number?: string;
            name: string;
        };
        redirect_url: string;
        max_retry_attempt?: number;
        payment_options: string;
        link_expiration: Date;
        customizations?: {
            title: string;
            logo: string;
        };
        subaccounts?: {
            id: string;
        }[];
        /**
         * ID of the payment plan (used for recurring payments)
         */
        payment_plan?: string;
        meta?: {
            meta_1?: string;
            meta_2?: string;
        };
    }): Promise<Flw.PaymentLinkResponse>;
}
