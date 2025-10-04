import axios from "axios";
import {type Common } from "../../interfaces/commonInterface";
import { apiConnector } from "../apiConnetor";
import type { AppDispatch } from "../../store/store";
import { setDropdownCampaign } from "../../slices/campaignSlice";
import type { Routing } from "../../interfaces/routingRuleInterface";
import { setDropdownVendor } from "../../slices/vendorSlice";
const BASE_URL: string = import.meta.env.VITE_BASE_URL as string;



export function createRoutingRule(formData:Routing) {
  return async (): Promise<boolean> => {
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

      const response = await apiConnector<Common<DropDown[]>>({
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

      const response = await apiConnector<Common<DropDown[]>>({
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


// export function getDropdownAgency() {
//   return async (dispatch:AppDispatch): Promise<boolean> => {
//     try {
//     //   dispatch(setLoading(true));

//       const response = await apiConnector<Common<DropDown[]>>({
//         method: "GET",
//         url:`${BASE_URL}/api/v1/trafficagencies/dropdown`,
//         withCredentials: true,
//       });

//       console.log("GET ALL AGENCY RESPONSE:", response.data);

//       if (response.data.statusCode === 200) {
//         // ✅ Success case
//         dispatch(setDropdownAgency(response.data.data));
//         return true; // <--- return success
//       }

//       return false; // if not scuccess

//     } catch (error) {
//       if (axios.isAxiosError(error)) {
     
//         console.error("Axios error:", error.response?.data);
//       } else {
//         console.error("Unknown error:", error);
//       }
//       return false; // <--- failure case
//     } finally {
//     //   dispatch(setLoading(false));
//     }
//   };
// }