import Stripe from "stripe";
import { Customers } from "./modules/customers";
import { PaymentMethods } from "./modules/payment-methods";
import { Payments } from "./modules/payments";
import { Checkout } from "./modules/checkout";
import { Prices } from "./modules/prices";
import { Connect } from "./modules/connect";
import { PaymentLinks } from "./modules/payment-links";
import { Billing } from "./modules/billing";
import { Subscriptions } from "./modules/subscriptions";

interface Config {
  apiKey: string;
  apiVersion?: string;
}

export class StripeService {
  private readonly config: Config;
  readonly stripe: Stripe;

  // Module instances
  public readonly Customers: Customers;
  public readonly PaymentMethods: PaymentMethods;
  public readonly Payments: Payments;
  public readonly Checkout: Checkout;
  public readonly Prices: Prices;
  public readonly Connect: Connect;
  public readonly PaymentLinks: PaymentLinks;
  public readonly Billing: Billing;
  public readonly Subscriptions: Subscriptions;

  /**
   * Class main constructor
   * @param {string} apiKey initialize with stripe API key
   * @param {string} apiVersion optional API version
   */
  constructor(apiKey: string, apiVersion?: string) {
    this.config = {
      apiKey,
      apiVersion: apiVersion || "2025-08-27.basil",
    };
    
    this.stripe = new Stripe(this.config.apiKey, {
      apiVersion: this.config.apiVersion as Stripe.LatestApiVersion,
    });

    // Initialize submodules
    this.Customers = new Customers(this);
    this.PaymentMethods = new PaymentMethods(this);
    this.Payments = new Payments(this);
    this.Checkout = new Checkout(this);
    this.Prices = new Prices(this);
    this.Connect = new Connect(this);
    this.PaymentLinks = new PaymentLinks(this);
    this.Billing = new Billing(this);
    this.Subscriptions = new Subscriptions(this);
  }
}