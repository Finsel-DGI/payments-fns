export declare const plans: {
    readonly basic: "basic";
    readonly scale: "scale";
};
declare const channels: {
    card: "card";
    bank: "bank";
    ussd: "ussd";
    qr: "qr";
    mobile_money: "mobile_money";
    bank_transfer: "bank_transfer";
    eft: "eft";
    pay_with_bank: "pay_with_bank";
};
export type PaymentChannels = keyof typeof channels;
export type BillingPlans = keyof typeof plans;
export {};
