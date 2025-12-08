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
exports.Payments = void 0;
class Payments {
    constructor(flw) {
        this.flw = flw;
    }
    create(params) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            return this.flw.makeRequest('POST', `/payments`, {
                body: Object.assign(Object.assign({}, params), { configuration: { session_duration: 30 }, max_retry_attempt: (_a = params.max_retry_attempt) !== null && _a !== void 0 ? _a : 5 })
            });
        });
    }
}
exports.Payments = Payments;
//# sourceMappingURL=payments.js.map