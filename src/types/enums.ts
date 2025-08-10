import { strEnum } from "../utils/system";

export const plans = {
  basic: "basic",
  scale: "scale",
} as const;

const channels = strEnum(["card", "bank", "ussd", "qr", "mobile_money", "bank_transfer", "eft", "pay_with_bank"])

export type PaymentChannels = keyof typeof channels;
export type BillingPlans = keyof typeof plans;