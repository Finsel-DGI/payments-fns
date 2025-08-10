"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.plans = void 0;
const system_1 = require("../utils/system");
exports.plans = {
    basic: "basic",
    scale: "scale",
};
const channels = (0, system_1.strEnum)(["card", "bank", "ussd", "qr", "mobile_money", "bank_transfer", "eft", "pay_with_bank"]);
//# sourceMappingURL=enums.js.map