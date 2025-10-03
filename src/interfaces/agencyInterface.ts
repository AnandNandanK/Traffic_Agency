export interface CampaignResponse {
  id: number;
  agencyId: number;
  name: string;
  isActive: boolean;
  callbackUrl: string;
  urlParams: {
    clickIdKey: string;
    additionalParams: {
      [key: string]: string; // ✅ dynamic key/value
    };
  };
  campaignPublicId: string;
  notificationThreshold: number;
  totalVendorCallbackReceieved: string;
  totalTrafficCallbackSend: string;
}


