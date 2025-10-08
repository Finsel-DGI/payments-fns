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
exports.VirtualAccount = void 0;
class VirtualAccount {
    constructor(flw) {
        this.flw = flw;
    }
    create(params) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.flw.makeRequest('POST', '/virtual-account-numbers', {
                body: Object.assign({}, params)
            });
        });
    }
    fetch(order_ref) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.flw.makeRequest('GET', `/virtual-account-numbers/${order_ref}`);
        });
    }
    delete(order_ref) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.flw.makeRequest('POST', `/virtual-account-numbers/${order_ref}`, {
                body: {
                    status: "inactive"
                }
            });
        });
    }
    update(order_ref, params) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.flw.makeRequest('POST', `/virtual-account-numbers/${order_ref}`, {
                body: Object.assign({}, params)
            });
        });
    }
}
exports.VirtualAccount = VirtualAccount;
//# sourceMappingURL=virtual-account.js.map