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
exports.PaystackService = void 0;
const http_client_1 = require("../utils/http-client");
class PaystackService {
    /**
     * Initialize Paystack service
     * @param debug - Use test secret key when true
     * @param customConfig - Optional custom configuration
     */
    constructor(debug = false, customConfig) {
        this.config = Object.assign({}, customConfig);
        this.secret = debug ? this.config.testsk : this.config.prodsk;
        this.httpClient = new http_client_1.HttpClient({
            baseUrl: this.config.url || "https://api.paystack.co",
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
                throw new Error(((_a = response.error) === null || _a === void 0 ? void 0 : _a.message) || 'Paystack API request failed');
            }
            return response.data;
        });
    }
    // Customer Methods
    verifyAuthorization(reference) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.makeRequest('GET', `/customer/authorization/verify/${reference}`);
        });
    }
    fetchCustomer(identifier) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.makeRequest('GET', `/customer/${identifier}`);
        });
    }
    createCustomer(params) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.makeRequest('POST', '/customer', {
                body: Object.assign({}, params)
            });
        });
    }
    deactivateAuthorization(code) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.makeRequest('POST', '/customer/authorization/deactivate', { body: { authorization_code: code } });
        });
    }
    // Subscription Methods
    cancelSubscription(params) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.makeRequest('POST', '/subscription/disable', { body: params });
        });
    }
    fetchCustomerSubscriptions(params) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.makeRequest('GET', `/subscription?customer=${params.customer}`);
        });
    }
    createSubscription(params) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.makeRequest('POST', '/subscription', { body: params });
        });
    }
    // Transaction Methods
    verifyTransaction(reference) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.makeRequest('GET', `/transaction/verify/${reference}`);
        });
    }
    fetchTransaction(reference) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.makeRequest('GET', `/transaction/${reference}`);
        });
    }
    chargeAuthorization(email, amount, authorization, extra) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.makeRequest('POST', '/transaction/charge_authorization', {
                body: Object.assign(Object.assign({ email,
                    amount, authorization_code: authorization }, ((extra === null || extra === void 0 ? void 0 : extra.subaccount) && { subaccount: extra.subaccount })), ((extra === null || extra === void 0 ? void 0 : extra.fee) && { transaction_charge: extra.fee })),
            });
        });
    }
    simpleCharge(params) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.makeRequest('POST', '/charge', {
                body: Object.assign({}, params),
            });
        });
    }
    initiateTransaction(params) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!params.email && !params.customer) {
                throw new Error('Transaction requires either email or customer');
            }
            return this.makeRequest('POST', '/transaction/initialize', { body: params });
        });
    }
    // Bank Account Methods
    resolveBankAccount(params) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.makeRequest('GET', `/bank/resolve?account_number=${params.account}&bank_code=${params.code}`);
        });
    }
    listNigerianBanks() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.makeRequest('GET', '/bank?country=nigeria');
        });
    }
    // Subaccount Methods
    fetchSubAccount(subaccount) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.makeRequest('GET', `/subaccount/${subaccount}`);
        });
    }
    createSubAccount(params) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.makeRequest('POST', '/subaccount', {
                body: {
                    business_name: params.name,
                    settlement_bank: params.bankCode,
                    account_number: params.accountNumber,
                    percentage_charge: params.chargePercentage,
                },
            });
        });
    }
    updateSubAccount(params) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.makeRequest('PUT', `/subaccount/${params.subaccount}`, {
                body: Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, (params.name && { business_name: params.name })), (params.bankCode && { settlement_bank: params.bankCode })), (params.accountNumber && { account_number: params.accountNumber })), (params.chargePercentage && { percentage_charge: params.chargePercentage })), (typeof params.active !== 'undefined' && { active: params.active })),
            });
        });
    }
    // Transfer Methods
    createTransferRecipient(params) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.makeRequest('POST', '/transferrecipient', {
                body: {
                    name: params.name,
                    currency: 'NGN',
                    bank_code: params.bankCode,
                    account_number: params.accountNumber,
                    type: 'nuban',
                },
            });
        });
    }
    transfer(params) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.makeRequest('POST', '/transfer', {
                body: {
                    source: 'balance',
                    amount: params.amount,
                    reference: params.reference,
                    recipient: params.recipient,
                    reason: params.reason,
                },
            });
        });
    }
    // Virtual Accounts
    createDedicatedVirtualAccount(params) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            return yield this.makeRequest('POST', '/dedicated_account', {
                body: Object.assign(Object.assign({}, params), { subaccount: params.split_code ? null : params.subaccount, split_code: params.subaccount ? null : params.split_code, preferred_bank: (_a = params.bank) !== null && _a !== void 0 ? _a : "wema-bank" }),
            });
        });
    }
    splitDedicatedVirtualAccount(params) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.makeRequest('POST', '/dedicated_account', {
                body: Object.assign({}, params),
            });
        });
    }
    deactivateDedicatedVirtualAccount(reference) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.makeRequest('DELETE', `/dedicated_account/${reference}`);
        });
    }
    fetchDedicatedAccountProviders() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.makeRequest('GET', `/dedicated_account/available_providers`);
        });
    }
    removeSplitOnDedicatedVirtualAccount(account_number) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.makeRequest('DELETE', `/dedicated_account/split`, {
                body: {
                    account_number,
                }
            });
        });
    }
    fetchVirtualAccount(reference) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.makeRequest('GET', `/dedicated_account/${reference}`);
        });
    }
    // Bank connect stuff
    connectDirectDebit(params) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.makeRequest('POST', '/customer/authorization/initialize', {
                body: Object.assign(Object.assign({}, params), { channel: "direct_debit" }),
            });
        });
    }
    // splits
    createSplit(params) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.makeRequest('POST', '/split', {
                body: {
                    name: params.name,
                    currency: params.currency,
                    type: params.type,
                    subaccounts: [{
                            subaccount: params.subaccount,
                            share: params.share
                        }]
                },
            });
        });
    }
}
exports.PaystackService = PaystackService;
//# sourceMappingURL=index.js.map