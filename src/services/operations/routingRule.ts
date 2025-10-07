import axios from "axios";
import {type Common, type WithoutPagination } from "../../interfaces/commonInterface";
import { apiConnector } from "../apiConnetor";
import type { AppDispatch } from "../../store/store";
import { setDropdownCampaign } from "../../slices/campaignSlice";
import type { Routing } from "../../interfaces/routingRuleInterface";
import { setDropdownVendor } from "../../slices/vendorSlice";
import { setErrorMsaage } from "../../slices/userSlice";
import { setRouting, type AllRoutingResponse } from "../../slices/routingRuleSlice";
const BASE_URL: string = import.meta.env.VITE_BASE_URL as string;



export function createRoutingRule(formData:Routing) {
  return async (dispatch:AppDispatch): Promise<boolean> => {
    try {
    //   dispatch(setAgencyLoading(true));

      const response = await apiConnector<Common<null>>({
        method: "POST",
        url:`${BASE_URL}/api/v1/routingrules/create`,
        bodyData: formData,
        withCredentials: true,
      });

      console.log("CREATE ROUTING RULE RESPONSE:", response.data);

      if (response.data.statusCode === 201) {
        // ✅ Success case
        // dispatch(getAllCountries());
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
    //   dispatch(setAgencyLoading(false));
    }
  };
}


export type DropDown = {
    id:number,
    name:string
}



export function getDropdownCampaign() {
  return async (dispatch:AppDispatch): Promise<boolean> => {
    try {
    //   dispatch(setLoading(true));

      const response = await apiConnector<WithoutPagination<DropDown[]>>({
        method: "GET",
        url:`${BASE_URL}/api/v1/trafficagencies/campaigns/dropdown`,
        withCredentials: true,
      });

      console.log("GET ALL CAMPAIGN RESPONSE:", response.data);

      if (response.data.statusCode === 200) {
        // ✅ Success case
        dispatch(setDropdownCampaign(response.data.data));
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
    //   dispatch(setLoading(false));
    }
  };
}



export function getDropdownVendor() {
  return async (dispatch:AppDispatch): Promise<boolean> => {
    try {
    //   dispatch(setLoading(true));

      const response = await apiConnector<WithoutPagination<DropDown[]>>({
        method: "GET",
        url:`${BASE_URL}/api/v1/vendors/dropdown`,
        withCredentials: true,
      });

      console.log("GET ALL VENDOR RESPONSE:", response.data);

      if (response.data.statusCode === 200) {
        // ✅ Success case
        dispatch(setDropdownVendor(response.data.data));
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
    //   dispatch(setLoading(false));
    }
  };
  
}



export function getAllRoutingList(campaingId:number=0,vendorId:number=0,page:number=0) {
  return async (dispatch:AppDispatch): Promise<boolean> => {
    try {
    //   dispatch(setLoading(true));

      const response = await apiConnector<Common<AllRoutingResponse[]>>({
        method: "GET",
        url:`${BASE_URL}/api/v1/routingrules/list?campaignId=${campaingId}/&vendorId=${vendorId}/&page=${page}`,
        withCredentials: true,
      });

      console.log("GET ALL ROUTING RESPONSE:", response.data);

      if (response.data.statusCode === 200) {
        // ✅ Success case
        dispatch(setRouting(response.data.data));
        return true; // <--- return success
      }

      return false; // if not scuccess

    } catch (error) {
      if (axios.isAxiosError(error)) {
     
        console.error("Axios error:", error.response?.data);
      } else {
        console.error("Unknown error:", error);
      }
      return false; // <--- failure case
    } finally {
    //   dispatch(setLoading(false));
    }
  };
}