import axios from "axios";
import type { AppDispatch } from "../../store/store";
import { apiConnector } from "../apiConnetor";
import type { Common} from "../../interfaces/commonInterface";
import { setErrorMsaage, setLoading } from "../../slices/userSlice";
import { setAgency, setAgencyLoading, type AllAgencyResponse } from "../../slices/agencySlice";
import type { Campaigns } from "../../features/dashboard/pages/trafficagency/createCampaigns";
import { setCampaign } from "../../slices/campaignSlice";
import type { CampaignResponse } from "../../interfaces/agencyInterface";
const BASE_URL: string = import.meta.env.VITE_BASE_URL as string;


export type CreateAgencyProps={
    name: string,
    contactEmail: string,
    contactPhone: string,
}


export function CreateAgency(formData: CreateAgencyProps) {
  return async (dispatch: AppDispatch): Promise<boolean> => {
    try {
      dispatch(setLoading(true));

      const response = await apiConnector<Common<null>>({
        method: "POST",
        url:`${BASE_URL}/api/v1/trafficagencies/create`,
        bodyData: formData,
        headers: {
          "X-Client-Source": "WEB",
        },
        withCredentials: true,
      });

      console.log("CREATE AGENCY RESPONSE:", response.data);

      if (response.data.statusCode === 201) {
        // ✅ Success case
        dispatch(getAllAgency());
        return true; // <--- return success
      }

      return false;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        dispatch(setErrorMsaage(error.response?.data?.message))
        console.error("Axios error:", error.response?.data);
      } else {
        console.error("Unknown error:", error);
      }
      return false; // <--- failure case
    } finally {
      dispatch(setLoading(false));
    }
  };
}



export function updateAgency(formData: CreateAgencyProps,id:number) {
  return async (dispatch: AppDispatch): Promise<boolean> => {
    try {
      dispatch(setLoading(true));

      const response = await apiConnector<Common<null>>({
        method: "PATCH",
        url:`${BASE_URL}/api/v1/trafficagencies/update/${id}`,
        bodyData: formData,
        headers: {
          "X-Client-Source": "WEB",
        },
        withCredentials: true,
      });

      console.log("CREATE AGENCY RESPONSE:", response.data);

      if (response.data.statusCode === 200) {
        // ✅ Success case
        dispatch(getAllAgency());
        return true; // <--- return success
      }

      return false;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        dispatch(setErrorMsaage(error.response?.data?.message))
        console.error("Axios error:", error.response?.data);
      } else {
        console.error("Unknown error:", error);
      }
      return false; // <--- failure case
    } finally {
      dispatch(setLoading(false));
    }
  };
}




export function getAllAgency(page:number=0) {
  return async (dispatch: AppDispatch): Promise<boolean> => {
    try {
      dispatch(setLoading(true));

      const response = await apiConnector<Common<AllAgencyResponse[]>>({
        method: "GET",
        url:`${BASE_URL}/api/v1/trafficagencies/list?page=${page}`,
        withCredentials: true,
      });

      console.log("ALL AGENCY RESPONSE:", response.data);

      if (response.data.statusCode === 200) {
        // ✅ Success case
        dispatch(setAgency(response.data.data));
        return true; // <--- return success
      }

      return false; // if not scuccess

    } catch (error) {
      if (axios.isAxiosError(error)) {
      dispatch(setErrorMsaage(error.response?.data?.message))
        console.error("Axios error:", error.response?.data);
      } else {
        console.error("Unknown error:", error);
      }
      return false; // <--- failure case
    } finally {
      dispatch(setLoading(false));
    }
  };
}




export interface urlParamsResponse{
  clickIdKey: string;
  additionalParams: {
    [key: string]: string | undefined
  };
}


export function CreateCampaign(formData: Campaigns<urlParamsResponse>) {
  return async (dispatch:AppDispatch): Promise<boolean> => {
    try {
      dispatch(setAgencyLoading(true));

      const response = await apiConnector<Common<null>>({
        method: "POST",
        url:`${BASE_URL}/api/v1/trafficagencies/campaigns/create`,
        bodyData: formData,
        headers: {
          "X-Client-Source": "WEB",
        },
        withCredentials: true,
      });

      console.log("CREATE COMPAIGN RESPONSE:", response.data);

      if (response.data.statusCode === 201) {
        dispatch(getAllCampaign());
        return true; // <--- return success
      }

      return false;
    } catch (error) {
      if (axios.isAxiosError(error)) {
      dispatch(setErrorMsaage(error.response?.data?.message))
        console.error("Axios error:", error.response?.data);
      } else {
        console.error("Unknown error:", error);
      }
      return false; // <--- failure case
    } finally {
      dispatch(setAgencyLoading(false));
    }
  };
}


export function updateCampaign(formData: Campaigns<urlParamsResponse>,id:number) {
  return async (dispatch:AppDispatch): Promise<boolean> => {
    try {
      dispatch(setAgencyLoading(true));

      const response = await apiConnector<Common<null>>({
        method: "PATCH",
        url:`${BASE_URL}/api/v1/trafficagencies/campaigns/update/${id}`,
        bodyData: formData,
        headers: {
          "X-Client-Source": "WEB",
        },
        withCredentials: true,
      });

      console.log("UPDATE COMPAIGN RESPONSE:", response.data);

      if (response.data.statusCode === 200) {
        dispatch(getAllCampaign());
        return true; // <--- return success
      }

      return false;
    } catch (error) {
      if (axios.isAxiosError(error)) {
      dispatch(setErrorMsaage(error.response?.data?.message))
        console.error("Axios error:", error.response?.data);
      } else {
        console.error("Unknown error:", error);
      }
      return false; // <--- failure case
    } finally {
      dispatch(setAgencyLoading(false));
    }
  };
}






export function getAllCampaign(params:number=0 ,page:number=0) {
  return async (dispatch: AppDispatch): Promise<boolean> => {
    try {
      dispatch(setLoading(true));

      
      console.log(`${BASE_URL}/api/v1/trafficagencies/campaigns/list?agencyId=${params}&page=${page}`);

      const response = await apiConnector<Common<CampaignResponse[]>>({
        method: "GET",
        url:`${BASE_URL}/api/v1/trafficagencies/campaigns/list?agencyId=${params}&page=${page}`,
        withCredentials: true,
      });

      console.log("GET ALL CAMPAIGN RESPONSE:", response.data);

      if (response.data.statusCode === 200) {
        // ✅ Success case
        dispatch(setCampaign(response.data.data));
        return true; // <--- return success
      }

      return false; // if not scuccess

    } catch (error) {
      if (axios.isAxiosError(error)) {
      dispatch(setErrorMsaage(error.response?.data?.message))
        console.error("Axios error:", error.response?.data);
      } else {
        console.error("Unknown error:", error);
      }
      return false; // <--- failure case
    } finally {
      dispatch(setLoading(false));
    }
  };
}