import { Flutterwave } from "..";
import { Flw } from "../types";
export declare class VirtualAccount {
    private readonly flw;
    constructor(flw: Flutterwave);
    create(params: {
        email: string;
        amount: number;
        currency: "NGN" | "GHS";
        firstname: string;
        lastname: string;
        tx_ref: string;
        is_permanent: boolean;
        bvn?: string;
        narration: string;
        phonenumber: string;
        bank_code: string;
    }): Promise<Flw.CreateVirtualAccountResponse>;
    fetch(order_ref: string): Promise<Flw.FetchVirtualAccountResponse>;
    delete(order_ref: string): Promise<Flw.DeleteVirtualAccountResponse>;
    update(order_ref: string, params: {
        bvn: string;
    }): Promise<Flw.DeleteVirtualAccountResponse>;
}
