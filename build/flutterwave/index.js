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
exports.Flutterwave = void 0;
const http_client_1 = require("../utils/http-client");
const collection_subaccount_1 = require("./modules/collection-subaccount");
const misc_1 = require("./modules/misc");
const payout_subaccount_1 = require("./modules/payout-subaccount");
const transfers_1 = require("./modules/transfers");
const virtual_account_1 = require("./modules/virtual-account");
const transactions_1 = require("./modules/transactions");
const wallet_1 = require("./modules/wallet");
;
class Flutterwave {
    /**
     * Class main constructor
     * @param {Record} keys initialize with keys
     */
    constructor(keys) {
        this.config = Object.assign({}, keys);
        this.httpClient = new http_client_1.HttpClient({
            baseUrl: this.config.url || "https://api.flutterwave.com/v3",
            defaultHeaders: this.getDefaultHeaders(),
        });
        // Initialize submodules
        this.Transfers = new transfers_1.Transfers(this);
        this.CollectionSubaccount = new collection_subaccount_1.CollectionSubaccount(this);
        this.PayoutSubaccount = new payout_subaccount_1.PayoutSubaccount(this);
        this.VirtualAccount = new virtual_account_1.VirtualAccount(this);
        this.Transactions = new transactions_1.Transactions(this);
        this.Misc = new misc_1.Misc(this);
        this.Wallet = new wallet_1.Wallet(this);
    }
    getDefaultHeaders() {
        return {
            Authorization: `Bearer ${this.config.sk}`,
            'Content-Type': 'application/json',
            'user-agent': 'Rebat-Labs-Developers-Hub',
            'cache-control': 'no-cache',
            accept: 'application/json',
        };
    }
    makeRequest(method, endpoint, config) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const response = yield this.httpClient.request(method, endpoint, config);
            if (!response.success) {
                throw new Error(((_a = response.error) === null || _a === void 0 ? void 0 : _a.message) || 'Flutterwave API request failed');
            }
            return response.data;
        });
    }
}
exports.Flutterwave = Flutterwave;
//# sourceMappingURL=index.js.map