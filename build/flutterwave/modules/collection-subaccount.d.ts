import { Flutterwave } from "..";
import { Flw } from "../types";
export declare class CollectionSubaccount {
    private readonly flw;
    constructor(flw: Flutterwave);
    create(params: {
        account_bank: string;
        account_number: string;
        business_name: string;
        country?: string;
        split_value: number;
        business_mobile: string;
        business_email: string;
        business_contact: string;
        business_contact_mobile?: string;
        split_type: "percentage" | "flat";
        meta?: [{
            meta_name: string;
            meta_value: string;
        }];
    }): Promise<Flw.SubaccountResponse>;
    update(id: string, params: {
        split_value: number;
        account_number?: string;
        business_email?: string;
        business_name?: string;
        split_type?: "percentage" | "flat";
    }): Promise<Flw.UpdateSubaccountResponse>;
    delete(id: string): Promise<void>;
    fetch(id: string): Promise<Flw.FetchSubaccountResponse>;
    /**
     * list all collection subaccounts on Flutterwave.
     */
    list(params?: {
        account_bank?: string;
        account_number?: string;
        bank_name?: string;
        page?: number;
    }): Promise<Flw.ListSubaccountResponse>;
}
