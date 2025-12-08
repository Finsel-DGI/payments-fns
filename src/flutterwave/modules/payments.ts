import { Flutterwave } from "..";
import { Flw } from "../types";

export class Payments {
  constructor(private readonly flw: Flutterwave) { }

  public async create(params: {
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
    payment_options: string,
    link_expiration: Date,
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
    }
  }): Promise<Flw.PaymentLinkResponse>{
    return this.flw.makeRequest(
      'POST',
      `/payments`, {
      body: {
        ...params,
          configuration: { session_duration: 30 },
          max_retry_attempt: params.max_retry_attempt ?? 5,
      }
    });
  }
}