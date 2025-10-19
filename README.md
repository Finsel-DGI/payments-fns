# Payments funs

A TypeScript package containing shared types and classes for payments.

## Project Structure

```
payments-fns/
├── src/
│   ├── types/          # Type definitions
│   │   └── index.ts    # Types barrel export
│   ├── classes/        # Class definitions
│   │   └── index.ts    # Classes barrel export
│   └── index.ts        # Main entry point
├── dist/               # Compiled JavaScript (generated)
├── tsconfig.json       # TypeScript configuration
├── package.json        # Package configuration
└── README.md          # This file
```

## Usage

### Development

1. Install dependencies:
   ```bash
   npm install
   ```

2. Build the project:
   ```bash
   npm run build
   ```

3. Watch for changes during development:
   ```bash
   npm run dev
   ```

### Adding Types

Create new type files in the `src/types/` directory and export them from `src/types/index.ts`:

```typescript
// src/types/example-types.ts
export interface ExampleType {
  id: string;
  name: string;
}

// src/types/index.ts
export * from './example-types';
```

### Adding Classes

Create new class files in the `src/classes/` directory and export them from `src/classes/index.ts`:

```typescript
// src/classes/example-class.ts
export class ExampleClass {
  constructor(private name: string) {}
  
  getName(): string {
    return this.name;
  }
}

// src/classes/index.ts
export * from './example-class';
```

## Building

The project uses TypeScript's compiler to generate JavaScript files and type definitions in the `dist/` directory. The build process:

1. Cleans the `dist/` directory
2. Compiles TypeScript to JavaScript
3. Generates type definition files (`.d.ts`)

## Exports

The package exports all types and classes through the main entry point at `src/index.ts`. When importing from this package, you can access all exported types and classes:

```typescript
import { ExampleType, ExampleClass } from '@akub/payments-fns';
``` 


```typescript
import { StripeService } from './stripe';

const stripe = new StripeService('sk_test_...');

// 1. Create subscription with 14-day free trial
const subscription = await stripe.Subscriptions.create({
  customer: 'cus_123',
  priceId: 'price_123',
  trialPeriodDays: 14, // 14-day free trial
  metadata: { plan: 'premium' }
});

// 2. Create subscription with trial until specific date
const subscriptionWithEndDate = await stripe.Subscriptions.create({
  customer: 'cus_123',
  priceId: 'price_123',
  trialEnd: Math.floor(Date.now() / 1000) + (30 * 24 * 60 * 60), // 30 days from now
  metadata: { plan: 'enterprise' }
});

// 3. Convenience method for trial setup
const trialSubscription = await stripe.Subscriptions.createWithTrial(
  'cus_123',
  'price_123',
  { days: 7 }, // 7-day trial
  { metadata: { source: 'website' } }
);

// 4. Update subscription
await stripe.Subscriptions.update({
  subscriptionId: 'sub_123',
  priceId: 'price_456', // Change to different price
  quantity: 2 // Update quantity
});

// 5. Cancel subscription at period end
await stripe.Subscriptions.cancel({
  subscriptionId: 'sub_123',
  cancelAtPeriodEnd: true
});

// 6. Pause subscription
await stripe.Subscriptions.pause('sub_123', Math.floor(Date.now() / 1000) + (7 * 24 * 60 * 60));

// 7. Resume paused subscription
await stripe.Subscriptions.unpause('sub_123');

// 8. Add items to existing subscription
await stripe.Subscriptions.createItem({
  subscriptionId: 'sub_123',
  priceId: 'price_789',
  quantity: 1
});

// 9. List customer subscriptions
const subscriptions = await stripe.Subscriptions.list({
  customer: 'cus_123',
  status: 'active'
});
```

```typescript
// Create subscription with 14-day trial
const subscription = await stripe.Subscriptions.create({
  customer: 'cus_123',
  priceId: 'price_123',
  trialPeriodDays: 14
});

// Cancel at period end
await stripe.Subscriptions.cancel({
  subscriptionId: 'sub_123',
  cancelAtPeriodEnd: true
});

// Immediate cancellation
await stripe.Subscriptions.cancel({
  subscriptionId: 'sub_123',
  cancelAtPeriodEnd: false,
  prorate: true
});
```

