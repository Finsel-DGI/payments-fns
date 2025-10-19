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
exports.Customers = void 0;
class Customers {
    constructor(stripe) {
        this.stripe = stripe;
    }
    /**
     * Retrieve a stripe customer
     * @param {string} customerID query customer id
     * @return {Promise<Stripe.Response<Stripe.Customer | Stripe.DeletedCustomer>>}
     * returns stripe customer
     */
    get(customerID) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.stripe.stripe.customers.retrieve(customerID);
        });
    }
    /**
     * Create a stripe customer
     * @param {string} email customer email
     * @param {string} name partner name
     * @return {Promise<Stripe.Response<Stripe.Customer | Stripe.DeletedCustomer>>} returns customer
     */
    createPartnerCustomer(email, name, description) {
        return __awaiter(this, void 0, void 0, function* () {
            const params = {
                description: description !== null && description !== void 0 ? description : "Partner account",
                email: email,
                name: name,
            };
            return this.stripe.stripe.customers.create(params);
        });
    }
    /**
     * Find and retrieve stripe customer using email
     * @param {string} email query email to find
     * @return {Promise<Stripe.Customer | undefined>}
     * returns stripe customer
     */
    find(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const customers = yield this.stripe.stripe.customers.list({
                limit: 2,
                email: email,
            });
            if (customers.data.length < 1)
                return;
            return customers.data[0];
        });
    }
    /**
     * Manage customer - find existing or create new
     * @param {string} email customer email
     * @return {Promise<Stripe.Customer | Stripe.Response<Stripe.Customer | Stripe.DeletedCustomer>>}
     */
    manage(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const found = yield this.find(email);
            if (found) {
                return found;
            }
            else {
                const params = {
                    description: "Created on payment action",
                    email: email,
                };
                return yield this.stripe.stripe.customers.create(params);
            }
        });
    }
    /**
     * Update default payment method
     * @param {string} id stripe account
     * @return {Promise<Stripe.Response<Stripe.Customer> | undefined>}
     * returns stripe customer
     */
    updateDefaultPaymentMethod(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const account = yield this.get(id);
            if (account.deleted)
                return;
            if (account.invoice_settings.default_payment_method !== null) {
                console.log("Account already has a default payment method");
                return account;
            }
            const paymentMethods = yield this.stripe.PaymentMethods.list(id);
            if (paymentMethods.data.length < 1)
                return;
            // grab the payment method from the retrieved
            // try setting a new payment method
            const updatedData = yield this.stripe.stripe.customers.update(id, {
                invoice_settings: {
                    default_payment_method: paymentMethods.data[0].id,
                },
            });
            return updatedData;
        });
    }
    /**
     * Check if customer has default payment method
     * @param {string} customer customer ID
     * @return {Promise<boolean>}
     */
    checkIfHasDefaultPaymentMethod(customer) {
        return __awaiter(this, void 0, void 0, function* () {
            const account = yield this.get(customer);
            if (account.deleted)
                return false;
            return (account.invoice_settings.default_payment_method !== null);
        });
    }
}
exports.Customers = Customers;
//# sourceMappingURL=customers.js.map