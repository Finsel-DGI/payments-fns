"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PayoutSubaccount = void 0;
class PayoutSubaccount {
    constructor(flw) {
        this.flw = flw;
    }
    /**
     * Creates a payout subaccount on Flutterwave.
     * Payout subaccounts are used for disbursing funds.
     *
     * @param params - The parameters for creating the payout subaccount.
     * @param params.account_name - The name of the account.
     * @param params.email - The email address associated with the subaccount.
     * @param params.country - The country of the subaccount (e.g., 'NG' for Nigeria).
     * @param params.mobilenumber - The mobile number associated with the subaccount.
     * @param params.bank_code - This is the bank code for the primary default bank linked to the customer's PSA wallet - The bank code for the subaccount. Supported codes include "035" (Wema Bank) and "232" (Sterling Bank).
     * @returns A Promise that resolves to void on successful creation.
     */
    create(params) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.flw.makeRequest('POST', '/payout-subaccounts', { body: Object.assign({}, params) });
        });
    }
    update(account_reference, params) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.flw.makeRequest('POST', `/payout-subaccounts/${account_reference}`, { body: Object.assign({}, params) });
        });
    }
    fetch(account_reference) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.flw.makeRequest('GET', `/payout-subaccounts/${account_reference}`);
        });
    }
    transactions(account_reference, params) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.flw.makeRequest('GET', (`/payout-subaccounts/${account_reference}/transactions`), { params: params });
        });
    }
    balance(account_reference, params) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.flw.makeRequest('GET', `/payout-subaccounts/${account_reference}/balances`, { params: params });
        });
    }
    /**
     *
     * @param account_reference
     * @param params.currency The currency of the Virtual Account to be fetched. Only NGN virtual accounts are currently supported
     * @param params.verbose When the flag is set to 1, the API returns a list of all static virtual accounts associated with the PSA wallet, including the default primary account.
     * @returns
     */
    getStaticVirtualAccount(account_reference, params) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.flw.makeRequest('GET', `/payout-subaccounts/${account_reference}/static-account`, { params: params });
        });
    }
    delete(account_reference) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.flw.makeRequest('DELETE', `/payout-subaccounts/${account_reference}`);
        });
    }
}
exports.PayoutSubaccount = PayoutSubaccount;
//# sourceMappingURL=payout-subaccount.js.map