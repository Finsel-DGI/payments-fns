import { Flutterwave } from "..";
import { Flw } from "../types";
export declare class Wallet {
    private readonly flw;
    constructor(flw: Flutterwave);
    balances(): Promise<Flw.RetrieveBalances>;
    balance(currency: string): Promise<Flw.RetrieveBalances>;
}
