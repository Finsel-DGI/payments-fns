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
exports.CollectionSubaccount = void 0;
class CollectionSubaccount {
    constructor(flw) {
        this.flw = flw;
    }
    create(params) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.flw.makeRequest('POST', '/subaccounts', {
                body: Object.assign({}, params)
            });
        });
    }
    update(id, params) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.flw.makeRequest('PUT', `/subaccounts/${id}`, {
                body: Object.assign({}, params)
            });
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.flw.makeRequest('DELETE', `/subaccounts/${id}`);
        });
    }
    fetch(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.flw.makeRequest('GET', `/subaccounts/${id}`);
        });
    }
    /**
     * list all collection subaccounts on Flutterwave.
     */
    list(params) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.flw.makeRequest('GET', (`/subaccounts`), { params: params });
        });
    }
}
exports.CollectionSubaccount = CollectionSubaccount;
//# sourceMappingURL=collection-subaccount.js.map