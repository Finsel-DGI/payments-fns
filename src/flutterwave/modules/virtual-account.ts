import { Flutterwave } from "..";
import { Flw } from "../types";

export class VirtualAccount {
  constructor(private readonly flw: Flutterwave) { }


  public async create(params: {
    email: string;
    amount: number;
    currency: "NGN" | "GHS";
    firstname: string;
    lastname: string;
    tx_ref: string; // identifier for the virtual-account
    is_permanent: boolean;
    bvn?: string;
    narration: string;
    phonenumber: string;
    bank_code: string; // 035 (Wema),232 (Sterling),090360 (Cashconnect), 090772 (Indulge) on live-mode 090175 on test mode
  }): Promise<Flw.CreateVirtualAccountResponse> {
    return this.flw.makeRequest(
      'POST',
      '/virtual-account-numbers',
      {
        body: {
          ...params
        }
      }
    );
  }

  public async fetch(
    order_ref: string,
  ): Promise<Flw.FetchVirtualAccountResponse> {
    return this.flw.makeRequest(
      'GET',
      `/virtual-account-numbers/${order_ref}`
    );
  }

  public async delete(
    order_ref: string,
  ): Promise<Flw.DeleteVirtualAccountResponse> {
    return this.flw.makeRequest(
      'POST',
      `/virtual-account-numbers/${order_ref}`, {
      body: {
        status: "inactive"
      }
    }
    );
  }

  public async update(
    order_ref: string, params: {
      bvn: string;
    }
  ): Promise<Flw.DeleteVirtualAccountResponse> {
    return this.flw.makeRequest(
      'POST',
      `/virtual-account-numbers/${order_ref}`, {
      body: {
        ...params
      }
    }
    );
  }
}