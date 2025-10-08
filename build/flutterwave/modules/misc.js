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
exports.Misc = void 0;
class Misc {
    constructor(flw) {
        this.flw = flw;
    }
    getBanks(country, params) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.flw.makeRequest('GET', `/banks/${country}`, { params });
        });
    }
    //Request consent for BVN verification.
    requestBVNConsent(params) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.flw.makeRequest('POST', `/bvn/verifications`, { body: params });
        });
    }
    /**
     * Verify a customer's consent and fetch their BVN information.
     * @param reference Unique identifier for the BVN consent request.
     * @param params.include_complete_message  Pass this as true or 1 to receive the complete message for the initiated BVN request.
     * @returns
     */
    resolveBVN(reference, params) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.flw.makeRequest('GET', `/bvn/verifications/${reference}`, { params: params });
        });
    }
    resolveBankAccount(params) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.flw.makeRequest('POST', `/accounts/resolve`, {
                body: Object.assign({}, params)
            });
        });
    }
}
exports.Misc = Misc;
//# sourceMappingURL=misc.js.map