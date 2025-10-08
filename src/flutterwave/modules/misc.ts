import { Flutterwave } from "..";
import { Flw } from "../types";

export class Misc {
  constructor(private readonly flw: Flutterwave) { }

  public async getBanks(
    country: string, params?: { include_provider_type: string}
  ): Promise<Flw.Banks> {
    return this.flw.makeRequest(
      'GET',
      `/banks/${country}`, {params}
    );
  }

  //Request consent for BVN verification.
  public async requestBVNConsent(params: {
    bvn: string; firstname: string, lastname: string, redirect_url: string;
  }): Promise<Flw.BVNVerificationRequest> {
    return this.flw.makeRequest(
      'POST',
      `/bvn/verifications`, { body: params }
    );
  }

  /**
   * Verify a customer's consent and fetch their BVN information.
   * @param reference Unique identifier for the BVN consent request.
   * @param params.include_complete_message  Pass this as true or 1 to receive the complete message for the initiated BVN request.
   * @returns 
   */
  public async resolveBVN(
    reference: string, params: {
      include_complete_message?: string,
    }
  ): Promise<Flw.RetrieveBVNInformation> {
    return this.flw.makeRequest(
      'GET',
      `/bvn/verifications/${reference}`, { params: params }
    );
  }

  public async resolveBankAccount(
    params: {
      account_number: string;
      account_bank: string;
    }
  ): Promise<Flw.ResolveBankAccount> {
    return this.flw.makeRequest(
      'POST',
      `/accounts/resolve`, {
      body: {
        ...params
      }
    }
    );
  }
}