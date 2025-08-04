export interface Authorization {
  customer: {
    test?: string;
    live?: string;
  };
  map: {
    card_type: string;
    channel: string;
    brand: string;
    country_code: string;
    exp_month: string
    exp_year: string;
    last4: string;
    reusable: boolean
  },
  keep: string; // authorization code which we will encrypt
}

export type  DocumentSchema = {
  id: string; // Unique identifier
  // Metadata
  iat: Date | null | string | number;
  updatedAt?: Date | null | string | number; // Timestamp for last update
}

export type reactSelectOptionsType = {
  label: string;
  group: string;
  value: string;
}
