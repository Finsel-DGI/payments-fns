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
exports.Transfers = void 0;
class Transfers {
    constructor(flw) {
        this.flw = flw;
    }
    create(params) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.flw.makeRequest('POST', '/transfers', {
                body: Object.assign({}, params)
            });
        });
    }
    fetch(
    /**
     * This is the numeric ID of the transfer you want to fetch. It is returned in the call to create a transfer as data.id
     */
    id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.flw.makeRequest('GET', `/transfers/${id}`);
        });
    }
    fetchRetries(
    /**
     * This is the numeric ID of the transfer you want to fetch. It is returned in the call to create a transfer as data.id
     */
    id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.flw.makeRequest('GET', `/transfers/${id}/retries`);
        });
    }
    retry(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.flw.makeRequest('POST', `/transfers/${id}/retries`);
        });
    }
    queryFee(params) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.flw.makeRequest('GET', `/transfers/fee`, { params });
        });
    }
}
exports.Transfers = Transfers;
//# sourceMappingURL=transfers.js.map