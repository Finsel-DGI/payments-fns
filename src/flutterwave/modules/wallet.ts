import { Flutterwave } from "..";
import { Flw } from "../types";

export class Wallet {
  constructor(private readonly flw: Flutterwave) { }

  public async balances(): Promise<Flw.RetrieveBalances> {
    return this.flw.makeRequest(
      'GET',
      `/balances`
    );
  }

  public async balance(currency: string): Promise<Flw.RetrieveBalances> {
    return this.flw.makeRequest(
      'GET',
      `/balances/${currency}`
    );
  }
}