export interface Traffic {
  id: string;
  adClickId: string;
  ipAddress: string;
  vendorClickId: string;
  hasCallbackReceived: boolean;
  callbackReceivedAt: string | null;
  notifiedAt: string | null;
  responseCode: string | null;
}
