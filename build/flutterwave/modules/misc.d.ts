import { Flutterwave } from "..";
import { Flw } from "../types";
export declare class Misc {
    private readonly flw;
    constructor(flw: Flutterwave);
    getBanks(country: string, params?: {
        include_provider_type: string;
    }): Promise<Flw.Banks>;
    requestBVNConsent(params: {
        bvn: string;
        firstname: string;
        lastname: string;
        redirect_url: string;
    }): Promise<Flw.BVNVerificationRequest>;
    /**
     * Verify a customer's consent and fetch their BVN information.
     * @param reference Unique identifier for the BVN consent request.
     * @param params.include_complete_message  Pass this as true or 1 to receive the complete message for the initiated BVN request.
     * @returns
     */
    resolveBVN(reference: string, params: {
        include_complete_message?: string;
    }): Promise<Flw.RetrieveBVNInformation>;
    resolveBankAccount(params: {
        account_number: string;
        account_bank: string;
    }): Promise<Flw.ResolveBankAccount>;
}
