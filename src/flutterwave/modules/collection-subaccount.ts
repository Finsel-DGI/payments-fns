import { Flutterwave } from "..";
import { Flw } from "../types";

export class CollectionSubaccount {
  constructor(private readonly flw: Flutterwave) { }

  public async create(params: {
    account_bank: string;
    account_number: string;
    business_name: string;
    country?: string;
    split_value: number;
    business_mobile: string;
    business_email: string;
    business_contact: string; // name of business or individual
    business_contact_mobile?: string;
    split_type: "percentage" | "flat";
    meta?: [{ meta_name: string, meta_value: string }]
  }): Promise<Flw.SubaccountResponse> {
    return this.flw.makeRequest(
      'POST',
      '/subaccounts',
      {
        body: {
          ...params
        }
      }
    );
  }

  public async update(
    id: string, params: {
      split_value: number;
      account_number?: string;
      business_email?: string;
      business_name?: string;
      split_type?: "percentage" | "flat";
    }
  ): Promise<Flw.UpdateSubaccountResponse> {
    return this.flw.makeRequest(
      'PUT',
      `/subaccounts/${id}`, {
      body: {
        ...params,
      }
    }
    );
  }

  public async delete(
    id: string,
  ): Promise<void> {
    return this.flw.makeRequest(
      'DELETE',
      `/subaccounts/${id}`
    );
  }


  public async fetch(
    id: string,
  ): Promise<Flw.FetchSubaccountResponse> {
    return this.flw.makeRequest(
      'GET',
      `/subaccounts/${id}`
    );
  }

  /**
   * list all collection subaccounts on Flutterwave.
   */
  public async list(params?: {
    account_bank?: string,
    account_number?: string,
    bank_name?: string,
    page?: number,
  }): Promise<Flw.ListSubaccountResponse> {
    return this.flw.makeRequest(
      'GET',
      (`/subaccounts`), { params: params }
    );
  }


}