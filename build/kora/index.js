"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
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
exports.KorapayService = exports.validChannels = void 0;
const http_client_1 = require("../utils/http-client");
exports.validChannels = [
    "card",
    "pay_with_bank",
    "mobile_money",
    "bank_transfer",
];
class KorapayService {
    /**
     * Initialize Paystack service
     * @param debug - Use test secret key when true
     * @param customConfig - Optional custom configuration
     */
    constructor(debug = false, customConfig) {
        this.config = Object.assign({}, customConfig);
        this.secret = debug ? this.config.testsk : this.config.prodsk;
        this.key = debug ? this.config.testpk : this.config.prodpk;
        this.httpClient = new http_client_1.HttpClient({
            baseUrl: "https://api.korapay.com/merchant/api/v1",
            defaultHeaders: this.getDefaultHeaders(),
        });
    }
    getDefaultHeaders() {
        return {
            Authorization: `Bearer ${this.secret}`,
            'Content-Type': 'application/json',
            'user-agent': 'Rebat-Labs-Developers-Hub',
            'cache-control': 'no-cache',
        };
    }
    makeRequest(method, endpoint, config) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const response = yield this.httpClient.request(method, endpoint, config);
            if (!response.success) {
                throw new Error(((_a = response.error) === null || _a === void 0 ? void 0 : _a.message) || 'Korapay API request failed');
            }
            return response.data;
        });
    }
    // pay-ins
    checkout(params) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            console.log("Received this -- ", Object.assign({}, params));
            return this.makeRequest('POST', '/charges/initialize', {
                body: Object.assign(Object.assign({}, params), { currency: (_a = params.currency) !== null && _a !== void 0 ? _a : 'NGN', merchant_bears_cost: (_b = params.merchant_bears_cost) !== null && _b !== void 0 ? _b : true })
            });
        });
    }
    payWithBank(params) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            return this.makeRequest('POST', '/charges/pay-with-bank', {
                body: Object.assign(Object.assign({}, params), { currency: (_a = params.currency) !== null && _a !== void 0 ? _a : 'NGN', merchant_bears_cost: false })
            });
        });
    }
    // query
    verifyCharge(reference) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.makeRequest('GET', `/charges/${reference}`);
        });
    }
    queryBatchPayouts(reference) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.makeRequest('GET', `/transactions/bulk/${reference}/payout`);
        });
    }
    queryBulkTransaction(reference) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.makeRequest('GET', `/transactions/bulk/${reference}`);
        });
    }
    getAllPayIns(params) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            return this.makeRequest('GET', `/pay-ins?limit=${(_a = params.limit) !== null && _a !== void 0 ? _a : 10}${params.currency ?
                `&currency=${params.currency}` : ''}${params.ending_before ?
                `&ending_before=${params.ending_before}` : ''}${params.starting_after ?
                `&starting_after=${params.starting_after}` : ''}${params.date_from ?
                `&date_from=${params.date_from}` : ''}${params.date_to ?
                `&date_to=${params.date_to}` : ''}`);
        });
    }
    // payouts
    singlePayout(params) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            return this.makeRequest('POST', '/transactions/disburse', {
                body: Object.assign(Object.assign({}, params), { destination: Object.assign(Object.assign({ type: "bank_account" }, params.destination), { currency: (_a = params.destination.currency) !== null && _a !== void 0 ? _a : 'NGN' }) })
            });
        });
    }
    bulkPayout(params) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            return this.makeRequest('POST', '/transactions/disburse/bulk', {
                body: Object.assign(Object.assign({}, params), { currency: (_a = params.currency) !== null && _a !== void 0 ? _a : 'NGN' })
            });
        });
    }
    verifyPayout(reference) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.makeRequest('GET', `/transactions/${reference}`);
        });
    }
    getAllPayouts(params) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            return this.makeRequest('GET', `/payouts?limit=${(_a = params.limit) !== null && _a !== void 0 ? _a : 10}${params.ending_before ?
                `&ending_before=${params.ending_before}` : ''}${params.starting_after ?
                `&starting_after=${params.starting_after}` : ''}${params.date_from ?
                `&date_from=${params.date_from}` : ''}${params.date_to ?
                `&date_to=${params.date_to}` : ''}`);
        });
    }
    // virtual account
    createVirtualAccount(params) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.makeRequest('POST', '/virtual-bank-account', {
                body: Object.assign(Object.assign({}, params), { permanent: !params.kyc.bvn ? false : true })
            });
        });
    }
    fetchVirtualAccount(reference) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.makeRequest('GET', `/virtual-bank-account/${reference}`);
        });
    }
    fetchVirtualAccountTransactions(account_number) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.makeRequest('GET', `/virtual-bank-account/transactions?account_number=${account_number}`);
        });
    }
    // balance
    getBalances() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.makeRequest('GET', `/balances`);
        });
    }
    getBalanceHistory(params) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            return this.makeRequest('GET', `/balances/history?limit=${(_a = params.limit) !== null && _a !== void 0 ? _a : 10}${params.currency ?
                `&currency=${params.currency}` : ''}${params.ending_before ?
                `&ending_before=${params.ending_before}` : ''}${params.starting_after ?
                `&starting_after=${params.starting_after}` : ''}${params.date_from ?
                `&date_from=${params.date_from}` : ''}${params.date_to ?
                `&date_to=${params.date_to}` : ''}&direction=credit`);
        });
    }
    // misc
    listBanks(countryCode) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.makeRequest('GET', `/misc/banks?countryCode=${countryCode !== null && countryCode !== void 0 ? countryCode : 'NG'}`, {
                headers: {
                    Authorization: `Bearer ${this.key}`,
                }
            });
        });
    }
    resolveBankAccount(params) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.makeRequest('POST', `/misc/banks/resolve`, {
                headers: {
                    Authorization: `Bearer ${this.key}`,
                },
                body: Object.assign({}, params)
            });
        });
    }
}
exports.KorapayService = KorapayService;
__exportStar(require("./types"), exports);
//# sourceMappingURL=index.js.map