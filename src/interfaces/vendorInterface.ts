export interface Vendor {
  name: string;
  redirectionUrl?: string;
  contactEmail?: string;
  contactPhone?: string;
  urlParams?: {
    clickIdKey?: string;
    additionalParams?: {
      [key: string]: string; // flexible key-value pairs (e.g., uniqueID, campaignId, etc.)
    };
  };
  dailyLimit?: number;
}
