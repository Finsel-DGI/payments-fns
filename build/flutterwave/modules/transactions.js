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
exports.Transactions = void 0;
class Transactions {
    constructor(flw) {
        this.flw = flw;
    }
    /**
     * This endpoint helps developers to query the final status of a transaction.
     *  This can be used to check transactions of all payment types after they have been attempted.
     * @param {string} id This is the transaction unique identifier. It is returned in the initiate transaction call as data.id
     * @returns
     */
    status(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.flw.makeRequest('GET', `/transactions/${id}/verify`);
        });
    }
    verify(params) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.flw.makeRequest('GET', `/transactions/verify_by_reference`, { params });
        });
    }
    refund(id, params) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.flw.makeRequest('POST', `/transactions/${id}/refund`, { body: params });
        });
    }
}
exports.Transactions = Transactions;
//# sourceMappingURL=transactions.js.map