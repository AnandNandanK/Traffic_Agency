export interface Vendor {
  name: string;
  redirectionUrl?: string;
  contactEmail?: string;
  contactPhone?: string;
  urlParams?: {
    clickIdKey?: string;
    additionalParams?: { key: string; value: string }[] | Record<string, string>; // ✅ union
  
    
  };
  dailyLimit?: number;
}



export interface AllVendorResponse {
  id: number;
  secretKey: string;
  redirectionUrl: string | null;
  name: string;
  contactEmail: string | null;
  contactPhone: string | null;
  requiredParams: {
    clickIdKey: string;
    additionalParams: Record<string, string>; // empty object ya key-value pairs
  };
  dailyLimit: number;
  isActive: boolean;
  hasLimit: boolean;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  url:string
}
